from rdflib import Namespace

from ckanext.digitraffic_core.model.schema_vocabulary import SchemaVocabularyType
from ckanext.digitraffic_core.model.schema_choice_vocabulary import SchemaChoiceVocabulary


class RightsType(SchemaChoiceVocabulary):
    namespace = Namespace(
        "https://w3id.org/mobilitydcat-ap/conditions-for-access-and-usage/"
    )
    schema_vocabulary_type = SchemaVocabularyType.RESOURCE
    field_name = "rights_type"

    def __init__(self, iri):
        super().__init__(iri)
