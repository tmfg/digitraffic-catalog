from typing import TypedDict
from opentelemetry.sdk.resources import Resource
from opentelemetry._logs import set_logger_provider
from opentelemetry.exporter.otlp.proto.grpc._log_exporter import (
    OTLPLogExporter,
)
from opentelemetry.sdk._logs import LoggerProvider, LoggingHandler
from opentelemetry.sdk._logs.export import BatchLogRecordProcessor
from .span_event_handler import SpanEventHandler
import logging

logger = logging.getLogger(__name__)

class LogConfig(TypedDict):
    """
    Configuration for OpenTelemetry logging.
    """
    logs_otel_endpoint: str
    otel_logger_name: str
    loggers_to_set_events: list[str]


class Configurer:
    def __init__(self, resource: Resource, config: LogConfig):
        self.resource = resource
        self.config = config

    def configure(self):
        """
        Configure the OpenTelemetry logging
        """
        self._setup_otel_logging(self.config["logs_otel_endpoint"], self.config["otel_logger_name"])
        self._setup_loggers_for_events(self.config["loggers_to_set_events"])

    def _setup_otel_logging(self, otel_endpoint: str, otel_logger_name: str):
        """
        Set up the logging so that anything logged with 'otel' logger is sent to the OpenTelemetry Collector.
        """
        logger_provider = LoggerProvider()
        set_logger_provider(logger_provider)
        exporter = OTLPLogExporter(endpoint=otel_endpoint, insecure=True)
        logger_provider.add_log_record_processor(BatchLogRecordProcessor(exporter))
        handler = LoggingHandler(level=logging.NOTSET, logger_provider=logger_provider)

        otel_logger = logging.getLogger(otel_logger_name)

        otel_logger.addHandler(handler)

    def _setup_loggers_for_events(self, loggers_to_set_events: list[str]):
        """
        Set up the loggers to add events to the current span.
        """
        for logger_name in loggers_to_set_events:
            logger.info(f"Adding SpanEventFilter to logger: {logger_name}")
            configured_logger = logging.getLogger(logger_name)
            event_handler = SpanEventHandler()
            configured_logger.addHandler(event_handler)
