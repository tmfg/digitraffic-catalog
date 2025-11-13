from rdflib import Namespace
from ckanext.digitraffic_core.model.schema_vocabulary import SchemaVocabularyType
from ckanext.digitraffic_core.model.schema_choice_vocabulary import SchemaChoiceVocabulary

class Country(SchemaChoiceVocabulary):
    namespace = Namespace("http://publications.europa.eu/resource/authority/country")
    schema_vocabulary_type = SchemaVocabularyType.DATASET
    field_name = ["contact_point", "country_name"]

    def __init__(self, iri):
        super().__init__(iri)
