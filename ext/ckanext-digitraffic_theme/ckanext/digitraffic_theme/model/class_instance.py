from __future__ import annotations

from abc import ABC, abstractmethod
from typing import List, Any

from rdflib import URIRef, RDF, BNode

from ckanext.dcat.profiles import CleanedURIRef


class ClassInstance(ABC):
    iri: URIRef|BNode
    type: RDF.type

    def __init__(self, iri: str | None, type: RDF.type):
        self.iri = CleanedURIRef(iri) if iri is not None else BNode()
        self.type = type

    @abstractmethod
    def predicate_objects(self) -> List[(URIRef, Any)]:
        pass
