import httpx
from rdflib import URIRef

def get_graph_url(ns: URIRef, mime_types: str = 'application/rdf+xml, text/turtle') -> (str, str):
    headers = {'Accept': mime_types}
    r = httpx.get(str(ns), headers=headers, follow_redirects=True)
    # Some servers do not write content-type with capital letters
    content_type = r.headers['Content-Type'] or r.headers['content-type']
    return str(r.url), content_type

def get_serialized_rdf(graph_url: str, serialization_format):
    r = httpx.get(graph_url,
                  headers={'Accept': 'text/turtle' if serialization_format == 'ttl' else 'application/rdf+xml'})
    return r.text