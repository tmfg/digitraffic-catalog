from __future__ import annotations

from rdflib import Literal, DCTERMS, RDF
from ckanext.digitraffic_theme.profiles.model.class_instance import ClassInstance


class RightsStatement(ClassInstance):
    rights_type: Literal

    def __init__(self, iri: str|None, rights_type: str):
        super().__init__(iri, DCTERMS.RightsStatement)
        self.rights_type = Literal(rights_type)

    def predicate_objects(self):
        return [
            (RDF.type, self.type),
            (DCTERMS.type, self.rights_type),
        ]
