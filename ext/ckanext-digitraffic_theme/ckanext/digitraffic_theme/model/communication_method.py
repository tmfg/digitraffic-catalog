from rdflib import Namespace
from ckanext.digitraffic_theme.model.vocabulary import Vocabulary

COMMUNICATION_METHOD = {
    "https://w3id.org/mobilitydcat-ap/communication-method/pull",
    "https://w3id.org/mobilitydcat-ap/communication-method/push",
}


class CommunicationMethod(Vocabulary):
    iris = COMMUNICATION_METHOD
    namespace = Namespace("https://w3id.org/mobilitydcat-ap/communication-method")

    def __init__(self, iri):
        super().__init__(iri)
