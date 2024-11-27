from rdflib import Namespace
from ckanext.digitraffic_theme.model.vocabulary import Vocabulary

GEOREFERENCING_METHOD = {
    "https://w3id.org/mobilitydcat-ap/georeferencing-method/alert-c",
    "https://w3id.org/mobilitydcat-ap/georeferencing-method/gml",
    "https://w3id.org/mobilitydcat-ap/georeferencing-method/geocoordinates",
    "https://w3id.org/mobilitydcat-ap/georeferencing-method/iso-19148",
    "https://w3id.org/mobilitydcat-ap/georeferencing-method/openlr",
    "https://w3id.org/mobilitydcat-ap/georeferencing-method/other",
    "https://w3id.org/mobilitydcat-ap/georeferencing-method/tpeg-loc",
}


class GeoreferencingMethod(Vocabulary):
    iris = GEOREFERENCING_METHOD
    namespace = Namespace('https://w3id.org/mobilitydcat-ap/georeferencing-method/')

    def __init__(self, iri):
        super().__init__(iri)
