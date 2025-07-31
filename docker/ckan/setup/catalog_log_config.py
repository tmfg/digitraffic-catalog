from logging import Formatter, LogRecord
import json
from typing import Callable, Any


class CustomFormatter(Formatter):
    """
    Add custom handling for exceptions and structured logging.
    """

    def formatException(self, exc_info):
        """
        Format exception information.

        This is used by the format method.

        Parameters
        ----------
        exc_info : tuple
            A tuple of (error_type, error, traceback) as returned by sys.exc_info().
        """
        result = super().formatException(exc_info)
        return repr(result)

    def format(self, record: LogRecord):
        """
        Structured logging formatter. This formatter formats the log record into a JSON string.
        """
        # Parent formatter does all kinds of things. It creates the asctime, calls
        # the formatException and saves the result into record.exc_text.
        super().format(record)

        def get_maybe_param(param: str, process_param: Callable[[Any], str] | None = None) -> str | None:
            """
            Get the parameter from the record. If it is not set, return None.
            """
            if hasattr(record, param):
                value = getattr(record, param)
                if process_param:
                    if value is not None:
                        return process_param(value)
                return value
            return None

        logged_data = {
            "asctime": get_maybe_param('asctime'),
            "name": record.name,
            "levelname": record.levelname,
            "message": record.message,
            "span_id": get_maybe_param('otelSpanID'),
            "trace_id": get_maybe_param('otelTraceID'),
            "otel_service_name": get_maybe_param('otelServiceName'),
            "otel_trace_sampled": get_maybe_param('otelTraceSampled'),
            "exc": get_maybe_param('exc_text'),
            "stack_info": get_maybe_param('stack_info', lambda stack_info: self.formatStack(stack_info)),
            "filename": record.filename,
            "lineno": record.lineno,
            "funcName": record.funcName,
            "alert": get_maybe_param('alert'),
        }

        return json.dumps(
            {
                k: v for k, v in logged_data.items() if v is not None
            }
        )


