from rdflib import Namespace, URIRef
from rdflib.namespace import DefinedNamespace

VCARD_NS_URL = 'http://www.w3.org/2006/vcard/ns#'


# INCOMPLETE
class VCARD(DefinedNamespace):
    _NS = Namespace(VCARD_NS_URL)

    # Classes
    Kind: URIRef

    # Properties
    hasEmail: URIRef
    fn: URIRef
    hasURL: URIRef
    hasAddress: URIRef
    hasTelephone: URIRef
