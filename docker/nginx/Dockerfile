FROM nginx:1.27-alpine-slim

ENV NGINX_DIR=/etc/nginx

# configuration
COPY setup/*.conf ${NGINX_DIR}/

# custom pages
COPY custompages/* /usr/share/nginx/html/

EXPOSE 81