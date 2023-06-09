#!/usr/bin/env bash
set -euo pipefail

USAGE=$(cat << EOM

usage: bundle-css.sh [-w]

Bundles the Less and SASS files together and runs PostCSS to add vendor prefixes and do minification.

When running in watch mode, includes source map file

You need to have the following installed on your computer:
- lessc (the Less compiler)
- sass (the SASS compiler)
- Node (npx)

Flags:
-w Start in watch mode. Note, Less files are not watched because the lessc compiler does not support the feature.
   
EOM
)

if [ $# -gt 1 ] ||
   ([ $# -eq 1 ] && [ "$1" -ne "-w" ])
then
  echo "$USAGE";
  exit 1;
fi;

if [ -z "$(which lessc)" ] ||
   [ -z "$(which sass)" ]
then
  echo "$USAGE";
  exit 1;
fi;

cd "$(dirname "${BASH_SOURCE[0]}")";

if [ "${1:-nope}" = "-w" ]
then
  START_IN_WATCH_MODE=0
else
  START_IN_WATCH_MODE=1
fi

CKAN_CSS_FILE=./ckanext-digitraffic_theme/ckanext/digitraffic_theme/assets/css/digitraffic_theme.css
SOURCE_CKAN_DEFAULT=./less/override_less/main.less
SOURCE_DIGITRAFFIC_THEME=./sass/digitraffic_theme.scss
SOURCE_FINTRAFFIC_DS=./Fintraffic-ds/coreui.min.css
SOURCE_FINTRAFFIC_DS_TOKENS=./Fintraffic-ds/tokens.css
TARGET_DIR=./target
TARGET_TMP_DIR="${TARGET_DIR}/.tmp"
TARGET_CKAN_DEFAULT="${TARGET_DIR}/ckan_default.css"
TARGET_DIGITRAFFIC_THEME="${TARGET_DIR}/digitraffic_theme.css"
TARGET_FINTRAFFIC_DS="${TARGET_DIR}/coreui.min.css"
TARGET_FINTRAFFIC_DS_TOKENS="${TARGET_DIR}/tokens.css"
TARGET_BUNDLE="${TARGET_DIR}/bundled.css"
TARGET_BUNDLE_TMP="${TARGET_TMP_DIR}/bundled.css"
TARGET_POLL_OUTPUT="${TARGET_TMP_DIR}/ls_output.txt"

bundle_theme() {
    echo " * BUNDLE START"
    touch $TARGET_BUNDLE_TMP;
    cat $TARGET_CKAN_DEFAULT > $TARGET_BUNDLE_TMP;
    cat $TARGET_FINTRAFFIC_DS_TOKENS >> $TARGET_BUNDLE_TMP;
    cat $TARGET_FINTRAFFIC_DS >> $TARGET_BUNDLE_TMP;
    cat $TARGET_DIGITRAFFIC_THEME >> $TARGET_BUNDLE_TMP;
    cp -f $TARGET_BUNDLE_TMP $TARGET_BUNDLE
    echo " * BUNDLE END"
}

watch_bundle() {
    touch "$TARGET_POLL_OUTPUT"
    (
        flock -x -w 10 100 || exit 1
        while true
        do
          PREVIOUS_TARGET_DIR_CONTENT="$(cat "$TARGET_POLL_OUTPUT")"
          if [ "$PREVIOUS_TARGET_DIR_CONTENT" != "$(ls -l $TARGET_DIR)" ]
          then
            bundle_theme
            ls -l $TARGET_DIR > "$TARGET_POLL_OUTPUT"
          fi
          sleep 1
        done
    ) 100< "$TARGET_POLL_OUTPUT"
}

shut_background_processes() {
    if (( $(jobs | wc -l) != 3 ))
    then
      echo "Did not find exactly three   bacground processes so none are shut down"
      jobs -l
    else
      kill %1
      kill %2
      kill %3
    fi
}

clean_tmp_dir() {
    rm -f $TARGET_BUNDLE_TMP
    rm -f $TARGET_POLL_OUTPUT
}

shut_down() {
    shut_background_processes
    clean_tmp_dir
}

mkdir -p $TARGET_TMP_DIR

echo " * Build Less files..."
lessc $SOURCE_CKAN_DEFAULT $TARGET_CKAN_DEFAULT 
echo " * Copy Fintraffic css files..."
cp $SOURCE_FINTRAFFIC_DS $TARGET_FINTRAFFIC_DS
cp $SOURCE_FINTRAFFIC_DS_TOKENS $TARGET_FINTRAFFIC_DS_TOKENS

if (( $START_IN_WATCH_MODE == 0))
then
  echo " * Start watching Sass files..."
  sass --no-source-map --watch $SOURCE_DIGITRAFFIC_THEME $TARGET_DIGITRAFFIC_THEME &
  echo " * Start watching bundle..."
  watch_bundle &
  trap 'shut_down' SIGINT;
  npx postcss $TARGET_BUNDLE -m --watch --output $CKAN_CSS_FILE --use autoprefixer --use cssnano;
else
  echo " * Build Sass files..."
  sass --no-source-map $SOURCE_DIGITRAFFIC_THEME $TARGET_DIGITRAFFIC_THEME;
  echo " * Bundle css files..."
  bundle_theme;
  npx postcss $TARGET_BUNDLE --no-map --output $CKAN_CSS_FILE --use autoprefixer --use cssnano;
  clean_tmp_dir
fi  