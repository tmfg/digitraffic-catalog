from rdflib import Namespace

from ckanext.digitraffic_theme.model.schema_vocabulary import SchemaVocabularyType
from ckanext.digitraffic_theme.model.schema_choice_vocabulary import SchemaChoiceVocabulary


class Language(SchemaChoiceVocabulary):
    namespace = Namespace("http://publications.europa.eu/resource/authority/language/")
    schema_vocabulary_type = SchemaVocabularyType.DATASET
    field_name = "language"

    def __init__(self, iri):
        super().__init__(iri)
