from flask import Flask, request
import re
import ckanext.dcat.utils as dcat_utils
import ckan.plugins.toolkit as toolkit

def add_encoding_middleware(app: Flask) -> None:
    """Add a middleware to ensure UTF-8 encoding for all metadata responses."""
    format_pattern = "[a-zA-Z0-9]{1,10}"
    id_pattern = "[a-zA-Z0-9-]{1,100}"
    catalog_path = toolkit.config.get(
        "ckanext.dcat.catalog_endpoint", dcat_utils.DEFAULT_CATALOG_ENDPOINT
    ).replace("{_format}", format_pattern)
    paths_to_modify = [
        rf'{catalog_path}',
        rf'/dataset/{id_pattern}.{format_pattern}'
    ]
    print("##################")
    print("################## SETTING UP METADATA ENCODING MIDDLEWARE")
    print(paths_to_modify)
    def set_utf8_encoding(response):
        if any([re.match(pattern, request.path) for pattern in paths_to_modify]):
            print(f"Modifying response for path: {request.path}")
            content_type = response.headers.get('Content-Type', '')
            if 'charset=' not in content_type:
                response.headers['Content-Type'] = f'{content_type}; charset=utf-8'
        return response
    app.after_request(set_utf8_encoding)