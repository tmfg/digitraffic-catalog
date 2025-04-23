#!/usr/bin/env bash
set -euo pipefail

if [ "${CI:-false}" == true ]; then
  echo "CI environment variable is set to true. Disabling opentelemetry"

  CKAN__CI_PLUGINS=$(echo "${CKAN__PLUGINS}" | sed 's/digitraffic_opentelemetry//g')

  ckan config-tool ${CKAN_INI} "ckan.plugins = ${CKAN__CI_PLUGINS}"
fi