# Digitraffic Catalog

Contains all code for Digitraffic Catalog service.

- `dcat_schema_tranapiler` has code for reading mobilityDCAT-AP spec and turning it into ckanext-scheming compatible `.yml` file
- `ext` contains all the CKAN extensions used by this project
- `local-env` contains code for setting up a local development environment

## Developing

### Environment

To set up a development environment, go to `local-env` folder and run `./start-local-ckan.sh up build_image`.

To reload configuration or code changes, run `./reload-ckan.sh` script

### Plugins

#### digitraffic_theme

At the moment, this plugin is heavily developed and contains more than just theming related code.

If you want to change some frontend code, like SASS, HTML or TS files, you'll find the code in `ckanext/digitraffic_theme/src`
and `ckanext/digitraffic_theme/templates` folders. You can build the SASS and TS files by running `npm run bundle`

If you have transpiled a new ckanext-scheming file, copy it into `ckanext/digitraffic_theme/schemas` folder

If you are modifying mobilityDCAT-AP profile for ckanext-dcat plugin, you can find the code in `ckanext/digitraffic_theme/profiles`

##### Running tests

Inside `local-env` folder, first start the local env, then run `./run-digitraffic-theme-tests-on-docker.sh` script

## E2E-tests

E2E-tests are written using Playwright. See [E2E-testaus](https://finrail.atlassian.net/wiki/spaces/DT/pages/3710124153/E2E-testaus)
in Confluence for introduction and reasoning on how E2E-tests are written in this project.

To run the test locally, run `pnpm e2e-ui`.

To debug issues in CI, you can download two artifacts. One contains logs from the Docker container and the other
contains Playwright report that also contains traces. To see the report and run traces locally, unzip the artifact
somewhere and run `pnpm dlx playwright show-report REPORT_FOLDER_LOCATION`

## MobilityDCAT-AP metadata

In order to collect and generate metadata conforming to MobilityDCAT-AP, we first generate the ckanext-scheming
plugin schema after which the metadata is generated using ckanext-dcat plugin profile.

MobilityDCAT-AP spec's serialized version is read by the transpiler that outputs a `.yml` file understood by
ckanext-scheming plugin. This makes it possible for the end user to input the metadata of a dataset.
The metadata can then be expressed in some serialized format, such as turtle, by using ckanext-dcat plugin.
There is a MobilityDCAT-AP plugin for that.
