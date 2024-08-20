from __future__ import annotations

from abc import ABC, abstractmethod
from typing import List

from rdflib import URIRef, Literal


class ClassInstance(ABC):
    iri: URIRef

    def __init__(self, iri: str):
        self.iri = URIRef(iri)

    @abstractmethod
    def predicate_objects(self) -> List[(URIRef, Literal | URIRef)]:
        pass
