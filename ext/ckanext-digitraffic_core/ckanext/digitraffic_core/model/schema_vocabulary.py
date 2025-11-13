import logging
from abc import ABC, abstractmethod
from typing import List, ClassVar, Set
from rdflib import URIRef, Namespace
from ckanext.scheming.helpers import scheming_get_dataset_schema, scheming_field_by_name
from enum import Enum

_dataset_schema = None

logger = logging.getLogger(__name__)

def get_digitraffic_schema():
    global _dataset_schema
    if _dataset_schema is None:
        logger.info("Getting Digitraffic dataset schema")
        _dataset_schema = scheming_get_dataset_schema('dataset')
    return _dataset_schema

class SchemaVocabularyType(Enum):
    RESOURCE = 1
    DATASET = 2


class SchemaVocabulary(ABC):
    namespace: Namespace = None
    schema_vocabulary_type: SchemaVocabularyType = None
    field_name: str | list[str] = None

    def __init__(self, iri: str):
        if not self.__class__.is_known_iri(iri):
            raise ValueError(
                f"{iri} is not a valid iri of the class {self.__class__.__name__}"
            )
        if not isinstance(iri, str):
            raise ValueError(f"IRI should be a string. It was {type(iri)}")
        self.iri = URIRef(iri)

    @classmethod
    def _get_field(cls):
        type_fields = get_digitraffic_schema()['dataset_fields' if cls.schema_vocabulary_type == SchemaVocabularyType.DATASET else 'resource_fields']
        if isinstance(cls.field_name, str):
            field_names = [cls.field_name]
        else:
            field_names = cls.field_name

        top_field = scheming_field_by_name(type_fields, field_names[0])
        if len(field_names) == 1:
            return top_field

        def dig_field(rest_field_names: list[str], rest_schema):
            field_name = rest_field_names[0]
            field = scheming_field_by_name(rest_schema['repeating_subfields'], field_name)
            if len(rest_field_names) == 1:
                return field
            else:
                return dig_field(rest_field_names[1:], field)
        return dig_field(field_names[1:], top_field)

    @classmethod
    @abstractmethod
    def get_iris(cls) -> set[str]:
        """
        Returns a list of valid IRIs for this vocabulary.
        """
        pass

    @classmethod
    def create(cls, iri):
        return cls(iri)

    @classmethod
    def is_known_iri(cls, iri):
        return iri in cls.get_iris()

    @classmethod
    def field_labels(cls):
        field = cls._get_field()
        if field:
            return field['label']
        return None

    @classmethod
    def get_field_label(cls, lang: str):
        labels = cls.field_labels()
        if lang in labels:
            return labels[lang]
        return None

    @property
    @abstractmethod
    def labels(self):
        pass

    def get_label(self, lang:str):
        if lang in self.labels:
            return self.labels[lang]
        return None
