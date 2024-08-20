from typing import List
from rdflib import URIRef


class Vocabulary:
    # List of valid IRIs
    iris: List[str] = []
    # IRI
    iri: URIRef

    def __init__(self, iri:str):
        if not self.is_known_iri(iri):
            raise ValueError(f'{iri} is not a valid iri of the class {self.__class__.__name__}')
        if not isinstance(iri, str):
            raise ValueError(f'IRI should be a string. It was {type(iri)}')
        self.iri = URIRef(iri)

    @classmethod
    def create(cls, iri):
        return cls(iri)

    def is_known_iri(self, iri):
        return iri in self.__class__.iris
