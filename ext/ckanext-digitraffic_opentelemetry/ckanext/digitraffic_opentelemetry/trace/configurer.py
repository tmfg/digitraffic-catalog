from typing import TypedDict

from opentelemetry import trace
from opentelemetry import propagate
from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import (
    BatchSpanProcessor
)
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
from opentelemetry.baggage.propagation import W3CBaggagePropagator

from opentelemetry.sdk.extension.aws.trace import AwsXRayIdGenerator
from opentelemetry.propagators.aws import AwsXRayPropagator
from opentelemetry.propagators.composite import CompositePropagator
from .w3c_extractor_propagator import W3CExtractorPropagator

from opentelemetry.processor.baggage import BaggageSpanProcessor

class TraceConfig(TypedDict):
    """
    Configuration for OpenTelemetry tracing.
    """
    baggage_keys: set[str]
    traces_otel_endpoint: str


class Configurer:
    def __init__(self, resource: Resource, config: TraceConfig):
        self.resource = resource
        self.config = config

    def configure(self):
        """
        Configure the OpenTelemetry tracing
        """
        provider = TracerProvider(resource=self.resource, id_generator=AwsXRayIdGenerator())
        if len(self.config['baggage_keys']) > 0:
            self._add_baggage_to_span_attributes(provider, self.config['baggage_keys'])
        self._send_traces_to_collector(provider, self.config['traces_otel_endpoint'])

        # Sets the global default tracer provider
        trace.set_tracer_provider(provider)
        self._set_propagators()

    def _set_propagators(self):
        """
        Configure how context is handled. Propagators are used to extract and inject context into the headers of HTTP requests.
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

    def _add_baggage_to_span_attributes(self, provider: TracerProvider, baggage_keys_to_propagate: set[str]):
        is_baggage_key_propagated = lambda baggage_key: baggage_key in baggage_keys_to_propagate
        baggage_processor = BaggageSpanProcessor(is_baggage_key_propagated)
        provider.add_span_processor(baggage_processor)

    def _send_traces_to_collector(self, provider: TracerProvider, traces_otel_endpoint: str):
        """
        Configure the OpenTelemetry SDK to send traces to the OpenTelemetry Collector.
        """
        processor = BatchSpanProcessor(OTLPSpanExporter(endpoint=traces_otel_endpoint))
        provider.add_span_processor(processor)