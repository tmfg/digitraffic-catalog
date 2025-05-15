import os
import ckan.plugins as plugins
import ckan.plugins.toolkit as toolkit
from ckan.model.meta import engine
from ckan.config.declaration import Declaration, Key
from opentelemetry.sdk.resources import (
    SERVICE_NAME,
    SERVICE_NAMESPACE,
    Resource,
    get_aggregated_resources
)
from opentelemetry.sdk.extension.aws.resource.ecs import AwsEcsResourceDetector

from ckanext.digitraffic_opentelemetry.trace import configure as configure_traces, TraceConfig
from ckanext.digitraffic_opentelemetry.log import configure as configure_logs, LogConfig
from ckanext.digitraffic_opentelemetry.instrumentation import instrument_all

import logging
import sys

logger = logging.getLogger(__name__)
otel_logger = logging.getLogger("otel")


class DigitrafficOpentelemetryPlugin(plugins.SingletonPlugin):
    plugins.implements(plugins.IMiddleware)
    plugins.implements(plugins.IConfigDeclaration)

    def make_middleware(self, app, config):
        # TODO: Should also check OTEL_EXPORTER_OTLP_TRACES_ENDPOINT and OTEL_EXPORTER_OTLP_LOGS_ENDPOINT
        otel_endpoint = os.environ["OTEL_EXPORTER_OTLP_ENDPOINT"]
        otel_logger_name = toolkit.config.get("digitraffic_opentelemetry.otel_logger_name")
        loggers_to_set_events = toolkit.config.get("digitraffic_opentelemetry.loggers_to_set_events")
        if not otel_endpoint:
            raise ValueError("OTEL_EXPORTER_OTLP_ENDPOINT environment variable is not set.")

        trace_config: TraceConfig = {
            "baggage_keys": set(toolkit.config.get("digitraffic_opentelemetry.baggage_keys")),
            "traces_otel_endpoint": otel_endpoint
        }
        log_config: LogConfig = {
            "logs_otel_endpoint": otel_endpoint,
            "otel_logger_name": otel_logger_name,
            "loggers_to_set_events": loggers_to_set_events
        }

        resource = self._get_resource_attributes()

        configure_traces(resource, trace_config)
        configure_logs(resource, log_config)
        instrument_all(app, engine)

        sys.excepthook = handle_all_uncaught_exceptions

        return app

    def make_error_log_middleware(self, app, config):
        return app

    def _get_resource_attributes(self):
        """
        Add resource attributes. These attributes are used to identify the service and the platform on which it runs.
        """
        return get_aggregated_resources(
            [
                AwsEcsResourceDetector(),
            ],
            Resource(attributes={
                SERVICE_NAME: "CKAN",
                SERVICE_NAMESPACE: "Datacatalog",
            })
        )

    def declare_config_options(self, declaration: Declaration, key: Key):
        declaration.declare_list(key.digitraffic_opentelemetry.loggers_to_set_events, default=[])
        declaration.declare_list(key.digitraffic_opentelemetry.baggage_keys, default=[])
        declaration.declare(key.digitraffic_opentelemetry.otel_logger_name, default="root")
        declaration.declare_bool(key.digitraffic_opentelemetry.enter_pdb_on_error, default=False)
        declaration.declare_bool(key.digitraffic_opentelemetry.instrument_ckan_alpha, default=False)


def handle_all_uncaught_exceptions(type, value, traceback):
    """
    This function is called when an uncaught exception is raised.
    """
    logger.critical("Software crashed!", exc_info=(type, value, traceback))