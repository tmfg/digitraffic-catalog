from rdflib import Namespace, URIRef
from rdflib.namespace import DefinedNamespace

CNT_NS_URL = "http://www.w3.org/2011/content#"


# INCOMPLETE
class CNT(DefinedNamespace):
    _NS = Namespace(CNT_NS_URL)

    # Properties
    characterEncoding: URIRef
