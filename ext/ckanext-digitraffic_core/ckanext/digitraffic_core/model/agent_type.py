from rdflib import Namespace

from ckanext.digitraffic_core.model.schema_vocabulary import SchemaVocabularyType
from ckanext.digitraffic_core.model.schema_choice_vocabulary import SchemaChoiceVocabulary


class AgentType(SchemaChoiceVocabulary):
    namespace = Namespace("http://purl.org/adms/publishertype/")
    schema_vocabulary_type = SchemaVocabularyType.DATASET
    field_name = ["rights_holder", "type"]

    def __init__(self, iri):
        super().__init__(iri)
