[![Tests](https://github.com//ckanext-digitraffic_theme/workflows/Tests/badge.svg?branch=main)](https://github.com//ckanext-digitraffic_theme/actions)

# ckanext-digitraffic_theme

## Installing dependencies using npm

Because of CKAN dependency `--ignore-scripts` must be used.

`npm install --ignore-scripts`

## Developing

You should star local development environment by running `./start-local-ckan.sh up build_image` inside `local-env` folder.

### CSS

1. Modify the Sass files to your liking
2. Compile the stylings by running `npm run bundle`
3. Run `./reload-ckan.sh` inside `local-env` folder.
4. Refresh the browser.

## Installation

**TODO:** Add any additional install steps to the list below.
   For example installing any non-Python dependencies or adding any required
   config settings.

To install ckanext-digitraffic_theme:

1. Activate your CKAN virtual environment, for example:

     . /usr/lib/ckan/default/bin/activate

2. Clone the source and install it on the virtualenv

    git clone https://github.com//ckanext-digitraffic_theme.git
    cd ckanext-digitraffic_theme
    pip install -e .
	pip install -r requirements.txt

3. Add `digitraffic_theme` to the `ckan.plugins` setting in your CKAN
   config file (by default the config file is located at
   `/etc/ckan/default/ckan.ini`).

4. Restart CKAN. For example if you've deployed CKAN with Apache on Ubuntu:

     sudo service apache2 reload


## Translation

Translations contained in CKAN HTML templates are managed via gettext (`.po`) files. There are CKAN commands for automatically generating translation templates from the translatable texts of the current project (in this case this extension).

You can use a gettext editor such as https://poedit.net/ to edit the `.po` files. 

Translations for the use of the `ckanext-scheming` plugin are managed in the schema transpiler: [../../dcat_schema_transpiler/dcat_schema_transpiler/ckan_schema/mobility_dcat_ap_converter/i18n/translations.py](../../dcat_schema_transpiler/dcat_schema_transpiler/ckan_schema/mobility_dcat_ap_converter/i18n/translations.py)

[CKAN documentation on translations](https://docs.ckan.org/en/2.9/contributing/i18n.html#)

### Generating and updating translations

The commands need to be run in the container where you are running CKAN. `setup.py` below is the `setup.py` of this extension.

#### Generate the translation template
`python setup.py extract_messages`

Updates the `.pot` file. This is what you need to do if you have added new translatable texts or edited previous ones in the HTML templates.

#### Generate translation template for a locale
Locale `fi` used as an example below.

`python setup.py init_catalog --locale fi`

#### Update translations for a locale
Locale `fi` used as an example below.

`python setup.py update_catalog --locale fi`

This retains previous translations but updates `msgid` values from the `.pot` template. After you have updated the `.pot` template you need to also update the translation templates for each locale. 

#### Compiling the translations
If not using an editor (such as poedit) that compiles automatically on save, you will still need to compile the `.po` file into an `.mo file`. Use this command:

`python setup.py compile_catalog --locale fi`

## Tests

Tests can be run with a bash script found in `local-env` folder.
