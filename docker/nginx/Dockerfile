FROM nginx:1.25.4-alpine-slim

ENV NGINX_DIR=/etc/nginx

# configuration
COPY setup/*.conf ${NGINX_DIR}/

# custom pages
COPY custompages/* /usr/share/nginx/html/

EXPOSE 81