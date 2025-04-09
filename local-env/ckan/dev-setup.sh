#!/usr/bin/env bash
set -euo pipefail

ckan config-tool "${CKAN_INI}" -s DEFAULT "debug = true"
ckan config-tool "${CKAN_INI}" -s logger_ckan "level = DEBUG"
ckan config-tool "${CKAN_INI}" -s logger_ckanext "level = DEBUG"
ckan config-tool "${CKAN_INI}" -s formatter_generic 'format = '\''{"asctime": ${asctime}, "name": ${name}, "levelname": ${levelname}, "message": ${message}, "SpanID": ${otelSpanID}, "TraceID": ${otelTraceID}, "otelServiceName": ${otelServiceName}, "otelTraceSampled": ${otelTraceSampled}}'\'''
ckan config-tool "${CKAN_INI}" -s formatter_generic "style = $"
ckan config-tool "${CKAN_INI}" -s formatter_generic "class = catalog_log_config.CustomFormatter"
ckan config-tool "${CKAN_INI}" -s handlers "keys = console"
ckan config-tool "${CKAN_INI}" -s logger_root "handlers = console"
ckan config-tool "${CKAN_INI}" -s logger_ckan "handlers = console"
ckan config-tool "${CKAN_INI}" -s logger_ckanext "handlers = console"
ckan config-tool "${CKAN_INI}" -s logger_werkzeug "handlers = console"

ckan config-tool "${CKAN_INI}" -s handler_console "formatter = generic"

ckan config-tool "${CKAN_INI}" "ckan.auth.user_create_groups = false"
ckan config-tool "${CKAN_INI}" "ckan.auth.user_create_organizations = false"
ckan config-tool "${CKAN_INI}" "ckan.auth.user_delete_groups = false"
ckan config-tool "${CKAN_INI}" "ckan.auth.user_delete_organizations = false"
