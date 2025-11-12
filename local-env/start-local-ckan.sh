#!/usr/bin/env bash
set -euo pipefail

USAGE=$(
  cat <<-EOM

usage: DIGITRAFFIC_CI_PATH=/path/to/ci/project start_local_ckan.sh { up | down } [ build_image ] [ ci ]

Starts or stops a local CKAN server inside docker compose.

Also, builds a CKAN docker image if one does not exists or build_image argument is given.

Environment variables:
  DIGITRAFFIC_CI_PATH  Path to CI repository (required)

EOM
)

if ! ([[ $# -ge 1 ]] && [[ $# -le 3 ]]); then
  echo "$USAGE"
  exit 1
fi

if ! [[ "$1" = 'up' || "$1" = 'down' ]]; then
  echo "$USAGE"
  exit 1
fi

COMPOSE_COMMAND="$1"
BUILD_IMAGE="${2:-}"
CI="${3:-}"

# Check for DIGITRAFFIC_CI_PATH only when building images
if [[ "$COMPOSE_COMMAND" == "up" ]] && [[ -z "${DIGITRAFFIC_CI_PATH:-}" ]]; then
  echo "Error: DIGITRAFFIC_CI_PATH environment variable is required when starting CKAN"
  echo "$USAGE"
  exit 1
fi

cd "$(dirname "${BASH_SOURCE[0]}")"

run_python_install() {
  set -euo pipefail
  PATH_TO_EXT="$1"
  PYTHON_VIRTUAL_ENV_DIR='venv'
  pushd "$PATH_TO_EXT"
  if [[ ! -d "$PYTHON_VIRTUAL_ENV_DIR" ]]; then
    python -m venv "$PYTHON_VIRTUAL_ENV_DIR"
  fi
  source venv/bin/activate
  pip install -e .
  if [[ -f requirements.txt ]]; then
    pip install -r requirements.txt
  fi
  deactivate
  popd
}

if [ "$COMPOSE_COMMAND" == "down" ]; then
  docker compose --project-name datakatalogi-local down --remove-orphans
  exit 0
fi

if [ "$CI" != "ci" ]; then
  ENTRA_ENV_FILE=./.env_entra

  if [[ ! -f $ENTRA_ENV_FILE ]]; then
    echo "$ENTRA_ENV_FILE file was not found. Creating one..."
    ENTRA_EXT_ENV_FILE=../ext/ckanext-entraid_authenticator/.env
    ENTRA_EXT_EXAMPLE_ENV_FILE=../ext/ckanext-entraid_authenticator/.env.example
    if [[ -f $ENTRA_EXT_ENV_FILE ]]; then
      cp $ENTRA_EXT_ENV_FILE $ENTRA_ENV_FILE
    else
      cp $ENTRA_EXT_EXAMPLE_ENV_FILE $ENTRA_ENV_FILE
    fi
  fi

  export -f run_python_install
  ls -I -d -1 "$PWD"/../ext/{*,} | tail -n +2 | xargs -I % bash -c 'run_python_install "%"'
fi

# Build images using the build scripts
./ckan/build-image.sh "$BUILD_IMAGE"
./solr/build-image.sh "$BUILD_IMAGE"
./nginx/build-image.sh "$BUILD_IMAGE"
./postgresql/build-image.sh "$BUILD_IMAGE"

if [ "$COMPOSE_COMMAND" == "up" ]; then
  if [ "$CI" == "ci" ]; then
    docker compose -f compose-ci.yaml --project-name datakatalogi-local --env-file ".env_ckan_common" --env-file ".env_solr_common" up -d
    # RUNNER_TRACKING_ID must be set to empty string or the logging process is killed before the workflow is finished: https://github.com/actions/runner/issues/598#issuecomment-721151364
    RUNNER_TRACKING_ID="" && docker compose -f compose-ci.yaml --project-name datakatalogi-local --env-file ".env_ckan_common" --env-file ".env_solr_common" logs -f > docker-logs.txt 2>&1 &
  else
    docker compose -f compose.yaml --project-name datakatalogi-local --env-file ".env_ckan_common" --env-file ".env_solr_common" up
  fi
fi