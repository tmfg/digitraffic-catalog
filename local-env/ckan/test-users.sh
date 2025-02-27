#!/usr/bin/env bash
set -euo pipefail

if [ -n "${E2E_SYSADMIN_ID}" ]; then
    INSERT_ADMIN_STATEMENT="INSERT INTO public.user (id, name, email, fullname, sysadmin, created) VALUES ('${E2E_SYSADMIN_ID}', '${E2E_SYSADMIN_NAME}', '${E2E_SYSADMIN_EMAIL}', '${E2E_SYSADMIN_FULLNAME}', true, NOW());";

    psql -c "${INSERT_ADMIN_STATEMENT}" "${CKAN_SQLALCHEMY_URL}";
fi