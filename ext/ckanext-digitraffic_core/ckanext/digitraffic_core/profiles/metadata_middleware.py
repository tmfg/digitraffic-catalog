from flask import Response, Request
from typing import Optional

from ckanext.digitraffic_core.path_middleware import dcat_metadata_middleware, DcatURLData

@dcat_metadata_middleware("after")
def add_encoding_middleware(response: Response, url_data: DcatURLData) -> Response:
    """Add a middleware to ensure UTF-8 encoding for all metadata responses."""
    content_type = response.headers.get('Content-Type', '')
    if 'charset=' not in content_type:
        response.headers['Content-Type'] = f'{content_type}; charset=utf-8' if content_type.strip() != '' else 'text/plain; charset=utf-8'
    return response

@dcat_metadata_middleware("before")
def add_url_validity_check_middleware(request: Request, url_data: DcatURLData) -> Optional[Response]:
    """Checks that the request URL is valid"""
    format = url_data['format']
    valid_formats = {'rdf', 'ttl', 'jsonld', 'n3', 'xml'}
    if format not in valid_formats:
        return Response('Invalid format', status=400)
    return None
