from rdflib import Namespace

from ckanext.digitraffic_theme.model.schema_vocabulary import SchemaVocabularyType
from ckanext.digitraffic_theme.model.schema_choice_vocabulary import SchemaChoiceVocabulary


class Location(SchemaChoiceVocabulary):
    namespace = Namespace("http://data.europa.eu/nuts/code/")
    schema_vocabulary_type = SchemaVocabularyType.DATASET
    field_name = "spatial"

    def __init__(self, iri):
        super().__init__(iri)
