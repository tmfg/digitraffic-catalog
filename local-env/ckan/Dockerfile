FROM rockylinux/rockylinux:9.3

ENV DK_THEME_HOME=/usr/lib/ckan/default/src/ckan/contrib/cookiecutter/ckan_extension/ckanext-digitraffic_theme/ckanext-digitraffic_theme
ENV ENTRAID_AUTHENTICATOR_PLUGIN_HOME=/usr/lib/ckan/default/src/ckan/contrib/cookiecutter/ckan_extension/ckanext-entraid_authenticator/ckanext-entraid_authenticator

# Install required packages
RUN dnf install -y epel-release && \
    dnf update -y
RUN dnf install -y python3-devel postgresql libpq-devel git-core java-1.8.0-openjdk redis gcc gcc-c++ cmake automake  gmp-devel boost

# Create CKAN user
RUN mkdir -p /usr/lib/ckan/default && \
    /usr/sbin/useradd -d /usr/lib/ckan -s /bin/bash ckan && \
    chown -R ckan:ckan /usr/lib/ckan

RUN mkdir -p /etc/ckan/default && \
    chown -R ckan:ckan /etc/ckan/

USER ckan

# Install CKAN
RUN python3 -m venv /usr/lib/ckan/default
RUN source /usr/lib/ckan/default/bin/activate && \
    pip install pip==20.2.4 && \
    pip install setuptools==61.0.0 && \
    pip install flask_debugtoolbar==0.10.1 && \
    pip install -e 'git+https://github.com/ckan/ckan.git@ckan-2.10.3#egg=ckan[requirements]' && \
    deactivate

# Copy extensions to the required location
COPY ./tmp/ckanext-digitraffic_theme "$DK_THEME_HOME"
COPY ./tmp/ckanext-entraid_authenticator "$ENTRAID_AUTHENTICATOR_PLUGIN_HOME"

# Give permissions to user ckan
USER root
RUN chown -R ckan:ckan "$DK_THEME_HOME"
RUN chown -R ckan:ckan "${ENTRAID_AUTHENTICATOR_PLUGIN_HOME}"
USER ckan

# Install extensions
RUN source /usr/lib/ckan/default/bin/activate && \
    cd ~/default/src/ckan && \
    pip install -r dev-requirements.txt && \
    cd "$DK_THEME_HOME" && \
    python setup.py develop && \
    cd "$ENTRAID_AUTHENTICATOR_PLUGIN_HOME" && \
    pip install -r requirements.txt && \
    python setup.py develop && \
    deactivate


RUN ln -s /usr/lib/ckan/default/src/ckan/who.ini /etc/ckan/default/who.ini

COPY ./init.sh opt/ckan_init.sh

CMD ["opt/ckan_init.sh"]
