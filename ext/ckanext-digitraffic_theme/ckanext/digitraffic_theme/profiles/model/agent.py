from rdflib import Literal, URIRef, FOAF, RDF
from ckanext.digitraffic_theme.profiles.model.class_instance import ClassInstance


class Agent(ClassInstance):
    name: Literal
    type: URIRef

    def __init__(self, iri: str | None, name: str):
        print("Agent 1")
        super().__init__(iri, FOAF.Organization)
        print("Agent 2")
        self.name = Literal(name)
        print("Agent 3")

    def predicate_objects(self):
        return [
            (RDF.type, self.type),
            (FOAF.name, self.name)
        ]
