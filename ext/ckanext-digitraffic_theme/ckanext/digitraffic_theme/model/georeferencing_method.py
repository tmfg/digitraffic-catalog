from rdflib import Namespace

from ckanext.digitraffic_theme.model.schema_vocabulary import SchemaVocabularyType
from ckanext.digitraffic_theme.model.schema_choice_vocabulary import SchemaChoiceVocabulary


class GeoreferencingMethod(SchemaChoiceVocabulary):
    namespace = Namespace("https://w3id.org/mobilitydcat-ap/georeferencing-method/")
    schema_vocabulary_type = SchemaVocabularyType.DATASET
    field_name = "georeferencing_method"

    def __init__(self, iri):
        super().__init__(iri)
