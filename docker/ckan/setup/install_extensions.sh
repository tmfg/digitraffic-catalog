#!/bin/sh
set -e
set -x

echo "Installing extensions..."

pip_install() {
  if [[ ! -f "$1" ]]; then
    echo "pip_install: skipping $1 because file does not exist!"
    return 0
  fi

  echo "pip_install: installing $1 ..."

  pip install -r "$1"
}

# install extensions
pip install -e "${EXT_DIR}/ckanext-digitraffic_theme"
pip install -e "${EXT_DIR}/ckanext-entraid_authenticator"
pip install -e "${EXT_DIR}/ckanext-digitraffic_fluent"
pip install -e "${EXT_DIR}/ckanext-digitraffic_opentelemetry"
pip install -e "git+https://github.com/ckan/ckanext-dcat.git@v2.3.0#egg=ckanext-dcat"

# install requirements
pip_install "${EXT_DIR}/ckanext-digitraffic_theme/dev-requirements.txt"
pip_install "${EXT_DIR}/ckanext-entraid_authenticator/requirements.txt"
pip_install "${EXT_DIR}/ckanext-digitraffic_fluent/requirements.txt"
pip_install "${EXT_DIR}/ckanext-digitraffic_opentelemetry/requirements.txt"
pip install -r src/ckanext-dcat/requirements.txt

# We want to install our version of ckanext-scheming last so that the previously installed extensions that
# use ckanext-scheming, will use our verison of it
pip install -e "${EXT_DIR}/ckanext-scheming"
