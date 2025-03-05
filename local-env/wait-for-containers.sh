#!/usr/bin/env bash
set -euo pipefail

TOTAL_SLEEP=0;
while [ "$(docker inspect --format='{{.State.Health.Status}}' datakatalogi-local-ckan-1)" != "healthy" ];
    do sleep 1;
    TOTAL_SLEEP=$((TOTAL_SLEEP+1));
done;