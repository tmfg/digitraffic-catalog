#!/bin/sh
set -e

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

# install extensions
pip install -e "${EXT_DIR}/ckanext-digitraffic_theme"
