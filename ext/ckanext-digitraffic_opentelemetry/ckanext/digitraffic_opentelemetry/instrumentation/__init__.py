from flask import Flask
from .contrib import (
    add_trace_to_logging,
    add_flask_instrumentation,
    add_request_instrumentation,
)
from .ckan_instrumentation import instrument as ckan_instrument


def instrument_all(app: Flask):
    add_trace_to_logging()
    add_flask_instrumentation(app)
    add_request_instrumentation()