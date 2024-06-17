import hashlib
import glob
import base64
import pprint
import os
from typing import Literal

from rdflib import URIRef


def ns_to_encoded(ns: str) -> str:
    ns_hashed = hashlib.md5(bytes(str(ns), 'utf-8'))
    return base64.b32encode(ns_hashed.digest()).decode("utf-8").replace('=', '')


def get_cached_file_path(ns: str) -> str:
    cached_file_name = ns_to_encoded(ns)
    file_abspath = os.path.abspath("./vocabularies/" + cached_file_name)
    files = glob.glob(file_abspath + '.*')
    if files:
        return files[0]

def is_local_file_created(ns: str):
    cached_file_name = ns_to_encoded(ns)
    file_abspath = os.path.abspath("./vocabularies/" + cached_file_name)

    if glob.glob(file_abspath + '.*'):
        return True
    return False

def create_cached_file(ns: str, format: Literal['rdf', 'ttl']) -> str:
    if is_local_file_created(ns):
        return get_cached_file_path(ns)
    else:
        cached_file_name = ns_to_encoded(ns)
        file_abspath = os.path.abspath("./vocabularies/" + cached_file_name + "." + format)
        pprint.pprint(f'Creating file {file_abspath}')
        file_dirname = os.path.dirname(file_abspath)
        if not os.path.isdir(file_dirname):
            os.makedirs(file_dirname)
        with open(file_abspath, 'w'):
            pass
        return file_abspath

def cache_vocabulary(cache_content: str, ns: URIRef, serialization_format: Literal['rdf', 'ttl']):
    cached_file = create_cached_file(ns, serialization_format)
    with open(cached_file, "w") as file:
        file.write(cache_content)

