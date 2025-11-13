from rdflib import Namespace

from ckanext.digitraffic_core.model.schema_vocabulary import SchemaVocabularyType
from ckanext.digitraffic_core.model.schema_choice_vocabulary import SchemaChoiceVocabulary


class TransportMode(SchemaChoiceVocabulary):
    namespace = Namespace("https://w3id.org/mobilitydcat-ap/transport-mode/")
    schema_vocabulary_type = SchemaVocabularyType.DATASET
    field_name = "transport_mode"

    def __init__(self, iri):
        super().__init__(iri)
