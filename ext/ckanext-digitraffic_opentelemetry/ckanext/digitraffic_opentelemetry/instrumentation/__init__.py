from sqlalchemy.engine import Engine
from flask import Flask
from .contrib import (
    add_trace_to_logging,
    add_flask_instrumentation,
    add_request_instrumentation,
    add_sqlalchemy_instrumentation,
    add_redis_instrumentation,
)


def instrument_all(app: Flask, engine: Engine):
    add_trace_to_logging()
    add_flask_instrumentation(app)
    add_request_instrumentation()
    add_sqlalchemy_instrumentation(engine)
    add_redis_instrumentation()