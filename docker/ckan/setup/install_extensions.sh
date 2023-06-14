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

# install requirements
pip_install "${EXT_DIR}/ckanext-digitraffic_theme/dev-requirements.txt"
pip install -r "https://raw.githubusercontent.com/vrk-kpa/ckanext-dcat/d653dc87f5a64a995e7ff1ff8d9bf73123823e07/requirements.txt"

# install extensions
pip install -e "${EXT_DIR}/ckanext-digitraffic_theme"
pip install -e "git+https://github.com/vrk-kpa/ckanext-scheming.git@master#egg=ckanext-scheming"
pip install -e "git+https://github.com/vrk-kpa/ckanext-dcat.git@v0.0.6#egg=ckanext-dcat"
