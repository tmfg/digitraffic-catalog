from __future__ import annotations

from abc import ABC, abstractmethod
from typing import List, Any, Callable, Set, Iterable

from rdflib import URIRef, RDF, BNode

from inspect import getmro

from ckanext.dcat.profiles import CleanedURIRef


class ClassInstance(ABC):
    iri: URIRef|BNode
    type: RDF.type

    mandatory_properties = {RDF.type,}

    def __init__(self, iri: str | None, type: RDF.type):
        self.iri = CleanedURIRef(iri) if iri is not None else BNode()
        self.type = type

    @abstractmethod
    def predicate_objects(self) -> List[(URIRef, Any)]:
        pass

    def filter_used_properties(self, pos: List[(URIRef, Any)]) -> List[(URIRef, Any)]:
        def mandatory_prop_reducer(properties: Set[URIRef], clz: type) -> Set[URIRef]:
           if 'mandatory_properties' in clz.__dict__:
               return properties | clz.__dict__.get('mandatory_properties')
           else:
               return properties

        def reducer(reducer_fn: Callable, iterable: Iterable, initial_value: Any):
            reduced_value = initial_value
            for v in iterable:
                reducer_fn(reduced_value, v)
            return reduced_value

        parent_classes = getmro(self.__class__)

        mandatory_ps = reducer(mandatory_prop_reducer, parent_classes, set())

        return list(filter(lambda po: po[0] in mandatory_ps or po[1] is not None, pos))

    def __repr__(self):
        return (self.__class__.__name__ + "{"
                + ", ".join([f'{k}: {v}' for k, v in self.__dict__.items()]) +
                "}")

    def __str__(self):
        return self.__repr__()
