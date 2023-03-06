FROM rockylinux/rockylinux:9.1

RUN dnf install -y epel-release && \
    dnf update -y
RUN dnf install -y python3-devel postgresql libpq-devel git-core java-1.8.0-openjdk redis gcc gcc-c++ cmake automake  gmp-devel boost

RUN mkdir -p /usr/lib/ckan/default && \
    /usr/sbin/useradd -d /usr/lib/ckan -s /bin/bash ckan && \
    chown -R ckan:ckan /usr/lib/ckan

RUN mkdir -p /etc/ckan/default && \
    chown -R ckan:ckan /etc/ckan/

USER ckan

RUN python3 -m venv /usr/lib/ckan/default
RUN source /usr/lib/ckan/default/bin/activate && \
    pip install setuptools==44.1.0 && \
    pip install flask_debugtoolbar==0.10.1 && \
    pip install --upgrade pip && \
    pip install -e 'git+https://github.com/ckan/ckan.git@ckan-2.9.8#egg=ckan[requirements]' && \
    deactivate

RUN ln -s /usr/lib/ckan/default/src/ckan/who.ini /etc/ckan/default/who.ini

COPY ./init.sh opt/ckan_init.sh

CMD ["opt/ckan_init.sh"]
