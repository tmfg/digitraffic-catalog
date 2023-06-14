FROM nginx:1.25.0-alpine-slim

ENV NGINX_DIR=/etc/nginx

COPY setup/nginx.conf ${NGINX_DIR}/nginx.conf
COPY setup/index.html /usr/share/nginx/html/index.html
COPY setup/server.conf ${NGINX_DIR}/conf.d/
COPY setup/security_headers.conf ${NGINX_DIR}/conf.d/

RUN mkdir -p ${NGINX_DIR}/certs
COPY setup/ckan-local.* ${NGINX_DIR}/certs/

EXPOSE 81