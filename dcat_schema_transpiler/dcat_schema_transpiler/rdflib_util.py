from __future__ import annotations
from rdflib import Dataset, URIRef, Namespace


def get_namespace(ds: Dataset, iri: URIRef):
    return [Namespace(str(g.identifier)) for g in ds.graphs() if iri in Namespace(str(g.identifier))][0]
