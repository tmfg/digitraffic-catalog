#!/usr/bin/env bash
set -euo pipefail

USAGE=$(
  cat <<-EOM

usage: start_local_ckan.sh { up | down } [ build_image ] [ ci ]

Starts or stops a local CKAN server inside docker compose.

Also, builds a CKAN docker image if one does not exists or build_image argument is given.

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
  # Create necessary files if they do not exist
  EXTENSIONS_FOR_CKAN_DOCKER_PATH=../docker/ckan/ckanext
  if [[ ! -d $EXTENSIONS_FOR_CKAN_DOCKER_PATH ]]; then
    echo "$EXTENSIONS_FOR_CKAN_DOCKER_PATH extensions folder does not exist. Creating one..."
    cp -r ../ext $EXTENSIONS_FOR_CKAN_DOCKER_PATH
  fi

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

build_image_conditionally() {
  set -euo pipefail
  PATH_TO_DOCKERFILE="$1"
  shift;
  IMAGE_NAME="$1"
  shift;
  DOCKERFILE_ARGS="$@"
  if [[ $(docker image ls "$IMAGE_NAME" -q | wc -l) -eq 0 ]] ||
     [[ "$BUILD_IMAGE" = 'build_image' ]]
  then
    pushd "$PATH_TO_DOCKERFILE"
    if [[ -z "$DOCKERFILE_ARGS" ]]
    then
        docker image build -t "$IMAGE_NAME" .
    else
        docker image build -t "$IMAGE_NAME" --build-arg "$DOCKERFILE_ARGS" .
    fi
    popd
  fi
}

build_image_conditionally ../docker/ckan local_catalog_ckan:latest
build_image_conditionally ./ckan local_catalog_ckan_dev:latest
build_image_conditionally ../docker/solr local_catalog_solr:latest
build_image_conditionally ../docker/nginx local_catalog_nginx:latest ENVIRONMENT=local
build_image_conditionally ./postgresql local_catalog_postgresql:latest

if [ "$COMPOSE_COMMAND" == "up" ]; then
  if [ "$CI" == "ci" ]; then
    docker compose -f compose-ci.yaml --project-name datakatalogi-local --env-file ".env_ckan_common" --env-file ".env_solr_common" up -d
    RUNNER_TRACKING_ID="" && docker compose -f compose-ci.yaml --project-name datakatalogi-local --env-file ".env_ckan_common" --env-file ".env_solr_common" logs > docker-logs.txt 2>&1 &
  else
    docker compose -f compose.yaml --project-name datakatalogi-local --env-file ".env_ckan_common" --env-file ".env_solr_common" up
  fi
fi