#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")"

if [[ $(docker image ls local_ckan:latest -q | wc -l) -eq 0 ]]
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