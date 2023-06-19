FROM nginx:1.25.0-alpine-slim

ENV NGINX_DIR=/etc/nginx

# configuration
COPY setup/nginx.conf ${NGINX_DIR}/nginx.conf
COPY setup/server.conf ${NGINX_DIR}/conf.d/
COPY setup/security_headers.conf ${NGINX_DIR}/conf.d/
COPY setup/errorpages.conf ${NGINX_DIR}/conf.d/

# custom pages
COPY custompages/* /usr/share/nginx/html/

EXPOSE 81