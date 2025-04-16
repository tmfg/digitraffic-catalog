import os
import ckan.plugins as plugins
import ckan.plugins.toolkit as toolkit
from ckan.model.meta import engine
from typing import Optional
from opentelemetry import trace, context, baggage
from opentelemetry import propagate
#from opentelemetry.context import Context
from opentelemetry.sdk.resources import (
    SERVICE_NAME,
    SERVICE_NAMESPACE,
    Resource,
    get_aggregated_resources
)
from opentelemetry.sdk.trace import TracerProvider, Span
from opentelemetry.sdk.trace.export import (
    BatchSpanProcessor,
    SpanProcessor
)
from opentelemetry.trace.propagation.tracecontext import TraceContextTextMapPropagator
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
from opentelemetry.instrumentation.logging import LoggingInstrumentor
from opentelemetry.propagators import textmap
from opentelemetry.baggage.propagation import W3CBaggagePropagator

from opentelemetry.sdk.extension.aws.trace import AwsXRayIdGenerator
from opentelemetry.sdk.extension.aws.resource.ecs import AwsEcsResourceDetector
from opentelemetry.propagators.aws import AwsXRayPropagator
from opentelemetry.propagators.composite import CompositePropagator

from opentelemetry.instrumentation.flask import FlaskInstrumentor
from opentelemetry.instrumentation.urllib3 import URLLib3Instrumentor
from opentelemetry.instrumentation.requests import RequestsInstrumentor
from opentelemetry.instrumentation.sqlalchemy import SQLAlchemyInstrumentor
from opentelemetry.instrumentation.redis import RedisInstrumentor
from opentelemetry.processor.baggage import BaggageSpanProcessor, ALLOW_ALL_BAGGAGE_KEYS


def _add_user_to_baggage(span: Span, flask_request_environ):
    """
    Add the user ID to the baggage. This is used to propagate the user ID across services.
    """
    user_id_attribute = "user.id"
    if span.is_recording():
        # Set the user ID as an attribute to the currently running span
        span.set_attribute(user_id_attribute, toolkit.g.get('user'))
    new_context = baggage.set_baggage(user_id_attribute, toolkit.g.get('user'))
    context.attach(new_context)

class DigitrafficOpentelemetryPlugin(plugins.SingletonPlugin):
    plugins.implements(plugins.IMiddleware)

    def make_middleware(self, app, config):
        self._configure_traces()
        self._propagate_trace_headers()
        self._add_trace_to_logging()
        self._add_flask_instrumentation(app)
        self._add_request_instrumentation()
        self._add_sqlalchemy_instrumentation()
        self._add_redis_instrumentation()
        return app

    def make_error_log_middleware(self, app, config):
        return app

    def _configure_traces(self):
        """
        Configure the OpenTelemetry SDK to send traces to the OpenTelemetry Collector.
        """
        resource = self._get_resource_attributes()

        provider = TracerProvider(resource=resource, id_generator=AwsXRayIdGenerator())
        self._add_baggage_to_span_attributes(provider)
        self._send_traces_to_collector(provider)

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
        Configure how context is handled. Propagatros are used to extract and inject context into the headers of HTTP requests.
        """
        # The AWS X-Ray propagator is called when trying to find the trace context in the incoming request. It is
        # also used to set the trace header. It assumes that the trace header is "X-Amzn-Trace-Id".
        aws_xray_propagator = AwsXRayPropagator()
        # The W3C Extractor is used to only extract the trace context from the incoming request. It assumes that the
        # trace header is "traceparent" and "tracestate".
        w3c_extractor = W3CExtractorPropagator()
        # BaggagePropagator is used to extract and inject baggage from and into the headers of HTTP requests. It assumes that
        # the baggage header is "baggage".
        baggage_propagator = W3CBaggagePropagator()
        propagate.set_global_textmap(CompositePropagator([aws_xray_propagator, w3c_extractor, baggage_propagator]))

    def _add_trace_to_logging(self):
        """
        Configure the logging to include the trace ID and span ID in the log messages.
        """
        LoggingInstrumentor().instrument(set_logging_format=True)

    def _add_flask_instrumentation(self, app):
        """
        Instruments the Flask requests. Also, is responsible for extracting the request context from the incoming request.
        It does so by using propagators. The propagators are given the whole Flask request environment to pick the
        correct headers from.
        """
        FlaskInstrumentor().instrument_app(app, enable_commenter=False, commenter_options={}, request_hook=_add_user_to_baggage)

    def _add_request_instrumentation(self):
        """
        Instrument the requests and urllib3 libraries to automatically create spans for HTTP requests. These are needed
        for the trace header to propagate to the downstream services.
        """
        URLLib3Instrumentor().instrument()
        RequestsInstrumentor().instrument()

    def _add_baggage_to_span_attributes(self, provider: TracerProvider):
        baggage_keys_to_propagate = {"w3c.trace_id","aws.cf.id","user.id"}
        is_baggage_key_propagated = lambda baggage_key: baggage_key in baggage_keys_to_propagate
        baggage_processor = BaggageSpanProcessor(is_baggage_key_propagated)
        provider.add_span_processor(baggage_processor)

    def _send_traces_to_collector(self, provider: TracerProvider):
        otel_endpoint = os.environ["OTEL_EXPORTER_OTLP_ENDPOINT"]
        if not otel_endpoint:
            raise ValueError("OTEL_EXPORTER_OTLP_ENDPOINT environment variable is not set.")
        processor = BatchSpanProcessor(OTLPSpanExporter(endpoint=otel_endpoint))
        provider.add_span_processor(processor)

    def _add_sqlalchemy_instrumentation(self):
        """
        Instrument the SQLAlchemy library to automatically create spans for SQL queries.
        """
        SQLAlchemyInstrumentor().instrument(engine=engine)

    def _add_redis_instrumentation(self):
        """
        Instrument the Redis library to automatically create spans for Redis queries.
        """
        RedisInstrumentor().instrument()


class W3CExtractorPropagator(TraceContextTextMapPropagator):
    """
    Only do the extraction part of the TraceContextTextMapPropagator.
    """
    def inject(
            self,
            carrier: textmap.CarrierT,
            context = None,
            setter: textmap.Setter[textmap.CarrierT] = textmap.default_setter,
    ) -> None:
        pass
