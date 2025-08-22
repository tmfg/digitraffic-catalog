from rdflib import Namespace
from ckanext.digitraffic_theme.model.data.epsg import EPSG_IRI_START, EPSG_IRI_ENDINGS
from ckanext.digitraffic_theme.model.schema_vocabulary import SchemaVocabularyType
from ckanext.digitraffic_theme.model.schema_choice_vocabulary import SchemaVocabulary


class SpatialReference(SchemaVocabulary):
    namespace = Namespace(EPSG_IRI_START)
    schema_vocabulary_type = SchemaVocabularyType.DATASET
    field_name = "conforms_to"

    def __init__(self, iri):
        super().__init__(iri)

    @property
    def labels(self):
        return "EPSG:" + str(self.iri).replace(EPSG_IRI_START, "")

    @classmethod
    def get_iris(cls):
        return {EPSG_IRI_START + IRI_ENDING for IRI_ENDING in EPSG_IRI_ENDINGS}
