from rdflib import Namespace
from ckanext.digitraffic_theme.model.schema_vocabulary import SchemaVocabularyType
from ckanext.digitraffic_theme.model.schema_choice_vocabulary import SchemaChoiceVocabulary


class DataGrammar(SchemaChoiceVocabulary):
    namespace = Namespace("https://w3id.org/mobilitydcat-ap/grammar/")
    schema_vocabulary_type = SchemaVocabularyType.RESOURCE
    field_name = "data_grammar"

    def __init__(self, iri):
        super().__init__(iri)
