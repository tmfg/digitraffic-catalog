#!/usr/bin/env bash
# CKAN in a Python venv, for the AI devcontainer (no Docker daemon there) and as an IDE
# interpreter. Same CKAN version, pip policy and extension setup as the image: it runs the CI
# repo's install_ckan.sh, install_extensions.sh and setup_extensions.sh, and takes its config
# from ckan.env (+ .env.local). Our four extensions are installed editable.
#
#   ./ckan-venv.sh setup        install + configure + check + migrate (once, and after a version bump)
#   ./ckan-venv.sh install      create the venv and install CKAN and the extensions
#   ./ckan-venv.sh configure    (re)write config/ckan.ini
#   ./ckan-venv.sh check        are PostgreSQL, Solr and Redis reachable?
#   ./ckan-venv.sh migrate      CKAN, digitraffic_core and datastore migrations
#   ./ckan-venv.sh test [args]  pytest in ext/ckanext-digitraffic_core (default: all tests)
#   ./ckan-venv.sh serve        CKAN dev server with reloader on :5000
#
# The backing services are reached by their compose service names (catalog-postgresql, …),
# which resolve inside the devcontainer. On a laptop without it, use the venv for the IDE
# and run tests with ./dev.sh test.
#
# Differences from the container: Debian/glibc, not Alpine; no uWSGI, nginx or OpenTelemetry
# collector (OTEL_SDK_DISABLED); entraid_authenticator is not loaded unless
# CKAN_TESTS_WITH_ENTRA=1
# Re-run `configure` after changing it.
set -euo pipefail

LOCAL_ENV="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CATALOG="$(dirname "$LOCAL_ENV")"
if [[ -z "${DIGITRAFFIC_CI_PATH:-}" && -f "$LOCAL_ENV/.env" ]]; then
  DIGITRAFFIC_CI_PATH="$(sed -n 's/^DIGITRAFFIC_CI_PATH=//p' "$LOCAL_ENV/.env" | tail -n 1)"
fi
if [[ -z "${DIGITRAFFIC_CI_PATH:-}" ]]; then
  printf '[ckan-venv] %s\n' "Set DIGITRAFFIC_CI_PATH to the CI repository checkout in local-env/.env" >&2
  exit 1
fi
# Relative to local-env/, as for compose.
CI_REPO="$(cd "$LOCAL_ENV" && cd "$DIGITRAFFIC_CI_PATH" && pwd)"
VENV="${CKAN_VENV:-$HOME/.venvs/ckan-catalog}"
EXT_DIR="$CATALOG/ext"
# ext/ckanext-digitraffic_core/test.ini says `use = config:../../config/ckan.ini`.
CKAN_INI="$CATALOG/config/ckan.ini"
OUR_EXTENSIONS="ckanext-digitraffic_core ckanext-entraid_authenticator ckanext-digitraffic_fluent ckanext-digitraffic_opentelemetry"

log() { printf '[ckan-venv] %s\n' "$*" >&2; }

ckan_env() {
  set -a
  # shellcheck disable=SC1091
  . "$LOCAL_ENV/ckan.env"
  if [[ -f "$LOCAL_ENV/.env.local" ]]; then
    # shellcheck disable=SC1091
    . "$LOCAL_ENV/.env.local"
  fi
  set +a
  # venv-only overrides
  export CKAN_INI EXT_DIR
  export CKAN_STORAGE_PATH="${CKAN_VENV_STORAGE:-$HOME/.cache/ckan/storage}"
  export OTEL_SDK_DISABLED=true
  if [[ "${CKAN_TESTS_WITH_ENTRA:-0}" != 1 ]]; then
    CKAN__PLUGINS="$(tr ' ' '\n' <<<"$CKAN__PLUGINS" | grep -vx entraid_authenticator | paste -sd' ' -)"
  fi
  if [[ -f "$VENV/bin/activate" ]]; then
    # shellcheck disable=SC1091
    . "$VENV/bin/activate"
  fi
}

install() {
  [[ -f "$CI_REPO/aws/ckan/setup/install_ckan.sh" ]] \
    || { log "install_ckan.sh not found under $CI_REPO; set DIGITRAFFIC_CI_PATH"; exit 1; }
  log "creating $VENV"
  python3 -m venv "$VENV"
  ckan_env
  export PIP_SRC="$VENV/src"
  pip install --quiet --upgrade pip
  log "installing CKAN core with the CI repo's install_ckan.sh"
  sh "$CI_REPO/aws/ckan/setup/install_ckan.sh" >/dev/null
  log "installing extensions with the CI repo's install_extensions.sh"
  # It uses [[ ]], so bash rather than dash; and relative src/ paths, hence the cd.
  (cd "$VENV" && bash "$CI_REPO/aws/ckan/setup/install_extensions.sh") >/dev/null
  for extension in $OUR_EXTENSIONS; do
    pip install --quiet --no-deps -e "$EXT_DIR/$extension"
  done
  pip install --quiet --only-binary=:all: -r "$EXT_DIR/ckanext-digitraffic_core/dev-requirements.txt"
}

configure() {
  ckan_env
  log "writing $CKAN_INI"
  mkdir -p "$(dirname "$CKAN_INI")" "$CKAN_STORAGE_PATH"
  rm -f "$CKAN_INI"
  ckan generate config "$CKAN_INI" >/dev/null
  ckan config-tool "$CKAN_INI" "ckan.plugins = $CKAN__PLUGINS"
  bash "$CI_REPO/aws/ckan/setup/setup_extensions.sh"
  # Written into the ini as well as exported, so plain `ckan` commands without this
  # script's environment still find the services.
  ckan config-tool "$CKAN_INI" \
    "sqlalchemy.url = $CKAN_SQLALCHEMY_URL" \
    "ckan.datastore.write_url = $CKAN_DATASTORE_WRITE_URL" \
    "ckan.datastore.read_url = $CKAN_DATASTORE_READ_URL" \
    "solr_url = $CKAN_SOLR_URL" \
    "ckan.redis.url = $CKAN_REDIS_URL" \
    "ckan.site_url = $CKAN_SITE_URL" \
    "ckan.storage_path = $CKAN_STORAGE_PATH"
}

migrate() {
  ckan_env
  log "migrating"
  ckan -c "$CKAN_INI" db upgrade
  ckan -c "$CKAN_INI" db upgrade -p digitraffic_core
  local permissions_sql
  permissions_sql="$(ckan -c "$CKAN_INI" datastore set-permissions)"
  python - "$CKAN_DATASTORE_WRITE_URL" "$permissions_sql" <<'PY'
import sys
import psycopg2

with psycopg2.connect(sys.argv[1]) as connection, connection.cursor() as cursor:
    cursor.execute(sys.argv[2])
PY
}

check() {
  ckan_env
  python - "$CKAN_SQLALCHEMY_URL" "$CKAN_SOLR_URL" "$CKAN_REDIS_URL" <<'PY'
import sys
import urllib.request

import psycopg2
import redis

db_url, solr_url, redis_url = sys.argv[1:]
failed = False
for name, probe in (
    ("PostgreSQL", lambda: psycopg2.connect(db_url).close()),
    ("Solr", lambda: urllib.request.urlopen(f"{solr_url}/admin/ping", timeout=5).read()),
    ("Redis", lambda: redis.Redis.from_url(redis_url).ping()),
):
    try:
        probe()
        print(f"{name}: up")
    except Exception as error:
        failed = True
        print(f"{name}: DOWN ({error})")
if failed:
    print("In the devcontainer, add `catalog` to COMPOSE_PROFILES in .devcontainer/.env and reopen.")
    sys.exit(1)
PY
}

run_tests() {
  ckan_env
  cd "$EXT_DIR/ckanext-digitraffic_core"
  if [[ $# -eq 0 ]]; then
    set -- -rA ckanext/digitraffic_core/tests
  fi
  pytest --ckan-ini=test.ini "$@"
}

serve() {
  ckan_env
  ckan -c "$CKAN_INI" run -H 0.0.0.0 -p 5000
}

case "${1:-}" in
  setup) install; configure; check; migrate ;;
  install) install ;;
  configure) configure ;;
  migrate) migrate ;;
  check) check ;;
  test) shift; run_tests "$@" ;;
  serve) serve ;;
  *) sed -n '2,24p' "$0" | sed 's/^# \{0,1\}//'; exit 2 ;;
esac
