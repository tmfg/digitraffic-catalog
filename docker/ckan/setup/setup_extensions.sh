#!/bin/sh
set -e
set -x

echo "Configuring extensions..."

# datapusher
echo "Set up ckan.datapusher.api_token in the CKAN config file"
ckan config-tool $CKAN_INI "ckan.datapusher.api_token=$(ckan -c $CKAN_INI user token add ckan_admin datapusher | tail -n 1 | tr -d '\t')"

# matomo
#echo "Set up matomo"
#ckan config-tool $CKAN_INI "ckan.matomo.site_id=jepjep"
#ckan config-tool $CKAN_INI "ckan.matomo.domain=jepjep"
#ckan config-tool $CKAN_INI "ckan.matomo.script_domain=jepjep"
#ckan config-tool $CKAN_INI "ckan.matomo.token_auth=jepjep"
#ckan config-tool $CKAN_INI "ckan.matomo.ignored_user_agents = docker-healthcheck"

# scheming
ckan config-tool $CKAN_INI "scheming.dataset_schemas = ckanext.scheming:camel_photos.yaml"
