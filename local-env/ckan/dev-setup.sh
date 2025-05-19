#!/usr/bin/env bash
set -euo pipefail

ckan config-tool "${CKAN_INI}" -s DEFAULT "debug = true"
ckan config-tool "${CKAN_INI}" -s logger_ckan "level = DEBUG"
ckan config-tool "${CKAN_INI}" -s logger_ckanext "level = DEBUG"
ckan config-tool "${CKAN_INI}" -s logger_otel "level = DEBUG"

ckan config-tool "${CKAN_INI}" "ckan.auth.user_create_groups = false"
ckan config-tool "${CKAN_INI}" "ckan.auth.user_create_organizations = false"
ckan config-tool "${CKAN_INI}" "ckan.auth.user_delete_groups = false"
ckan config-tool "${CKAN_INI}" "ckan.auth.user_delete_organizations = false"

## Uncomment these if you want to do debugging
#ckan config-tool "${CKAN_INI}" "digitraffic_opentelemetry.loggers_to_set_events = ckan ckanext"
#ckan config-tool "${CKAN_INI}" "digitraffic_opentelemetry.enter_pdb_on_error = true"
#ckan config-tool "${CKAN_INI}" "digitraffic_opentelemetry.instrument_ckan_alpha = true"
