#!/usr/bin/env bash

set -euo pipefail

USAGE=$(
  cat <<-EOM

usage: update-language-translation.sh { fi | sv }

NOTE: After running this script, you need to restart the docker containers.

Updates the .po file of the given language under i18n folder. The update is based on the ckanext-digitraffic_theme.pot
file under i18n folder.

EOM
)

if ! [[ $# -eq 1 ]]; then
  echo "$USAGE"
  exit 1
fi

if ! [[ "$1" = 'fi' ||
  "$1" = 'sv' ]]; then
  echo "$USAGE"
  exit 1
fi

TRANSLATION_LANGUAGE="$1"

docker exec -u ckan datakatalogi-local-ckan-1 bash -c "cd ckanext/ckanext-digitraffic_theme && \
python setup.py update_catalog -l ${TRANSLATION_LANGUAGE} && \
python setup.py compile_catalog"