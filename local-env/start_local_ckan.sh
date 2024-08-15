#!/usr/bin/env bash
set -euo pipefail

USAGE=$(
  cat <<-EOM

usage: start_local_ckan.sh { up | down } [ build_image ]

Starts or stops a local CKAN server inside docker compose.

Also, builds a CKAN docker image if one does not exists or build_image argument is given.

EOM
)

if ! ([[ $# -eq 1 ]] || [[ $# -eq 2 ]]); then
  echo "$USAGE"
  exit 1
fi

if ! [[ "$1" = 'up' ||
  "$1" = 'down' ]]; then
  echo "$USAGE"
  exit 1
fi

COMPOSE_COMMAND="$1"
BUILD_IMAGE="${2:-}"

cd "$(dirname "${BASH_SOURCE[0]}")"

build_image_conditionally() {
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
  docker-compose --project-name datakatalogi-local --env-file ".env_ckan_common" --env-file ".env_solr_common" up
elif [ "$COMPOSE_COMMAND" == "down" ]; then
  docker-compose --project-name datakatalogi-local down --remove-orphans
fi
