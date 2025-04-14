import os
import ckan.plugins as plugins
import ckan.plugins.toolkit as toolkit
from opentelemetry import trace
from opentelemetry import propagate
from opentelemetry.sdk.resources import (
    SERVICE_NAME,
    SERVICE_NAMESPACE,
    Resource,
    get_aggregated_resources
)
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import (
    BatchSpanProcessor,
)
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
from opentelemetry.instrumentation.logging import LoggingInstrumentor
#from opentelemetry.instrumentation.wsgi import OpenTelemetryMiddleware

from opentelemetry.sdk.extension.aws.trace import AwsXRayIdGenerator
from opentelemetry.sdk.extension.aws.resource.ecs import AwsEcsResourceDetector
from opentelemetry.propagators.aws import AwsXRayPropagator

from opentelemetry.instrumentation.flask import FlaskInstrumentor


class DigitrafficOpentelemetryPlugin(plugins.SingletonPlugin):
    plugins.implements(plugins.IMiddleware)

    def make_middleware(self, app, config):
        self._configure_traces()
        self._propagate_trace_headers()
        self._add_trace_to_logging()
        self._add_WSGI_instrumentation(app)
        return app

    def make_error_log_middleware(self, app, config):
        return app

    def _configure_traces(self):
        """
        Configure the OpenTelemetry SDK to send traces to the OpenTelemetry Collector.
        """
        resource = self._get_resource_attributes()

        otel_endpoint = os.environ["OTEL_EXPORTER_OTLP_ENDPOINT"]

        if not otel_endpoint:
            raise ValueError("OTEL_EXPORTER_OTLP_ENDPOINT environment variable is not set.")

        provider = TracerProvider(resource=resource, id_generator=AwsXRayIdGenerator())
        processor = BatchSpanProcessor(OTLPSpanExporter(endpoint=otel_endpoint))
        provider.add_span_processor(processor)

        # Sets the global default tracer provider
        trace.set_tracer_provider(provider)

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

    def _propagate_trace_headers(self):
        """
        Configure the span context to propagate downstream when CKAN makes calls to other AWS services.
        """
        propagate.set_global_textmap(AwsXRayPropagator())

    def _add_trace_to_logging(self):
        """
        Configure the logging to include the trace ID and span ID in the log messages.
        """
        LoggingInstrumentor().instrument(set_logging_format=True)

    def _add_WSGI_instrumentation(self, app):
        #app.wsgi_app = OpenTelemetryMiddleware(app.wsgi_app)
        FlaskInstrumentor().instrument_app(app, enable_commenter=False, commenter_options={})
    
