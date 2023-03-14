FROM solr:8.11.2

USER root

RUN head -n -1 /opt/docker-solr/scripts/solr-precreate > /opt/docker-solr/scripts/solr-precreate-no-start && \
    chmod a+x /opt/docker-solr/scripts/solr-precreate-no-start

USER $SOLR_UID

WORKDIR $SOLR_HOME

COPY init.sh .

ENTRYPOINT [ "./init.sh" ]

CMD []