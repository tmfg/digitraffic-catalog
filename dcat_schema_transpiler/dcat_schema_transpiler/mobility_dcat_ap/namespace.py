from rdflib import Namespace, URIRef
from rdflib.namespace import DefinedNamespace

MOBILITYDCATAP_NS_URL = 'http://w3id.org/mobilitydcat-ap#'

class MOBILITYDCATAP(DefinedNamespace):
    _NS = Namespace(MOBILITYDCATAP_NS_URL)

    # Classes
    MobilityDataStandard: URIRef
    Assessment: URIRef

    # Properties
    mobilityTheme: URIRef
    georeferencingMethod: URIRef
    networkCoverage: URIRef
    transportMode: URIRef
    assessmentResult: URIRef
    intendedInformationService: URIRef
    mobilityDataStandard: URIRef
    applicationLayerProtocol: URIRef
    communicationMethod: URIRef
    grammar: URIRef
    schema: URIRef
    dataFormatNotes: URIRef