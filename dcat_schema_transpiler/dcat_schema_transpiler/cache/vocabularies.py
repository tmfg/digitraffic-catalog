import hashlib
import glob
import base64
import pprint
import os
from typing import Literal

from rdflib import URIRef


def ns_to_encoded(name: str) -> str:
    ns_hashed = hashlib.md5(bytes(str(name), "utf-8"))
    return base64.b32encode(ns_hashed.digest()).decode("utf-8").replace("=", "")


def get_cached_file_path(name: str) -> str:
    cached_file_name = ns_to_encoded(name)
    file_abspath = os.path.abspath("./vocabularies/" + cached_file_name)
    files = glob.glob(file_abspath + ".*")
    if files:
        return files[0]


def is_local_file_created(name: str):
    cached_file_name = ns_to_encoded(name)
    file_abspath = os.path.abspath("./vocabularies/" + cached_file_name)

    if glob.glob(file_abspath + ".*"):
        return True
    return False


def create_cached_file(name: str, format: Literal["rdf", "ttl", "csv"]) -> str:
    if is_local_file_created(name):
        return get_cached_file_path(name)
    else:
        cached_file_name = ns_to_encoded(name)
        file_abspath = os.path.abspath(
            "./vocabularies/" + cached_file_name + "." + format
        )
        pprint.pprint(f"Creating file {file_abspath}")
        file_dirname = os.path.dirname(file_abspath)
        os.makedirs(file_dirname, exist_ok=True)
        with open(file_abspath, "w"):
            pass
        return file_abspath


def cache_content(
    content: str, name: URIRef, serialization_format: Literal["rdf", "ttl", "csv"]
):
    cached_file = create_cached_file(name, serialization_format)
    with open(cached_file, "w") as file:
        file.write(content)
