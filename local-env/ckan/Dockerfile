FROM rockylinux/rockylinux:9.1

ENV DK_THEME_HOME=/usr/lib/ckan/default/src/ckan/contrib/cookiecutter/ckan_extension/ckanext-digitraffic_theme/ckanext-digitraffic_theme

# Asenna tarvittavat paketit
RUN dnf install -y epel-release && \
    dnf update -y
RUN dnf install -y python3-devel postgresql libpq-devel git-core java-1.8.0-openjdk redis gcc gcc-c++ cmake automake  gmp-devel boost

# Luo CKAN käyttäjä
RUN mkdir -p /usr/lib/ckan/default && \
    /usr/sbin/useradd -d /usr/lib/ckan -s /bin/bash ckan && \
    chown -R ckan:ckan /usr/lib/ckan

RUN mkdir -p /etc/ckan/default && \
    chown -R ckan:ckan /etc/ckan/

USER ckan

# Asenna CKAN
RUN python3 -m venv /usr/lib/ckan/default
RUN source /usr/lib/ckan/default/bin/activate && \
    pip install setuptools==44.1.0 && \
    pip install flask_debugtoolbar==0.10.1 && \
    pip install -e 'git+https://github.com/ckan/ckan.git@ckan-2.9.8#egg=ckan[requirements]' && \
    deactivate

# Kopioi ckanext-digitaraffic_theme oikeaan kansioon
COPY  ./tmp/ckanext-digitraffic_theme "$DK_THEME_HOME"

# Muuta oikeudet ckan käyttäjälle
USER root
RUN chown -R ckan:ckan "$DK_THEME_HOME"
USER ckan

# Digitraffic teema käyttöön
RUN source /usr/lib/ckan/default/bin/activate && \
    cd ~/default/src/ckan && \
    pip install -r dev-requirements.txt && \
    cd "$DK_THEME_HOME" && \
    python setup.py develop && \
    deactivate


RUN ln -s /usr/lib/ckan/default/src/ckan/who.ini /etc/ckan/default/who.ini

COPY ./init.sh opt/ckan_init.sh

CMD ["opt/ckan_init.sh"]
