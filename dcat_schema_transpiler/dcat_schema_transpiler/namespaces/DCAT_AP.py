from rdflib import Namespace, URIRef
from rdflib.namespace import DefinedNamespace

DCAT_AP_NS_URL = 'http://data.europa.eu/r5r/'


# INCOMPLETE
class DCATAP(DefinedNamespace):
    _NS = Namespace(DCAT_AP_NS_URL)

    # Classes

    # Properties
    applicableLegislation: URIRef
