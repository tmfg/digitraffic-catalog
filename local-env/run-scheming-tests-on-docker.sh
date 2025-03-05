#!/usr/bin/env bash

set -euo pipefail

docker exec -u ckan datakatalogi-local-ckan-1 bash -c 'cd ckanext/ckanext-scheming && \
pip install -r test-requirements.txt && \
pytest --ckan-ini=test.ini -rA ckanext/scheming/tests'
