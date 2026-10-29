#!/usr/bin/env bash
# Local CKAN environment. Every command is a thin wrapper around `docker compose`;
# `./dev.sh help` shows the command each one runs.
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")"

TESTS_DIR=ckanext/digitraffic_core/tests
CORE_DIR=/srv/app/ckanext/ckanext-digitraffic_core

usage() {
  cat <<'EOF'
usage: ./dev.sh <command> [args]

  up [-d] [--build] [...]   docker compose up --renew-anon-volumes [...]
                            -d also adds --wait (returns once CKAN is healthy)
  down [-v]                 docker compose down --remove-orphans [-v]
  test [file [function]]    docker compose exec -u ckan ckan pytest --ckan-ini=test.ini ...
                            file is relative to ckanext/digitraffic_core/tests; any argument
                            starting with - is passed to pytest as is
  translate fi|sv           docker compose exec -u ckan ckan python setup.py update_catalog/compile_catalog
  logs [service]            docker compose logs -f [service]
  reload                    docker compose restart ckan        (after Python changes)
  attach                    docker compose attach ckan         (pdb; detach with Ctrl-P Ctrl-Q)

Set DIGITRAFFIC_CI_PATH env variable.
EOF
}

# No TTY in CI: docker compose exec would fail trying to allocate one.
exec_opts=""
[[ -t 0 && -t 1 ]] || exec_opts="-T"

command="${1:-help}"
shift || true

case "$command" in
  up)
    if [[ " $* " == *" -d "* || " $* " == *" --detach "* ]]; then
      set -- "$@" --wait
    fi
    docker compose up --renew-anon-volumes "$@"
    ;;
  down)
    docker compose down --remove-orphans "$@"
    ;;
  test)
    if [[ $# -eq 0 ]]; then
      set -- -rA "$TESTS_DIR"
    elif [[ "$1" != -* ]]; then
      target="$TESTS_DIR/$1"
      if [[ -n "${2:-}" ]]; then
        target="$target::$2"
      fi
      set -- "$target"
    fi
    # shellcheck disable=SC2086
    docker compose exec $exec_opts -u ckan -w "$CORE_DIR" ckan pytest --ckan-ini=test.ini "$@"
    ;;
  translate)
    if [[ "${1:-}" != "fi" && "${1:-}" != "sv" ]]; then
      usage
      exit 1
    fi
    # shellcheck disable=SC2086
    docker compose exec $exec_opts -u ckan -w "$CORE_DIR" ckan \
      sh -c "python setup.py update_catalog -l $1 && python setup.py compile_catalog"
    echo "Run ./dev.sh reload to load the new translations."
    ;;
  logs)
    docker compose logs -f "$@"
    ;;
  reload)
    docker compose restart ckan
    ;;
  attach)
    docker compose attach ckan
    ;;
  help | -h | --help)
    usage
    ;;
  *)
    usage
    exit 1
    ;;
esac
