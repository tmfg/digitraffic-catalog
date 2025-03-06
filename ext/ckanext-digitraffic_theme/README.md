[![Tests](https://github.com//ckanext-digitraffic_theme/workflows/Tests/badge.svg?branch=main)](https://github.com//ckanext-digitraffic_theme/actions)

# ckanext-digitraffic_theme

## Installing dependencies using npm

Because of CKAN dependency `--ignore-scripts` must be used.

`npm install --ignore-scripts`

## Developing

You should start a local development environment by running `./start-local-ckan.sh up build_image` inside `local-env` folder.

### CSS

Both, CKAN and [Fintraffic Design System CSS-library](https://github.com/fintraffic-design/fds-coreui-css) use
Sass. Therefore, we also use Sass as a CSS preprocessor. In order to bundle all these different sources together
and to produce one minified CSS file, we run can run `bundle-sass` npm script. The script handles the following
- Modifies CKAN default look by pulling CKAN's default Sass files and overriding the `_variables.scss` file.
- Bundles all Sass files from the different sources in the `digitraffic_theme.scss` file
    - We cannot use the new syntax of `@forward` and `@use` as CKAN and FDS are not using them so overriding variables
      doesn't really work with the new syntax
- Runs Sass cli to output the CSS file
- Uses postcss to process the CSS file that Sass outputs
    - Minify the output
    - Copy the used assets into `public/assets` folder where the browser can fetch them

#### Known warnings

- Running Sass will cause a lot of deprecation wargnings. We cannot really do much about it as wargnings mainly 
originates from the libraries that we use. We cannot even update our own `.scss` files to not use `@import` as we 
could not then override the variables.
- Postcss will complain about a file with path ending `$%7BimagePath%7D/dashboard-followee-related.png`. This is
because of an incorrect variable reference in CKAN's `_dashboard.scss` file.

### Code changes

1. Modify files to your liking
    - Compile the Sass and TypeScript by running `pnpm run bundle`
2. Run `./reload-ckan.sh` inside `local-env` folder.
3. Refresh the browser.

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

## Tests

Tests can be run with a bash script found in `local-env` folder.

## Translation

Translations are managed in two separate places for this project: in gettext files (for the use of CKAN HTML templates) and in the schema transpiler source code (for including translations in the YAML schema used by `ckanext-scheming`).

### Translations for `ckanext-scheming`

Translations for the use of the `ckanext-scheming` plugin are managed in the schema transpiler: [../../dcat_schema_transpiler/dcat_schema_transpiler/ckan_schema/mobility_dcat_ap_converter/i18n/translations.py](../../dcat_schema_transpiler/dcat_schema_transpiler/ckan_schema/mobility_dcat_ap_converter/i18n/translations.py)

### Translations for HTML templates

Translatable texts contained in CKAN HTML templates (marked with the `{% trans %}` tag) are managed via gettext (`.po`) files. This is the default way of managing translations in CKAN, and there are commands for automatically generating translation templates from the translatable texts of the current project (in this case this extension).

You can use a gettext editor such as https://poedit.net/ to edit the `.po` files. 

See also the [CKAN documentation on translating CKAN](https://docs.ckan.org/en/2.10/contributing/i18n.html#)


#### Generating and updating translations

The commands need to be run in the container where you are running CKAN. `setup.py` below is the `setup.py` of this extension.

##### Generate the translation template
`python setup.py extract_messages`

Updates the `.pot` file. This is what you need to do if you have added new translatable texts or edited previous ones in the HTML templates.

##### Generate translation template for a locale
Locale `fi` used as an example below.

`python setup.py init_catalog --locale fi`

##### Update translations for a locale
Locale `fi` used as an example below.

`python setup.py update_catalog --locale fi`

This retains previous translations but updates `msgid` values from the `.pot` template. After you have updated the `.pot` template you need to also update the translation templates for each locale using this command. 

##### Compiling the translations
If not using an editor (such as poedit) that compiles automatically on save, you will still need to compile the `.po` file into an `.mo file`. Use this command:

`python setup.py compile_catalog --locale fi`


