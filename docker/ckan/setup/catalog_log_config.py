from logging import Formatter

class CustomFormatter(Formatter):
    """
    This formatter is exactly the same as the default logging formatter, but
    it adds default values for OpenTelemetry attributes to the log records if
    they are not already present.

    In newer versions of Python (>=3.12), the logging configuration file makes it
    poosible to set default values for attributes in the logging configuration (see https://docs.python.org/3/library/logging.config.html#configuration-file-format and
    https://docs.python.org/3/library/logging.config.html#logging-config-dictschema-formatters).
    So in the future, this class can be removed and the default values can be set
    in the logging configuration file.
    """
    _otelDefaults = {'otelSpanID': None, 'otelTraceID': None, 'otelServiceName': None, 'otelTraceSampled': None}
    def __init__(self, fmt=None, datefmt=None, style='%', validate=True, *,
                 defaults=None):
        super().__init__(fmt, datefmt, style, validate=validate,
                         defaults=CustomFormatter._otelDefaults | (defaults or {}))

