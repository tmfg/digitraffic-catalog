#!/bin/sh
set -e
set -x

echo "Configuring extensions..."

# datapusher
#echo "Set up ckan.datapusher.api_token in the CKAN config file"
#ckan config-tool $CKAN_INI "ckan.datapusher.api_token=$(ckan -c $CKAN_INI user token add ckan_admin datapusher | tail -n 1 | tr -d '\t')"

# matomo
#echo "Set up matomo"
#ckan config-tool $CKAN_INI "ckan.matomo.site_id=jepjep"
#ckan config-tool $CKAN_INI "ckan.matomo.domain=jepjep"
#ckan config-tool $CKAN_INI "ckan.matomo.script_domain=jepjep"
#ckan config-tool $CKAN_INI "ckan.matomo.token_auth=jepjep"
#ckan config-tool $CKAN_INI "ckan.matomo.ignored_user_agents = docker-healthcheck"

# scheming
ckan config-tool $CKAN_INI "scheming.dataset_schemas = ckanext.digitraffic_theme.schemas:mobility_dcat.yaml"
ckan config-tool $CKAN_INI "scheming.presets = ckanext.scheming:presets.json ckanext.fluent:presets.json"

# DCAT
## Make it possible for MobilityDCAT-AP metadata requester to define in which serialization format the metadata should
## be returned
ckan config-tool $CKAN_INI "ckanext.dcat.enable_content_negotiation = True"
## Add mobility_dcat_ap profile
ckan config-tool $CKAN_INI "ckanext.dcat.rdf.profiles = euro_dcat_ap mobility_dcat_ap"
## If this is Ture, it will break the package_dict data model
ckan config-tool $CKAN_INI "ckanext.dcat.translate_keys = False"
