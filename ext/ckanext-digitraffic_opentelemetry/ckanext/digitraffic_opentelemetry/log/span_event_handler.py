import logging
from opentelemetry import trace

class SpanEventHandler(logging.Handler):
    """
    Handler to add the log message into current span as event
    """
    def emit(self, record: logging.LogRecord) -> None:
        span = trace.get_current_span()
        if record.exc_info:
            span.set_status(trace.status.Status(trace.status.StatusCode.ERROR))
            span.record_exception(record.exc_info[1])
        if span.is_recording():
            span.add_event(
                name=record.getMessage(),
                attributes={
                    "logger_name": record.name,
                    "level": record.levelname,
                },
            )
