from rdflib import Literal, URIRef, Dataset
from rdflib.namespace import XSD

from dcat_schema_transpiler.rdfs.resource import Resource


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

    @classmethod
    def from_uri(cls, value, uri: URIRef):
        if not RDFSLiteral.is_literal_type(uri):
            raise ValueError(f'URI must be a valid literal type. {uri} was given')
        cls(Literal(value, datatype=str(uri)))

    @staticmethod
    def is_literal_type(uri: URIRef):
        return uri.startswith(str(XSD)) or str(uri) == 'http://www.w3.org/1999/02/22-rdf-syntax-ns#langString'

    def is_language_string(self) -> bool:
        return self.literal.language is not None

    def language(self) -> str:
        return self.literal.language