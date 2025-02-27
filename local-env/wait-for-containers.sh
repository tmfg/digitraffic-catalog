#!/usr/bin/env bash
set -euo pipefail

TOTAL_SLEEP=0;
while [ "$(docker inspect --format='{{.State.Health.Status}}' datakatalogi-local-ckan-1)" != "healthy" ];
    do sleep 1;
    TOTAL_SLEEP=$((TOTAL_SLEEP+1));
    if (( TOTAL_SLEEP % 60 == 0 )); then
        echo "ENV VARIABLES:";
        docker inspect --format='{{range .Config.Env }}{{println (index (split . "=") 0)}}{{end}}' datakatalogi-local-ckan-1;
        echo "HEALTH CHECK INFO:";
        docker inspect --format='{{json .Config.Healthcheck}}' datakatalogi-local-ckan-1;
        echo "STATUS INFO:";
        docker inspect --format='{{json .State}}' datakatalogi-local-ckan-1;
    fi;
done;