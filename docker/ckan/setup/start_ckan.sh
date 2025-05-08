#!/bin/sh

# Set up the Secret key used by Beaker and Flask
# This can be overriden using a CKAN___BEAKER__SESSION__SECRET env var
if grep -E "beaker.session.secret ?= ?$" "${CKAN_INI}"
then
    echo "Setting beaker.session.secret in ini file"
    ckan config-tool $CKAN_INI "beaker.session.secret=$(python3 -c 'import secrets; print(secrets.token_urlsafe())')"
    ckan config-tool $CKAN_INI "beaker.session.validate_key=$(python3 -c 'import secrets; print(secrets.token_urlsafe())')"
    ckan config-tool $CKAN_INI "WTF_CSRF_SECRET_KEY=$(python3 -c 'import secrets; print(secrets.token_urlsafe())')"
    JWT_SECRET=$(python3 -c 'import secrets; print("string:" + secrets.token_urlsafe())')
    ckan config-tool $CKAN_INI "api_token.jwt.encode.secret=${JWT_SECRET}"
    ckan config-tool $CKAN_INI "api_token.jwt.decode.secret=${JWT_SECRET}"
fi

# Change default locale
ckan config-tool $CKAN_INI "ckan.locale_default=fi"
ckan config-tool $CKAN_INI "ckan.locales_offered=fi en sv"

# Format logging
ckan config-tool "${CKAN_INI}" -s loggers "keys = root, ckan, ckanext, werkzeug, otel"

ckan config-tool "${CKAN_INI}" -s formatter_generic 'format = {"asctime": ${asctime}, "name": ${name}, "levelname": ${levelname}, "message": ${message}, "span_id": ${otelSpanID}, "trace_id": ${otelTraceID}, "otel_service_name": ${otelServiceName}, "otel_trace_sampled": ${otelTraceSampled}}'
ckan config-tool "${CKAN_INI}" -s formatter_generic "style = $"
ckan config-tool "${CKAN_INI}" -s formatter_generic "class = catalog_log_config.CustomFormatter"

ckan config-tool "${CKAN_INI}" -s handlers "keys = console"
ckan config-tool "${CKAN_INI}" -s handler_console "formatter = generic"

ckan config-tool "${CKAN_INI}" -s logger_root "handlers = console"
ckan config-tool "${CKAN_INI}" -s logger_ckan "handlers = console"
ckan config-tool "${CKAN_INI}" -s logger_ckanext "handlers = console"
ckan config-tool "${CKAN_INI}" -s logger_werkzeug "handlers = console"

ckan config-tool "${CKAN_INI}" -s logger_otel "propagate = 0"
ckan config-tool "${CKAN_INI}" -s logger_otel "level = INFO"
ckan config-tool "${CKAN_INI}" -s logger_otel "qualname = otel"
ckan config-tool "${CKAN_INI}" -s logger_otel "handlers = console"

# Run the prerun script to init CKAN
python3 prerun.py

# Run any startup scripts provided by images extending this one
if [[ -d "/docker-entrypoint.d" ]]
then
    for f in /docker-entrypoint.d/*; do
        case "$f" in
            *.sh)     echo "$0: Running init file $f"; . "$f" ;;
            *.py)     echo "$0: Running init file $f"; python3 "$f"; echo ;;
            *)        echo "$0: Ignoring $f (not an sh or py file)" ;;
        esac
        echo
    done
fi

# Set the common uwsgi options
UWSGI_OPTS="--plugins http,python \
            --socket /tmp/uwsgi.sock \
            --wsgi-file /srv/app/wsgi.py \
            --pythonpath /srv/app \
            --module wsgi:application \
            --uid 92 --gid 92 \
            --http 0.0.0.0:5000 \
            --master --enable-threads \
            --lazy-apps \
            --processes 2 \
            -b 32768 --vacuum \
            --harakiri $UWSGI_HARAKIRI"

if [ $? -eq 0 ]
then
    # Start supervisord
    supervisord --configuration /etc/supervisord.d/supervisord.conf &
    # Start uwsgi
    ./uwsgi $UWSGI_OPTS
else
  echo "[prerun] failed...not starting CKAN."
fi