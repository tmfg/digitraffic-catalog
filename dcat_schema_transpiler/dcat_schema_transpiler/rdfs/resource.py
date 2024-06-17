from __future__ import annotations
from rdflib import Dataset, Namespace, URIRef
from abc import ABC, abstractmethod

from mobility_dcat_ap.dataset import mobility_dcat_namespaces
from mobility_dcat_ap.namespace import MOBILITYDCATAP


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

    @staticmethod
    def ns_from_iri(iri: URIRef):
        """
        TODO: Have a more sensible way to get the namespace than checking some random list.
              Should probably find a better place for this method anyway
        """
        known_namespaces = set(mobility_dcat_namespaces.values())
        known_namespaces.add(MOBILITYDCATAP)
        for known_namespace in known_namespaces:
            if isinstance(known_namespace, Namespace):
                ns = known_namespace
            else:
                ns = known_namespace._NS
            if iri in ns:
                return ns