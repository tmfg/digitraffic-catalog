import ckan.logic.action.create
import ckan.logic.action.update
import ckan.logic.action.get
import ckan.logic.action.patch
import ckan.logic.action.delete
import ckan.plugins.toolkit as toolkit
import json
import logging

from opentelemetry import trace

logger = logging.getLogger(__name__)

def instrument():
    is_ckan_instrumentation_enabled = toolkit.config.get("digitraffic_opentelemetry.instrument_ckan_alpha")
    if is_ckan_instrumentation_enabled:
        logger.info("Instrumenting CKAN with OpenTelemetry tracing...")
        instrument_action_logic()
        logger.info("CKAN instrumenting completed.")

def instrument_function(func):
    """
    Decorator to instrument a function with OpenTelemetry tracing.
    """
    logger.info(f"Instrumenting function: {func.__name__}")
    if getattr(func, "_is_instrumented_dt", False):
        return func
    def wrapper(*args, **kwargs):
        logger.info(f"Wrapper function for {func.__name__} called!")
        # Start a new span for the function call
        with trace.get_tracer(__name__, '0.0.1').start_as_current_span(func.__name__) as span:
            try:
                input_args_data_serialized = json.dumps(args)
            except Exception:
                input_args_data_serialized = "Couldn't serialize input args data"
            try:
                input_kwargs_data_serialized = json.dumps(kwargs)
            except Exception:
                input_kwargs_data_serialized = "Couldn't serialize input kwargs data"
            span.add_event(
                name='input data',
                attributes={
                    "args": input_args_data_serialized,
                    "kwargs": input_kwargs_data_serialized,
                },
            )
            result = func(*args, **kwargs)
            span.add_event(
                name='output data',
                attributes={
                    "result": result,
                },
            )
            return result
    wrapper._is_instrumented_dt = True
    return wrapper

def instrument_action_logic():
    """
    Monkey patch all CKAN action logic functions to add OpenTelemetry tracing.
    """
    logger.info("Instrumenting CKAN action logic functions with OpenTelemetry tracing...")

    def instrument_given_module_functions(module, functions):
        """
        Instrument the given functions in the specified module.
        """
        for fn in functions:
            original_fn = getattr(module, fn)
            setattr(module, fn, instrument_function(original_fn))

    # List of all CKAN action logic functions to instrument
    create_action_logic_functions = [fn for fn in dir(ckan.logic.action.create) if callable(getattr(ckan.logic.action.create, fn)) and fn.endswith("_create") and not fn.startswith("_")]
    update_action_logic_functions = [fn for fn in dir(ckan.logic.action.update) if callable(getattr(ckan.logic.action.update, fn)) and fn.endswith("_update") and not fn.startswith("_")]
    get_action_logic_functions = [fn for fn in dir(ckan.logic.action.get) if callable(getattr(ckan.logic.action.get, fn)) and (fn.endswith("_list") or fn.endswith("_show") or fn.endswith("_search")) and not fn.startswith("_")]
    patch_action_logic_functions = [fn for fn in dir(ckan.logic.action.patch) if callable(getattr(ckan.logic.action.patch, fn)) and fn.endswith("_patch") and not fn.startswith("_")]
    delete_action_logic_functions = [fn for fn in dir(ckan.logic.action.delete) if callable(getattr(ckan.logic.action.delete, fn)) and fn.endswith("_delete") and not fn.startswith("_")]

    # Instrument each action logic function
    instrument_given_module_functions(ckan.logic.action.create, create_action_logic_functions)
    instrument_given_module_functions(ckan.logic.action.update, update_action_logic_functions)
    instrument_given_module_functions(ckan.logic.action.get, get_action_logic_functions)
    instrument_given_module_functions(ckan.logic.action.patch, patch_action_logic_functions)
    instrument_given_module_functions(ckan.logic.action.delete, delete_action_logic_functions)
