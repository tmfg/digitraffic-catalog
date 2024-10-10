from rdflib import Namespace, URIRef
from rdflib.namespace import DefinedNamespace

ADMS_NS_URL = 'http://www.w3.org/ns/adms#'


# INCOMPLETE
class ADMS(DefinedNamespace):
    _NS = Namespace(ADMS_NS_URL)

    # Classes
    Identifier: URIRef

    # Properties
    versionNotes: URIRef
    sample: URIRef
    identifier: URIRef
