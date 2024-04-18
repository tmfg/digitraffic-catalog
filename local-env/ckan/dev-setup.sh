#!/usr/bin/env bash
set -euo pipefail

ckan config-tool "${CKAN_INI}" -s DEFAULT "debug = true"