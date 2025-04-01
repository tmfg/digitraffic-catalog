from rdflib import Namespace

from ckanext.digitraffic_theme.model.vocabulary import Vocabulary

DATA_GRAMMAR = {
    "https://w3id.org/mobilitydcat-ap/grammar",
    "https://w3id.org/mobilitydcat-ap/grammar/asn.1",
    "https://w3id.org/mobilitydcat-ap/grammar/json-schema",
    "https://w3id.org/mobilitydcat-ap/grammar/other",
    "https://w3id.org/mobilitydcat-ap/grammar/protocol-buffers",
    "https://w3id.org/mobilitydcat-ap/grammar/xsd",
}


class DataGrammar(Vocabulary):
    iris = DATA_GRAMMAR
    namespace = Namespace("https://w3id.org/mobilitydcat-ap/grammar/")

    def __init__(self, iri):
        super().__init__(iri)
