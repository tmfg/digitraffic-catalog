from rdflib import Namespace

from ckanext.digitraffic_core.model.schema_vocabulary import SchemaVocabularyType
from ckanext.digitraffic_core.model.schema_choice_vocabulary import SchemaChoiceVocabulary


class NetworkCoverage(SchemaChoiceVocabulary):
    namespace = Namespace("https://w3id.org/mobilitydcat-ap/network-coverage/")
    schema_vocabulary_type = SchemaVocabularyType.DATASET
    field_name = "network_coverage"

    def __init__(self, iri):
        super().__init__(iri)
