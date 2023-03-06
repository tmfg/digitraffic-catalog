#!/usr/bin/env bash
set -euo pipefail

# stypido odotus, että solr on pystyssä
sleep 10

# Pitää sedillä muokata ckan.ini filua ja sen muokkaus feilaa, jos suoraan docker composen config filua muokkaa.
# Joten tehdään kopio ja muokkailaan/käytetään sitä
cp "${DK_CKAN_INI_PATH}.template" "$DK_CKAN_INI_PATH"

source ~/default/bin/activate

# Kanta kuosiin
ckan -c $DK_CKAN_INI_PATH db init

# Digitraffic teema käyttöön
cd ~/default/src/ckan
pip install -r dev-requirements.txt
cd $DK_THEME_HOME
python setup.py develop

sed -i -E 's|^(ckan.plugins =.*)|\1 digitraffic_theme|' "$DK_CKAN_INI_PATH"

# Setup datastore!

# Create admin user

#printf 'y\nadmin\nadminadmin\nadminadmin\n' | ckan -c $DK_CKAN_INI_PATH sysadmin add admin email=admin@localhost name=admin

# Tarkastele assetteja, niin muokkaukset .css filuihin tulee heti käännettyä
ckan -c $DK_CKAN_INI_PATH asset watch &

# Käynnistä CKAN
ckan -c $DK_CKAN_INI_PATH run