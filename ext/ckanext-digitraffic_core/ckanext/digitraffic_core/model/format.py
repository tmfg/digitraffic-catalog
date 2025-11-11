from rdflib import Namespace

from ckanext.digitraffic_core.model.schema_vocabulary import SchemaVocabularyType
from ckanext.digitraffic_core.model.schema_choice_vocabulary import SchemaChoiceVocabulary


class Format(SchemaChoiceVocabulary):
    namespace = Namespace("http://publications.europa.eu/resource/authority/file-type/")
    schema_vocabulary_type = SchemaVocabularyType.RESOURCE
    field_name = "format"

    def __init__(self, iri):
        super().__init__(iri)


def is_valid_format_label(label: str):
    return label in [Format(format_iri).get_label('en') for format_iri in Format.get_iris()]
