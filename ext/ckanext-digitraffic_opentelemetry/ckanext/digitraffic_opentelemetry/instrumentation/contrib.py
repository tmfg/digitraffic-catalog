"""
This module contains functions to instrument various libraries and frameworks with [OpenTelemetry Python Contrib](https://opentelemetry-python-contrib.readthedocs.io/en/latest/).
"""
import ckan.plugins.toolkit as toolkit
from ckanext.datastore.backend.postgres import (
    get_read_engine,
    get_write_engine
)
from sqlalchemy.engine import Engine
from flask import Flask, request

from opentelemetry import trace, context, baggage
from opentelemetry.sdk.trace import Span
from opentelemetry.context.context import Context

from opentelemetry.instrumentation.logging import LoggingInstrumentor
from opentelemetry.instrumentation.flask import FlaskInstrumentor
from opentelemetry.instrumentation.urllib3 import URLLib3Instrumentor
from opentelemetry.instrumentation.requests import RequestsInstrumentor
from opentelemetry.instrumentation.sqlalchemy import SQLAlchemyInstrumentor
from opentelemetry.instrumentation.redis import RedisInstrumentor
from opentelemetry.instrumentation.psycopg2 import Psycopg2Instrumentor


def _add_user_to_baggage(span: Span, context: Context) -> Context:
    """
    Add the user ID to the baggage. This is used to propagate the user ID across services.
    """
    user_id_attribute = "user.id"
    user_id = toolkit.g.get('user')
    if span.is_recording():
        # Set the user ID as an attribute to the currently running span
        span.set_attribute(user_id_attribute, user_id)
    return baggage.set_baggage(user_id_attribute, user_id, context)

def _set_logging_context(span: Span, flask_request_environ):
    context_span = trace.set_span_in_context(span)
    new_context = _add_user_to_baggage(span, context_span)
    context.attach(new_context)


def add_trace_to_logging():
    """
    Configure the logging to include the trace ID and span ID in the log messages.
    """
    LoggingInstrumentor().instrument(set_logging_format=True)

def add_flask_instrumentation(app: Flask):
    """
    Instruments the Flask requests. Also, is responsible for extracting the request context from the incoming request.
    It does so by using propagators. The propagators are given the whole Flask request environment to pick the
    correct headers from.
    """
    FlaskInstrumentor().instrument_app(app, enable_commenter=False, commenter_options={}, request_hook=_set_logging_context)

def add_request_instrumentation():
    """
    Instrument the requests and urllib3 libraries to automatically create spans for HTTP requests. These are needed
    for the trace header to propagate to the downstream services.
    """
    URLLib3Instrumentor().instrument()
    RequestsInstrumentor().instrument()

def add_psycopg2_instrumentation():
    Psycopg2Instrumentor().instrument()

def add_sqlalchemy_instrumentation():
    """
    Instrument the SQLAlchemy library to automatically create spans for SQL queries.
    """
    engines = [get_read_engine(), get_write_engine()]
    SQLAlchemyInstrumentor().instrument(engines=engines)

def add_redis_instrumentation():
    """
    Instrument the Redis library to automatically create spans for Redis queries.
    """
    RedisInstrumentor().instrument()