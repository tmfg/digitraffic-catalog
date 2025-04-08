#!/usr/bin/env bash
set -euo pipefail

ckan config-tool "${CKAN_INI}" -s DEFAULT "debug = true"
ckan config-tool "${CKAN_INI}" -s logger_ckan "level = DEBUG"
ckan config-tool "${CKAN_INI}" -s logger_ckanext "level = DEBUG"
ckan config-tool "${CKAN_INI}" -s formatter_generic 'format = '\''{"asctime": ${asctime}, "name": ${name}, "levelname": ${levelname}, "message": ${message}, "SpanID": ${otelSpanID}, "TraceID": ${otelTraceID}, "otelServiceName": ${otelServiceName}, "otelTraceSampled": ${otelTraceSampled}}'\'''
ckan config-tool "${CKAN_INI}" -s formatter_generic "style = $"
ckan config-tool "${CKAN_INI}" -s formatter_generic "class = catalog_log_config.CustomFormatter"
ckan config-tool "${CKAN_INI}" -s handlers "keys = file, console"
ckan config-tool "${CKAN_INI}" -s logger_root "handlers = file, console"
ckan config-tool "${CKAN_INI}" -s logger_ckan "handlers = file, console"
ckan config-tool "${CKAN_INI}" -s logger_ckanext "handlers = file, console"
ckan config-tool "${CKAN_INI}" -s logger_werkzeug "handlers = file, console"
ckan config-tool "${CKAN_INI}" -s handler_file "class = logging.handlers.RotatingFileHandler"
ckan config-tool "${CKAN_INI}" -s handler_file "formatter = generic"
ckan config-tool "${CKAN_INI}" -s handler_file "filename = ckan.log"
ckan config-tool "${CKAN_INI}" -s handler_file "args = ['logs/ckan.log', 'a', 16000, 0]"
ckan config-tool "${CKAN_INI}" -s handler_file "maxBytes = 16000"
ckan config-tool "${CKAN_INI}" -s handler_file "backupCount = 0"
ckan config-tool "${CKAN_INI}" -s handler_file "level = NOTSET"
ckan config-tool "${CKAN_INI}" -s handler_file "mode = 'a'"

ckan config-tool "${CKAN_INI}" -s handler_console "formatter = generic"

ckan config-tool "${CKAN_INI}" "ckan.auth.user_create_groups = false"
ckan config-tool "${CKAN_INI}" "ckan.auth.user_create_organizations = false"
ckan config-tool "${CKAN_INI}" "ckan.auth.user_delete_groups = false"
ckan config-tool "${CKAN_INI}" "ckan.auth.user_delete_organizations = false"
