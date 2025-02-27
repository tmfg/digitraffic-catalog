#!/usr/bin/env bash
set -euo pipefail

ckan config-tool "${CKAN_INI}" -s DEFAULT "debug = true"
ckan config-tool "${CKAN_INI}" -s logger_ckan "level = DEBUG"
ckan config-tool "${CKAN_INI}" -s logger_ckanext "level = DEBUG"

ckan config-tool "${CKAN_INI}" "ckan.auth.user_create_groups = false"
ckan config-tool "${CKAN_INI}" "ckan.auth.user_create_organizations = false"
ckan config-tool "${CKAN_INI}" "ckan.auth.user_delete_groups = false"
ckan config-tool "${CKAN_INI}" "ckan.auth.user_delete_organizations = false"
