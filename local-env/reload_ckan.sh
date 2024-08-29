#!/usr/bin/env bash

UWSGI_PROCESS_ID=$(docker exec datakatalogi-local-ckan-1 ps | grep ckan | grep uwsgi | head -n 1 | awk '{print $1}')
docker exec datakatalogi-local-ckan-1 kill -HUP ${UWSGI_PROCESS_ID}