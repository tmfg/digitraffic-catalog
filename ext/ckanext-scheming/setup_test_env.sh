#!/usr/bin/env bash

cd /srv/app/ckanext
pip install -e .
sed -i -e 's/use = config:.*/use = config:\/srv\/app\/src\/ckan\/test-core.ini/' test.ini
sed -i -e 's/use = config:.*/use = config:\/srv\/app\/src\/ckan\/test-core.ini/' test_subclass.ini
pip install -r test-requirements.txt
