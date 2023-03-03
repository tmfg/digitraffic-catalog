#!/usr/bin/env bash
set -euo pipefail

# stypido odotus, että solr on pystyssä
sleep 10

source /usr/lib/ckan/default/bin/activate

cd /usr/lib/ckan/default/src/ckan
ckan -c /etc/ckan/default/ckan.ini db init

# Setup datastore!

ckan -c /etc/ckan/default/ckan.ini run