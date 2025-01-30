from rdflib import Namespace, URIRef
from rdflib.namespace import DefinedNamespace

LOCN_NS_URL = "http://www.w3.org/ns/locn#"


# INCOMPLETE
class LOCN(DefinedNamespace):
    _NS = Namespace(LOCN_NS_URL)

    # Classes
    Address: URIRef

    # Properties
    address: URIRef
    adminUnitL1: URIRef
    adminUnitL2: URIRef
    postName: URIRef
    postCode: URIRef
    thoroughfare: URIRef

    fullAddress: URIRef
    poBox: URIRef
    addressArea: URIRef
    addressId: URIRef
