from __future__ import annotations
from rdflib import Dataset, URIRef
from abc import ABC, abstractmethod


class Resource(ABC):
    @property
    @abstractmethod
    def type(self):
        pass

    @abstractmethod
    def value(self):
        """
        This method should return the referent of an IRI or literal value of a literal
        """
        pass

    @classmethod
    @abstractmethod
    def from_ds(cls, iri: URIRef, ds: Dataset) -> Resource:
        pass
