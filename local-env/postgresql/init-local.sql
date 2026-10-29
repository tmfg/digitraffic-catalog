-- Local dev only, run by the postgres image on first start (empty data volume).
-- Same roles as prod: neither CKAN user is a superuser. The passwords match the
-- connection URLs in ../ckan.env.
CREATE USER ckan_default PASSWORD 'password1234';
CREATE USER datastore_default PASSWORD '1234password';

CREATE DATABASE ckan_default WITH OWNER ckan_default;
CREATE DATABASE datastore_default WITH OWNER ckan_default;
