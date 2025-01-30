from rdflib.namespace import DefinedNamespace, Namespace

OA_NS_URL = Namespace("https://www.w3.org/ns/oa#")


class OA(DefinedNamespace):
    _NS = Namespace(OA_NS_URL)
