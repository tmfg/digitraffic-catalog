FROM local_catalog_ckan:latest

# Newer versions breaks
RUN pip3 install flask_debugtoolbar==0.14.1
COPY ./dev-setup.sh /docker-entrypoint.d/dev-setup.sh
COPY ./run-migrations.sh /docker-entrypoint.d/run-migrations.sh
