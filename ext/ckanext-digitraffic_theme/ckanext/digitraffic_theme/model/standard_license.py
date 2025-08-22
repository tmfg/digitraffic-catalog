from rdflib import Namespace

from ckanext.digitraffic_theme.model.schema_vocabulary import SchemaVocabularyType
from ckanext.digitraffic_theme.model.schema_choice_vocabulary import SchemaChoiceVocabulary


class StandardLicense(SchemaChoiceVocabulary):
    namespace = Namespace("http://publications.europa.eu/resource/authority/licence/")
    schema_vocabulary_type = SchemaVocabularyType.RESOURCE
    field_name = "license_id"

    def __init__(self, iri):
        super().__init__(iri)
