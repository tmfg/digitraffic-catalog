from __future__ import annotations

from rdflib import DCTERMS, RDF
from ckanext.digitraffic_theme.profiles.model.class_instance import ClassInstance
from ckanext.digitraffic_theme.profiles.model.rights_type import RightsType


class RightsStatement(ClassInstance):
    rights_type: RightsType

    def __init__(self, iri: str|None, rights_type: str):
        super().__init__(iri, DCTERMS.RightsStatement)
        self.rights_type = RightsType(rights_type)

    def predicate_objects(self):
        return [
            (RDF.type, self.type),
            (DCTERMS.type, self.rights_type),
        ]
