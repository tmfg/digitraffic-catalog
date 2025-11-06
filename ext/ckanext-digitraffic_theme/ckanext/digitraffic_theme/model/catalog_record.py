from __future__ import annotations

from typing import TypedDict

from rdflib import Literal, DCAT, DCTERMS, RDF, FOAF

from ckanext.digitraffic_theme.model.class_instance import ClassInstance
from ckanext.digitraffic_theme.model.dataset import Dataset
from ckanext.digitraffic_theme.model.language import Language
from ckanext.digitraffic_theme.model.agent import Agent


class CatalogRecordInput(TypedDict):
    created: Literal
    primary_topic: Dataset
    modified: Literal


class CatalogRecord(ClassInstance):
    created: Literal
    languages: list[Language]
    primary_topic: Dataset
    modified: Literal
    publisher: Agent

    def __init__(self, iri: str | None, input: CatalogRecordInput):
        super().__init__(iri, DCAT.CatalogRecord)
        self.created = input["created"]
        self.languages = [
            Language(self._language_tag_to_iri(entry.language))
            for entry
            in input['primary_topic'].title

        ]
        self.primary_topic = input["primary_topic"]
        self.modified = input["modified"]

    def _language_tag_to_iri(self, tag: str) -> str:
        def rdf_lang_tag_to_iri_lang_tag(iri_lang_tag: str) -> str:
            default_tag = iri_lang_tag[0:2]
            exceptions = {
                'SWE': 'SV',
            }
            return exceptions.get(iri_lang_tag, default_tag).lower()
        mapping = {
            rdf_lang_tag_to_iri_lang_tag(iri.rsplit('/', 1)[1]): iri
            for iri
            in Language.get_iris()
        }
        return mapping.get(tag, str(Language.namespace.ENG))

    def predicate_objects(self):
        return [
            (RDF.type, self.type),
            (DCTERMS.created, self.created),
            # A catalog record may contain metadata in any or all of the supported languages
            *[(DCTERMS.language, language) for language in self.languages],
            (FOAF.primaryTopic, self.primary_topic),
            (DCTERMS.modified, self.modified),
            (DCTERMS.publisher, self.primary_topic.publisher),
        ]
