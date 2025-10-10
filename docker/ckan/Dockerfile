FROM python:3.12.10-alpine3.21
ARG CKAN_VERSION=ckan-2.11.3

# Internals, you probably don't need to change these
ENV APP_DIR=/srv/app
ENV CKAN_CONFIG_DIR=${APP_DIR}/config
ENV SRC_DIR=/srv/app/src
ENV EXT_DIR=${APP_DIR}/ckanext
ENV CKAN_INI=${CKAN_CONFIG_DIR}/ckan.ini
ENV PIP_SRC=${SRC_DIR}
ENV CKAN_STORAGE_PATH=/var/lib/ckan
ENV GIT_URL=https://github.com/ckan/ckan.git
# CKAN version to build
ENV GIT_BRANCH=${CKAN_VERSION}

ENV PIP_BREAK_SYSTEM_PACKAGES 1

# UWSGI options
ENV UWSGI_HARAKIRI=50
ENV PYTHONPATH=/srv/app

WORKDIR ${APP_DIR}

RUN mkdir -p ${CKAN_CONFIG_DIR}

# Install necessary packages to run CKAN
RUN apk add --no-cache tzdata \
    git \
    curl \
    bash

# Packages to build CKAN requirements and plugins
RUN apk add --no-cache tzdata \
    postgresql-client \
    libmagic

RUN apk add --no-cache --virtual .build-deps \
    libxml2-dev \
    libxslt-dev \
    g++ \
    linux-headers \
    postgresql-dev

# Create SRC_DIR
RUN  mkdir -p ${SRC_DIR} && \
    # Install supervisord and uwsgi
    pip3 install supervisor --break-system-packages && \
    mkdir /etc/supervisord.d && \
    rm -rf ${SRC_DIR}/get-pip.py

COPY setup/supervisord.conf /etc/supervisord.d/

# Install CKAN
RUN pip3 install -e git+${GIT_URL}@${GIT_BRANCH}#egg=ckan && \
    cd ${SRC_DIR}/ckan && \
    pip3 install --no-binary markdown -r requirements.txt && \
    # Install CKAN envvars to support loading config from environment variables
    pip3 install -e git+https://github.com/okfn/ckanext-envvars.git#egg=ckanext-envvars && \
    # Install specific version of Setuptools so that CKAN works \
    pip3 install 'setuptools==80.9.0' && \
    # Create and update CKAN config
    ckan generate config ${CKAN_INI} && \
    ckan config-tool ${CKAN_INI} "beaker.session.secret = " && \
    ckan config-tool ${CKAN_INI} "ckan.plugins = ${CKAN__PLUGINS}"

# Create a local user and group to run the app
RUN addgroup -g 92 -S ckan && \
    adduser -u 92 -h /home/ckan -s /bin/bash -D -G ckan ckan

# Create local storage folder
RUN mkdir -p ${CKAN_STORAGE_PATH} && \
    chown -R ckan:ckan ${CKAN_STORAGE_PATH}

# Install UWSGI
## Building from the source is the recommended way to install uWSGI
## Also, there are issues with PYTHONPATH when installing uWSGI using
## distribution packages (see https://github.com/unbit/uwsgi/issues/2341)
RUN apk add build-base
RUN cd /opt && \
    git clone --depth 1 --branch 2.0.28 https://github.com/unbit/uwsgi.git && \
    cd uwsgi && \
    python uwsgiconfig.py --build core && \
    python uwsgiconfig.py --plugin plugins/python core && \
    python uwsgiconfig.py --plugin plugins/http core && \
    python uwsgiconfig.py --plugin plugins/corerouter core && \
    python uwsgiconfig.py --plugin plugins/gevent core
RUN cd /opt/uwsgi && \
    mv uwsgi "${APP_DIR}" && \
    mv python_plugin.so "${APP_DIR}" && \
    mv http_plugin.so "${APP_DIR}" && \
    mv corerouter_plugin.so "${APP_DIR}" && \
    mv gevent_plugin.so "${APP_DIR}"

COPY setup/prerun.py ${APP_DIR}
COPY setup/start_ckan.sh ${APP_DIR}
COPY setup/install_extensions.sh ${APP_DIR}
COPY setup/setup_extensions.sh ${APP_DIR}
COPY setup/uwsgi.ini ${APP_DIR}

# wsgi.py file is from https://raw.githubusercontent.com/ckan/ckan/${GIT_BRANCH}/wsgi.py
COPY setup/wsgi.py ${APP_DIR}
RUN chmod 644 ${APP_DIR}/wsgi.py

COPY setup/catalog_log_config.py ${APP_DIR}
RUN chmod -R 644 ${APP_DIR}/catalog_log_config.py

# copy extensions
RUN mkdir -p ${EXT_DIR}
COPY ckanext/ckanext-digitraffic_theme "${EXT_DIR}/ckanext-digitraffic_theme"
COPY ckanext/ckanext-entraid_authenticator "${EXT_DIR}/ckanext-entraid_authenticator"
COPY ckanext/ckanext-digitraffic_fluent "${EXT_DIR}/ckanext-digitraffic_fluent"
COPY ckanext/ckanext-digitraffic_opentelemetry "${EXT_DIR}/ckanext-digitraffic_opentelemetry"
RUN chown -R ckan:ckan "${EXT_DIR}"

# install extensions
RUN ${APP_DIR}/install_extensions.sh

# extension settings
RUN ${APP_DIR}/setup_extensions.sh

# Create entrypoint directory for children image scripts
ONBUILD RUN mkdir /docker-entrypoint.d

# ECS Exec workaround for readonlyRootFilesystem
RUN mkdir -p /var/lib/amazon && \
    mkdir -p /var/log/amazon && \
    chmod 777 /var/lib/amazon && \
    chmod 777 /var/log/amazon \

# Create other volumes
RUN mkdir -p /srv/app/config && \
    chown -R ckan:ckan /srv/app/config

VOLUME ["$CKAN_STORAGE_PATH", "/srv/app/config", "/tmp", "/var/lib/amazon", "/var/log/amazon"]

EXPOSE 5000

HEALTHCHECK --interval=60s --timeout=5s --retries=5 CMD curl --fail http://localhost:5000/api/3/action/status_show || exit 1

CMD ["/srv/app/start_ckan.sh"]