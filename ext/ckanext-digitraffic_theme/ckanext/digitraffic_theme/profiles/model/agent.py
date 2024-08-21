from typing import List

from rdflib import Literal, URIRef, FOAF, RDF
from ckanext.digitraffic_theme.profiles.model.class_instance import ClassInstance


class Agent(ClassInstance):
    name: Literal

    def __init__(self, iri: str, name: str):
        super().__init__(iri)
        self.name = Literal(name)
        self.type = FOAF.Organization

    def predicate_objects(self):
        return [
            (RDF.type, self.type),
            (FOAF.name, self.name)
        ]
