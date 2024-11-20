from rdflib import Namespace, URIRef
from rdflib.namespace import DefinedNamespace

DQV_NS_URL = 'http://www.w3.org/ns/dqv#'


# INCOMPLETE
class DQV(DefinedNamespace):
    _NS = Namespace(DQV_NS_URL)

    # Classes

    # Properties
    hasQualityAnnotation: URIRef
