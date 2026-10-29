#!/usr/bin/env bash
# shellcheck shell=busybox
# Local dev only. Make the bind-mounted ext/ the code CKAN runs, and add dev tooling.
# Sourced by start_ckan.sh (in the CI repo) on every container start, so it must stay POSIX sh.
set -euo pipefail

# Explicit list, as in the CI repo's install_extensions.sh: a ckanext-* glob would also pick
# up any vendored copy of a third-party extension.
for extension in ckanext-digitraffic_core ckanext-entraid_authenticator \
  ckanext-digitraffic_fluent ckanext-digitraffic_opentelemetry; do
  pip install --quiet --no-deps -e "${EXT_DIR}/${extension}"
done

# flask_debugtoolbar: newer versions break.
pip install --quiet --only-binary=:all: flask_debugtoolbar==0.14.1 \
  -r "${EXT_DIR}/ckanext-digitraffic_core/dev-requirements.txt"
