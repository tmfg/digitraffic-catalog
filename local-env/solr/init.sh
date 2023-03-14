#!/usr/bin/env bash
set -eu

solr-precreate-no-start ckan

echo "Kopioidaan CKAN schema"
cp /solr_ckan_schema /var/solr/data/ckan/conf/managed-schema

cd /opt/docker-solr/scripts;

./docker-entrypoint.sh solr-fg