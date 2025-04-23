FROM nginx:1.27.4-alpine3.21-otel

ARG ENVIRONMENT

ENV NGINX_DIR=/etc/nginx
ENV DOLLAR="$"
ENV NGINX_CKAN_TARGET='""'

# Variables
COPY setup/server.variables.template ${NGINX_DIR}/templates/

# configuration
COPY setup/*.conf ${NGINX_DIR}/
COPY setup/server.conf.${ENVIRONMENT} ${NGINX_DIR}/server.conf
COPY setup/otel.conf.${ENVIRONMENT} ${NGINX_DIR}/otel.conf

# custom pages
COPY custompages/* /usr/share/nginx/html/

EXPOSE 81