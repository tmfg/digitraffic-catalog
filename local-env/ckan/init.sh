#!/usr/bin/env bash
set -euxo pipefail

# stypido odotus, että solr on pystyssä
sleep 10

source ~/default/bin/activate

# Kanta kuosiin
ckan -c $DK_CKAN_INI_PATH db init

# Setup datastore!

# Create admin user

printf 'y\nadminadmin\nadminadmin\n' | ckan -c $DK_CKAN_INI_PATH sysadmin add admin email=admin@localhost name=admin

# Tarkastele assetteja, niin muokkaukset .css filuihin tulee heti käännettyä
ckan -c $DK_CKAN_INI_PATH asset watch &

# Käynnistä CKAN
ckan -c $DK_CKAN_INI_PATH run