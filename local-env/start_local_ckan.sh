#!/usr/bin/env bash
set -euo pipefail

USAGE=$(cat <<-EOM

usage: start_local_ckan.sh { up | down } [ build_image ]

Starts or stops a local CKAN server inside docker compose.

Also, builds a CKAN docker image if one does not exists or build_image argument is given.

EOM
)

if ! ([[ $# -eq 1 ]] || [[ $# -eq 2 ]]) ; then echo "$USAGE"; exit 1; fi;

if ! [[ "$1" = 'up'  ||
    "$1" = 'down' ]];
then echo "$USAGE";
     exit 1;
fi;

cd "$(dirname "${BASH_SOURCE[0]}")"

if [[ $(docker image ls local_ckan:latest -q | wc -l) -eq 0 ]] ||
   ([[ $# -eq 2 ]] && [[ "$2" = 'build_image' ]])
then
  cd ckan
  docker image build -t local_ckan:latest .
  cd ..
fi

if [ "$1" == "up" ]; then
  docker compose --project-name datakatalogi-local up
elif [ "$1" == "down" ]; then
  docker compose --project-name datakatalogi-local down --remove-orphans
fi