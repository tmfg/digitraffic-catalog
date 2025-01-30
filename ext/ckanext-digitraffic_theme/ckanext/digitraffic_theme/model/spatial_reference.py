from rdflib import Namespace
from ckanext.digitraffic_theme.model.data.epsg import EPSG_IRI_START, EPSG_IRI_ENDINGS
from ckanext.digitraffic_theme.model.vocabulary import Vocabulary


class SpatialReferenceMetaClass(type):

    def __new__(cls, clsname, bases, attrs):
        attrs["iris"] = {EPSG_IRI_START + IRI_ENDING for IRI_ENDING in EPSG_IRI_ENDINGS}
        return super().__new__(cls, clsname, bases, attrs)


class SpatialReference(Vocabulary, metaclass=SpatialReferenceMetaClass):
    namespace = Namespace(EPSG_IRI_START)

    def __init__(self, iri):
        super().__init__(iri)
