from typing import List, ClassVar, Set
from rdflib import URIRef, Namespace


class Vocabulary:
    # List of valid IRIs
    iris: ClassVar[Set[str]] = set()
    namespace: Namespace = None
    # IRI
    iri: URIRef

    def __init__(self, iri:str):
        if not self.__class__.is_known_iri(iri):
            raise ValueError(f'{iri} is not a valid iri of the class {self.__class__.__name__}')
        if not isinstance(iri, str):
            raise ValueError(f'IRI should be a string. It was {type(iri)}')
        self.iri = URIRef(iri)

    @classmethod
    def create(cls, iri):
        return cls(iri)

    @classmethod
    def is_known_iri(cls, iri):
        return iri in cls.iris
