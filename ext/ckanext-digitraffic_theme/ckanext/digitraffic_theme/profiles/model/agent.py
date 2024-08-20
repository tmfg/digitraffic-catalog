from typing import List

from rdflib import Literal, URIRef, FOAF
from ckanext.digitraffic_theme.profiles.model.class_instance import ClassInstance


class Agent(ClassInstance):
    name: Literal

    def __init__(self, iri: str, name: str):
        super().__init__(iri)
        self.name = Literal(name)

    def predicate_objects(self):
        return [
            (FOAF.name, self.name)
        ]
