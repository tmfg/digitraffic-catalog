#!/usr/bin/env bash

set -euo pipefail

docker exec -u ckan datakatalogi-local-ckan-1 bash -c 'cd ckanext/ckanext-digitraffic_theme && \
pip install -r dev-requirements.txt && \
pytest --ckan-ini=test.ini -rA ckanext/digitraffic_theme/tests'