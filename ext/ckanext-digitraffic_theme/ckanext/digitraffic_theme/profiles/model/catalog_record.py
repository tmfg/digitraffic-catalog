from typing import Any

from rdflib import Literal, DCAT, DCTERMS, RDF, FOAF

from ckanext.digitraffic_theme.profiles.model.class_instance import ClassInstance
from ckanext.digitraffic_theme.profiles.model.distribution import Distribution
from ckanext.digitraffic_theme.profiles.model.language import Language
from ckanext.digitraffic_theme.profiles.model.vocabulary import Vocabulary


class CatalogRecord(ClassInstance):
    created: Literal
    language: Vocabulary
    primary_topic: Distribution
    modified: Literal

    def __init__(self, iri: str, dataset_dict: dict[str, Any], distribution: Distribution):
        super().__init__(iri, DCAT.CatalogRecord)
        self.created = Literal(dataset_dict["metadata_created"])
        self.language = Language(dataset_dict["metadata_language"])
        self.primary_topic = distribution
        self.modified = Literal(dataset_dict["metadata_modified"])

    def predicate_objects(self):
        return [
            (RDF.type, self.type),
            (DCTERMS.created, self.created),
            (DCTERMS.language, self.language),
            (FOAF.primaryTopic, self.primary_topic),
            (DCTERMS.modified, self.modified)
        ]