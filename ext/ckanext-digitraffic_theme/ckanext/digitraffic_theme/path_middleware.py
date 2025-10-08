from __future__ import annotations

from typing import Pattern, Callable, Any, Literal, TypedDict, NotRequired, Optional
from flask import Flask, request, Request, Response
import re
import logging
import ckanext.dcat.utils as dcat_utils
import ckan.plugins.toolkit as toolkit

logger = logging.getLogger(__name__)

class DcatURLData(TypedDict):
    dataset_id: NotRequired[str]
    format: str

def _maybe_apply(
        fn: Callable[[Request|Response, DcatURLData], Any],
        paths: list[tuple[Pattern[str], Callable[[Pattern[str], str], DcatURLData]]],
        obj: Any,
        default_return: Any):
    for pattern, pattern_data_fn in paths:
        match = re.match(pattern, request.path)
        if match:
            logger.info(f"Path matched: {request.path} with pattern {pattern}")
            pattern_data = pattern_data_fn(pattern, request.path)
            return fn(obj, pattern_data)
    return default_return

def middleware_before(paths: list[tuple[Pattern[str], Callable[[Pattern[str], str], DcatURLData]]]):
    def decorator(fn: Callable[[Request, DcatURLData], Optional[Response]]):
        def wrapper(app: Flask):
            def modify_request():
                return _maybe_apply(fn, paths, request, None)
            app.before_request(modify_request)
        return wrapper
    return decorator

def middleware_after(paths: list[tuple[Pattern[str], Callable[[Pattern[str], str], DcatURLData]]]):
    def decorator(fn: Callable[[Response, DcatURLData], Response]):
        def wrapper(app: Flask):
            def modify_response(response):
                return _maybe_apply(fn, paths, response, response)
            app.after_request(modify_response)
        return wrapper
    return decorator

def _get_dcat_url_data(pattern: Pattern[str], path: str) -> DcatURLData:
    match = re.match(pattern, path)
    if not match:
        raise ValueError(f"Path {path} does not match pattern {pattern}")
    group_dict = match.groupdict()
    return DcatURLData(dataset_id=group_dict.get("dataset"), format=group_dict.get("format"))


def dcat_metadata_middleware(point_of_execution: Literal["before", "after"] = "after"):
    def decorator(fn):
        format_pattern = "[a-zA-Z0-9]{1,10}"
        id_pattern = "[a-zA-Z0-9-]{1,100}"
        catalog_path = toolkit.config.get(
            "ckanext.dcat.catalog_endpoint", dcat_utils.DEFAULT_CATALOG_ENDPOINT
        ).replace(".{_format}", f"\.(?P<format>{format_pattern})")
        paths_to_modify = [
            (rf'{catalog_path}', _get_dcat_url_data),
            (rf'/dataset/(?P<dataset_id>{id_pattern})\.(?P<format>{format_pattern})', _get_dcat_url_data),
        ]
        if point_of_execution=="before":
            return middleware_before(paths_to_modify)(fn)
        else:
            return middleware_after(paths_to_modify)(fn)
    return decorator