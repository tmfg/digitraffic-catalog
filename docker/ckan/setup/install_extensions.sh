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
pip install -e "git+https://github.com/ckan/ckanext-dcat.git@v1.5.1#egg=ckanext-dcat"
pip install -e "git+https://github.com/ckan/ckanext-scheming.git@release-3.0.0#egg=ckanext-scheming"

# install requirements
pip_install "${EXT_DIR}/ckanext-digitraffic_theme/dev-requirements.txt"
pip install -r src/ckanext-dcat/requirements.txt
