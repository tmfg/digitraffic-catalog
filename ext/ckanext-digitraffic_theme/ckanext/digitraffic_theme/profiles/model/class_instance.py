from __future__ import annotations

from abc import ABC, abstractmethod
from typing import List, Any

from rdflib import URIRef, RDF


class ClassInstance(ABC):
    iri: URIRef
    type: RDF.type

    def __init__(self, iri: str, type: RDF.type):
        self.iri = URIRef(iri)
        self.type = type

    @abstractmethod
    def predicate_objects(self) -> List[(URIRef, Any)]:
        pass
