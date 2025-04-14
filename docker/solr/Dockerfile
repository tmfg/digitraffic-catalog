FROM solr:8

# switch from solr to root user
USER root

# upgrade system
RUN apt-get update -yq && apt-get upgrade -yq

# setup env vars
ENV SOLR_CORE ckan
ENV SOLR_CORE_PATH /var/solr/data

# create folders
RUN mkdir -p $SOLR_CORE_PATH/$SOLR_CORE/conf
RUN mkdir -p $SOLR_CORE_PATH/$SOLR_CORE/data

# add config files
COPY solrconfig.xml $SOLR_CORE_PATH/$SOLR_CORE/conf/
COPY schema.xml $SOLR_CORE_PATH/$SOLR_CORE/conf/
RUN cp /opt/solr/server/solr/configsets/sample_techproducts_configs/conf/currency.xml \
       /opt/solr/server/solr/configsets/_default/conf/synonyms.txt \
       /opt/solr/server/solr/configsets/_default/conf/stopwords.txt \
       /opt/solr/server/solr/configsets/_default/conf/protwords.txt \
       /opt/solr/server/solr/configsets/sample_techproducts_configs/conf/elevate.xml \
       $SOLR_CORE_PATH/$SOLR_CORE/conf/

# Add AWS Distro for OpenTelemetry agent

ADD https://github.com/aws-observability/aws-otel-java-instrumentation/releases/download/v2.10.0/aws-opentelemetry-agent.jar /opt/aws-opentelemetry-agent.jar
RUN chown "$SOLR_USER:$SOLR_USER" /opt/aws-opentelemetry-agent.jar && \
    chmod 740 /opt/aws-opentelemetry-agent.jar
ENV SOLR_OPTS -javaagent:/opt/aws-opentelemetry-agent.jar \
  -Dotel.resource.attributes=service.name=Solr,service.namespace=Datacatalog \
  -Dotel.metrics.exporter=otlp \
  -Dotel.traces.exporter=otlp \
  -Dotel.logs.exporter=otlp \
  -Dotel.exporter.otlp.endpoint=http://otel-collector:4318 \
  -Dotel.instrumentation.common.default-enabled=false \
  -Dotel.instrumentation.log4j-context-data.enabled=true \
  -Dotel.instrumentation.aws-log4j.enabled=true
  #-Dotel.instrumentation.jetty.enabled=true \
  #-Dotel.instrumentation.jetty-httpclient.enabled=true

# create core.properties
RUN echo name=$SOLR_CORE > $SOLR_CORE_PATH/$SOLR_CORE/core.properties

# setup permissions
RUN chown -R "$SOLR_USER:$SOLR_USER" $SOLR_CORE_PATH/$SOLR_CORE

# switch from root to solr user
USER $SOLR_USER:$SOLR_USER