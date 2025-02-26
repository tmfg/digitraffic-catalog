#!/usr/bin/env bash
set -euo pipefail

if [[ -n "${SYSADMIN_ID}" ]];
then
    INSERT_ADMIN_STATEMENT="INSERT INTO public.user (id, name, email, fullname, sysadmin, created) \
VALUES ('${SYSADMIN_ID}', '${SYSADMIN_NAME}', '${SYSADMIN_EMAIL}', '${SYSADMIN_FULLNAME}', true, NOW());";

    psql -c "${INSERT_ADMIN_STATEMENT}" "${CKAN_SQLALCHEMY_URL}";
fi