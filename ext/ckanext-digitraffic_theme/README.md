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

## Tests

Tests can be run with a bash script found in `local-env` folder.
