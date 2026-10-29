# Digitraffic Catalog

A CKAN-based data catalog for transportation and mobility datasets, compliant with MobilityDCAT-AP (Mobility Data Catalog Application Profile) standards.

## Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Development Workflows](#development-workflows)
- [Testing](#testing)
- [Translation](#translation)

## Overview

### Key Components

#### 1. `dcat_schema_transpiler/`

Converts MobilityDCAT-AP RDF specifications into ckanext-scheming schema file.


**Key files**:
- `dcat_schema_transpiler/transpiler.py` - Main transpiler entry point
- `dcat_schema_transpiler/mobility_dcat_ap/dataset.py` - MobilityDCAT-AP dataset model
- `dcat_schema_transpiler/mobility_dcat_ap_to_schema.py` - Conversion logic to YAML
- `dcat_schema_transpiler/cache/vocabularies.py` - Vocabulary caching to avoid repeated downloads

#### 2. `ext/ckanext-digitraffic_core/`
Contains all custom CKAN functionality.

**Key files**:

- `src/` - Frontend source code (TypeScript, SASS)
- `ckanext/digitraffic_core/` - Main CKAN extension code 
  - actions
  - authorization
  - helpers
  - migrations
  - profiles (used by ckanext-dcat to generate RDF serializations)
  - schema (used by ckanext-scheming to generate UI forms)
  - templates
  - validators
  - views (Flask blueprints)
- `e2e/` - Playwright end-to-end tests

#### 3. `ext/ckanext-digitraffic_fluent/`

Multilingual support for datasets, resources, organizations, and groups.

#### 4. `ext/ckanext-entraid_authenticator/`

Microsoft Entra ID (Azure AD) authentication integration.

#### 5. `ext/ckanext-digitraffic_opentelemetry/`

OpenTelemetry integration for monitoring and tracing.

#### 6. `local-env/`

Docker Compose environment for local development and the GitHub test workflows.See [local-env/README.md](local-env/README.md)
for what each file does.

**Components**:

- CKAN application container
- PostgreSQL database
- Apache Solr search engine
- Redis cache
- Nginx reverse proxy
- OpenTelemetry collector and Jaeger

## Quick Start

### Prerequisites

- Docker and Docker Compose (2.24 or newer)
- The CI repository checked out locally, with `DIGITRAFFIC_CI_PATH` pointing to it: set it in
  `local-env/.env` (git-ignored), relative to `local-env/`, e.g. `DIGITRAFFIC_CI_PATH=../../<ci-repository>`
- Node.js and pnpm
- Python (for transpiler development)
- Poetry (for transpiler dependencies)

### 1. Start Local Development Environment

```bash
cd local-env
./dev.sh up            # docker compose up --renew-anon-volumes; add -d to run in the background
```

`./dev.sh help` lists every command and the `docker compose` command behind it.

**What this does**:
- Builds the CKAN, Solr and Nginx images from the prod Dockerfiles in the CI repository
  (only when missing; `./dev.sh up --build` rebuilds)
- Starts all containers, including PostgreSQL, Redis, the OpenTelemetry collector and Jaeger
- Installs the extensions in `ext/` in editable mode, runs migrations and inserts the E2E
  sysadmin (scripts in `local-env/ckan/docker-entrypoint.d/`)

**Configuration**:

- CKAN settings: `local-env/ckan.env`. Secrets and personal overrides (Entra test app, E2E
  sysadmin): copy `local-env/.env.local.example` to `local-env/.env.local`.
- Debug logging: `local-env/ckan/docker-entrypoint.d/20-dev-setup.sh`. For more detailed
  debugging info, uncomment the following properties there:
  - `digitraffic_opentelemetry.loggers_to_set_events = ckan ckanext`
  - `digitraffic_opentelemetry.enter_pdb_on_error = true`
  - `digitraffic_opentelemetry.instrument_ckan_alpha = true`
- Debugging with pdb: uWSGI runs a single worker without threads (`CKAN_UWSGI_MODE=pdb`), so a
  `breakpoint()` halts the request. Run `./dev.sh attach` to reach the debugger; detach with
  Ctrl-P Ctrl-Q. `CKAN_UWSGI_MODE= ./dev.sh up` runs the prod process model instead.

**Access the catalog**: http://localhost:8080 (nginx) or http://localhost:5000 (CKAN directly).
Traces: http://localhost:16686.

### 2. Reload After Code Changes

```bash
cd local-env
./dev.sh reload        # docker compose restart ckan
```

### 3. Stop

```bash
cd local-env
./dev.sh down          # add -v to also delete the database and Solr data
```

## Development Workflows

### Working with Frontend Code (CSS/JavaScript)

**Location of files**:
- TypeScript: `ext/ckanext-digitraffic_core/src/ts/`
- SASS: `ext/ckanext-digitraffic_core/src/sass/`
- Templates: `ext/ckanext-digitraffic_core/ckanext/digitraffic_core/templates/`

**Workflow**:

1. **Install dependencies** (first time only):
   ```bash
   cd ext/ckanext-digitraffic_core
   pnpm install --ignore-scripts
   ```

2. **Make your changes**:
   To TypeScript or SASS files. Or if you want to override CKAN default CSS, modify `src/sass/override_ckan/_variables.scss`.
   See `override-ckan-default-variables` package.json script.

3. **Bundle the assets**:
   ```bash
   pnpm run bundle
   ```
   
   This runs:
   - `bundle-ts`: Compiles TypeScript with Rollup
   - `bundle-sass`: Compiles SASS, processes with PostCSS, minifies
     - Known warnings
       - Running Sass will cause a lot of deprecation wargnings. We cannot really do much about it as wargnings mainly 
       originates from the libraries that we use. We cannot even update our own `.scss` files to not use `@import` as we 
       could not then override the variables.
       - Postcss will complain about a file with path ending `$%7BimagePath%7D/dashboard-followee-related.png`. This is 
       because of an incorrect variable reference in CKAN's `_dashboard.scss` file.

4. **Reload CKAN**:
   ```bash
   cd ../../local-env
   ./dev.sh reload
   ```

5. **Refresh browser** to see changes

### Working with Dataset Schema

**The schema defines**:
- What fields appear in dataset forms
- Field types, labels, help text
- Validation rules
- Required vs optional fields
- Translations

#### Regenerate from MobilityDCAT-AP Spec

**Workflow**:

1. **Update RDF sources** (if needed):
   Edit transpiler files as needed

2. **Install transpiler dependencies**:
   ```bash
   cd dcat_schema_transpiler
   poetry install
   ```

3. **Run transpiler**:
   ```bash
   poetry run python dcat_schema_transpiler/transpiler.py
   ```
   
   **Output**: `dcat_schema_transpiler/output/schema.yaml`

4. **Copy to CKAN extension**:
   ```bash
   cp output/schema.yaml ../ext/ckanext-digitraffic_core/ckanext/digitraffic_core/schemas/mobility_dcat.yaml
   ```

5. **Reload CKAN**:
   ```bash
   cd ../local-env
   ./dev.sh reload
   ```

## Testing

### Unit Tests (Python)

**Location**: `ext/ckanext-digitraffic_core/ckanext/digitraffic_core/tests/`

**Run tests** (the environment must be running):
```bash
cd local-env
./dev.sh test                                             # all tests
./dev.sh test validators/test_dataset_validators.py       # one file
./dev.sh test auth/test_user_auth.py TestUserAuth::test_user_show_self   # one test
./dev.sh test -k uniqueness ckanext/digitraffic_core/tests   # raw pytest arguments
```

Without Docker (the AI devcontainer), `local-env/ckan-venv.sh` installs CKAN into a venv and runs
the same tests against the backing services: `./ckan-venv.sh setup`, then `./ckan-venv.sh test`.

### E2E Tests (Playwright)

**Location**: `ext/ckanext-digitraffic_core/e2e/`

**Run tests locally**:
```bash
cd ext/ckanext-digitraffic_core
pnpm e2e-ui  # Opens Playwright UI
# or
pnpm e2e     # Headless mode
```

## Translation

Translations are managed in two separate places for this project: in gettext files (for the use of CKAN HTML templates) and in the schema transpiler source code (for including translations in the YAML schema used by `ckanext-scheming`).

### Translations for `ckanext-scheming`

Translations for the use of the `ckanext-scheming` plugin are managed in the schema transpiler: [dcat_schema_transpiler/dcat_schema_transpiler/ckan_schema/mobility_dcat_ap_converter/i18n/translations.py](../../dcat_schema_transpiler/dcat_schema_transpiler/ckan_schema/mobility_dcat_ap_converter/i18n/translations.py)

### Translations for HTML templates

Translatable texts contained in CKAN HTML templates (marked with the `{% trans %}` tag) are managed via gettext (`.po`) files. This is the default way of managing translations in CKAN, and there are commands for automatically generating translation templates from the translatable texts of the current project (in this case this extension).

You can use a gettext editor such as https://poedit.net/ to edit the `.po` files.

See also the [CKAN documentation on translating CKAN](https://docs.ckan.org/en/2.10/contributing/i18n.html#)


#### Generating and updating translations

The commands need to be run in the container where you are running CKAN. `setup.py` below is the `setup.py` of this extension.
For the common case, `./dev.sh translate fi` (or `sv`) in `local-env/` runs `update_catalog` and `compile_catalog` for one locale; `./dev.sh reload` then loads the result.
To run the others, open a shell in the container: `docker compose exec -u ckan -w /srv/app/ckanext/ckanext-digitraffic_core ckan sh`.

##### Generate the translation template
`python setup.py extract_messages`

Updates the `.pot` file. This is what you need to do if you have added new translatable texts or edited previous ones in the HTML templates.

##### Generate translation template for a locale
Locale `fi` used as an example below.

`python setup.py init_catalog --locale fi`

##### Update translations for locales
`python setup.py update_catalog`
This updates all locales.

`python setup.py update_catalog --locale fi`
Updates a specific locale.

The `upcate_catalog` command retains previous translations but updates `msgid` values from the `.pot` template. After you have updated the `.pot` template, you need to also update the translation templates for each locale using this command.

##### Compiling the translations
If not using an editor (such as poedit) that compiles automatically on save, you will still need to compile the `.po` file into an `.mo file`. Use this command:

`python setup.py compile_catalog --locale fi`

---

## Additional Resources

- **CKAN Documentation**: https://docs.ckan.org/en/latest/
- **MobilityDCAT-AP Specification**: https://mobilitydcat-ap.github.io/mobilityDCAT-AP/releases/
- **Fintraffic Design System**: https://github.com/fintraffic-design
