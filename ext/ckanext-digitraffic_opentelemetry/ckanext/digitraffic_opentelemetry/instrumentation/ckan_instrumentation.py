import ckan.logic.action.create
import ckan.logic.action.update
import ckan.logic.action.get
import ckan.logic.action.patch
import ckan.logic.action.delete
import ckan.logic.auth.create
import ckan.logic.auth.update
import ckan.logic.auth.get
import ckan.logic.auth.patch
import ckan.logic.auth.delete
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
        instrument_auth_logic()
        logger.info("CKAN instrumenting completed.")

def _object_to_basic_type(obj):
    """
    Convert an object to a basic type (str, int, float, bool, None).
    """
    if isinstance(obj, (str, int, float, bool)):
        return obj
    elif obj is None:
        return None
    elif isinstance(obj, list):
        return [_object_to_basic_type(item) for item in obj]
    elif isinstance(obj, dict):
        return {k: _object_to_basic_type(v) for k, v in obj.items()}
    elif hasattr(obj, '__dict__'):
        return _object_to_basic_type(obj.__dict__)
    else:
        return str(obj)

def _serialize_object(obj):
    """
    Serialize an object to JSON format, handling exceptions.
    """
    try:
        return json.dumps(_object_to_basic_type(obj))
    except Exception as e:
        logger.error(f"Error serializing object {obj}: {e}")
        return "Couldn't serialize object"

def instrument_function(func):
    """
    Decorator to instrument a function with OpenTelemetry tracing.
    """
    logger.info(f"Instrumenting function: {func.__name__}")
    if getattr(func, "_is_instrumented_dt", False):
        return func
    def wrapper(*args, **kwargs):
        is_auth_logic = hasattr(func, '__module__') and func.__module__.startswith('ckan.logic.auth')
        span_name = f"{func.__name__} " + ("AUTH" if is_auth_logic else "ACTION")
        # Start a new span for the function call
        with trace.get_tracer(__name__, '0.0.1').start_as_current_span(span_name) as span:
            span.set_attribute("input_data.args", _serialize_object(args))
            span.set_attribute("input_data.kwargs", _serialize_object(kwargs))
            result = func(*args, **kwargs)
            span.set_attribute("output_data.result", _serialize_object(result))
            return result
    wrapper._is_instrumented_dt = True
    wrapper.__name__ = func.__name__
    wrapper.__module__ = func.__module__
    if hasattr(func, '__doc__'):
        wrapper.__doc__ = func.__doc__
    return wrapper

def _instrument_given_module_functions(module, functions):
    """
    Instrument the given functions in the specified module.
    """
    for fn in functions:
        original_fn = getattr(module, fn)
        logger.info(f"Instrumenting function: {fn} in module {module.__name__} with original function {original_fn.__name__}")
        setattr(module, fn, instrument_function(original_fn))

def instrument_action_logic():
    """
    Monkey patch all CKAN action logic functions to add OpenTelemetry tracing.
    """
    logger.info("Instrumenting CKAN action logic functions with OpenTelemetry tracing...")

    # List of all CKAN action logic functions to instrument
    create_action_logic_functions = [fn for fn in dir(ckan.logic.action.create) if callable(getattr(ckan.logic.action.create, fn)) and fn.endswith("_create") and not fn.startswith("_")]
    update_action_logic_functions = [fn for fn in dir(ckan.logic.action.update) if callable(getattr(ckan.logic.action.update, fn)) and fn.endswith("_update") and not fn.startswith("_")]
    get_action_logic_functions = [fn for fn in dir(ckan.logic.action.get) if callable(getattr(ckan.logic.action.get, fn)) and (fn.endswith("_list") or fn.endswith("_show") or fn.endswith("_search")) and not fn.startswith("_")]
    patch_action_logic_functions = [fn for fn in dir(ckan.logic.action.patch) if callable(getattr(ckan.logic.action.patch, fn)) and fn.endswith("_patch") and not fn.startswith("_")]
    delete_action_logic_functions = [fn for fn in dir(ckan.logic.action.delete) if callable(getattr(ckan.logic.action.delete, fn)) and fn.endswith("_delete") and not fn.startswith("_")]

    # Instrument each action logic function
    _instrument_given_module_functions(ckan.logic.action.create, create_action_logic_functions)
    _instrument_given_module_functions(ckan.logic.action.update, update_action_logic_functions)
    _instrument_given_module_functions(ckan.logic.action.get, get_action_logic_functions)
    _instrument_given_module_functions(ckan.logic.action.patch, patch_action_logic_functions)
    _instrument_given_module_functions(ckan.logic.action.delete, delete_action_logic_functions)

def instrument_auth_logic():
    """
    Monkey patch all CKAN auth logic functions to add OpenTelemetry tracing.
    """
    logger.info("Instrumenting CKAN auth logic functions with OpenTelemetry tracing...")

    # List of all CKAN auth logic functions to instrument
    create_auth_logic_functions = [fn for fn in dir(ckan.logic.auth.create) if callable(getattr(ckan.logic.auth.create, fn)) and fn.endswith("_create") and not fn.startswith("_")]
    update_auth_logic_functions = [fn for fn in dir(ckan.logic.auth.update) if callable(getattr(ckan.logic.auth.update, fn)) and fn.endswith("_update") and not fn.startswith("_")]
    get_auth_logic_functions = [fn for fn in dir(ckan.logic.auth.get) if callable(getattr(ckan.logic.auth.get, fn)) and (fn.endswith("_list") or fn.endswith("_show") or fn.endswith("_search")) and not fn.startswith("_")]
    patch_auth_logic_functions = [fn for fn in dir(ckan.logic.auth.patch) if callable(getattr(ckan.logic.auth.patch, fn)) and fn.endswith("_patch") and not fn.startswith("_")]
    delete_auth_logic_functions = [fn for fn in dir(ckan.logic.auth.delete) if callable(getattr(ckan.logic.auth.delete, fn)) and fn.endswith("_delete") and not fn.startswith("_")]

    # Instrument each auth logic function
    _instrument_given_module_functions(ckan.logic.auth.create, create_auth_logic_functions)
    _instrument_given_module_functions(ckan.logic.auth.update, update_auth_logic_functions)
    _instrument_given_module_functions(ckan.logic.auth.get, get_auth_logic_functions)
    _instrument_given_module_functions(ckan.logic.auth.patch, patch_auth_logic_functions)
    _instrument_given_module_functions(ckan.logic.auth.delete, delete_auth_logic_functions)