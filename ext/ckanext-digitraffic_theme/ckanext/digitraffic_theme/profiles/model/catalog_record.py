from typing import TypedDict

from rdflib import Literal, DCAT, DCTERMS, RDF, FOAF

from ckanext.digitraffic_theme.profiles.model.class_instance import ClassInstance
from ckanext.digitraffic_theme.profiles.model.dataset import Dataset
from ckanext.digitraffic_theme.profiles.model.language import Language


class CatalogRecordInput(TypedDict):
    created: Literal
    language: Language
    primary_topic: Dataset
    modified: Literal


class CatalogRecord(ClassInstance):
    created: Literal
    language: Language
    primary_topic: Dataset
    modified: Literal

    def __init__(self, iri: str|None, input: CatalogRecordInput):
        super().__init__(iri, DCAT.CatalogRecord)
        self.created = input["created"]
        self.language = input["language"]
        self.primary_topic = input["primary_topic"]
        self.modified = input["modified"]

    def predicate_objects(self):
        return [
            (RDF.type, self.type),
            (DCTERMS.created, self.created),
            (DCTERMS.language, self.language),
            (FOAF.primaryTopic, self.primary_topic),
            (DCTERMS.modified, self.modified)
        ]
