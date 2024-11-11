from __future__ import annotations
from rdflib import Literal, URIRef, FOAF, RDF
from ckanext.digitraffic_theme.model.class_instance import ClassInstance


class Agent(ClassInstance):
    name: Literal
    type: URIRef

    def __init__(self, iri: str | None, name: str):
        super().__init__(iri, FOAF.Organization)
        self.name = Literal(name)

    def predicate_objects(self):
        return [
            (RDF.type, self.type),
            (FOAF.name, self.name)
        ]
