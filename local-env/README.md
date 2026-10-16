# local-env

Docker Compose environment for local development and the GitHub test workflows. How to use
it is in the [root README](../README.md#quick-start); `./dev.sh help` lists the commands.

| File | Purpose |
|---|---|
| `compose.yaml` | CKAN, nginx, OpenTelemetry collector, Jaeger; includes `compose.services.yaml` |
| `compose.services.yaml` | PostgreSQL, Solr, Redis — also included by the AI devcontainer, so self-contained |
| `.env` | Git-ignored, required: `DIGITRAFFIC_CI_PATH`, the CI repository checkout. Read by compose (also when the AI devcontainer includes `compose.services.yaml`) and by `ckan-venv.sh` |
| `ckan.env` | Non-secret CKAN config. Read by compose and by `ckan-venv.sh`: literal values only |
| `.env.local.example` | Template for `.env.local` (gitignored, optional): Entra test app, E2E sysadmin, overrides |
| `ckan/docker-entrypoint.d/` | Mounted into the CKAN container: editable installs, debug logging, migrations, E2E user |
| `postgresql/init-local.sql` | Creates the CKAN and datastore users and databases on first start |
| `otel-collector-config.yaml` | Sends traces to Jaeger (http://localhost:16686) |
| `dev.sh` | Thin wrapper around `docker compose` |
| `ckan-venv.sh` | CKAN in a venv: tests in the AI devcontainer, interpreter for IDEs |
| `scripts/po2excel.py` | Translation export helper |

CKAN runs uWSGI in pdb mode (`CKAN_UWSGI_MODE=pdb`: one worker, no master, no threads) so a
breakpoint halts the request; `./dev.sh attach` reaches the debugger. Start with
`CKAN_UWSGI_MODE= ./dev.sh up` to run the prod process model instead.
