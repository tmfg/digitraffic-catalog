FROM postgres:15.12

COPY ./postgresql.conf /etc/postgresql/
COPY --chmod=0500 --chown=postgres:postgres ./db_users_setup.sh /docker-entrypoint-initdb.d/