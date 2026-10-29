#!/usr/bin/env bash
# shellcheck shell=busybox
# Local dev only: debug mode and verbose logging.
# Sourced by start_ckan.sh (in the CI repo) on every container start, so it must stay POSIX sh.
set -euo pipefail

ckan config-tool "${CKAN_INI}" -s DEFAULT "debug = true"
ckan config-tool "${CKAN_INI}" -s logger_ckan "level = DEBUG"
ckan config-tool "${CKAN_INI}" -s logger_ckanext "level = DEBUG"
ckan config-tool "${CKAN_INI}" -s logger_otel "level = DEBUG"

## Uncomment these if you want to do debugging
#ckan config-tool "${CKAN_INI}" "digitraffic_opentelemetry.loggers_to_set_events = ckan ckanext"
#ckan config-tool "${CKAN_INI}" "digitraffic_opentelemetry.enter_pdb_on_error = true"
#ckan config-tool "${CKAN_INI}" "digitraffic_opentelemetry.instrument_ckan_alpha = true"
