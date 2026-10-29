#!/usr/bin/env bash
# shellcheck shell=busybox
# Local dev and E2E only: insert the E2E sysadmin (E2E_SYSADMIN_* from .env.local) on every start.
set -euo pipefail

if [ -n "${E2E_SYSADMIN_ID:-}" ]; then
    INSERT_ADMIN_STATEMENT="INSERT INTO public.user (id, name, email, fullname, sysadmin, created) VALUES ('${E2E_SYSADMIN_ID}', '${E2E_SYSADMIN_NAME}', '${E2E_SYSADMIN_EMAIL}', '${E2E_SYSADMIN_FULLNAME}', true, NOW()) ON CONFLICT DO NOTHING;";

    psql -c "${INSERT_ADMIN_STATEMENT}" "${CKAN_SQLALCHEMY_URL}";
fi