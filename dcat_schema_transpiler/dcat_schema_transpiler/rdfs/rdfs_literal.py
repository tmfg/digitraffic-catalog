from rdflib import Literal, URIRef, Dataset

from rdfs.resource import Resource


class RDFSLiteral(Resource):
    def __init__(self, literal: Literal):
        self.literal = literal

    def value(self):
        return self.literal.value

    @property
    def type(self):
        return self.literal.datatype

    @classmethod
    def from_ds(cls, iri: URIRef, ds: Dataset) -> Resource:
        pass

    def is_language_string(self) -> bool:
        return self.literal.language is not None

    def language(self) -> str:
        return self.literal.language