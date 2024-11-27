from rdflib import Namespace
from ckanext.digitraffic_theme.model.vocabulary import Vocabulary

NETWORK_COVERAGE = {
    "https://w3id.org/mobilitydcat-ap/network-coverage/air-network",
    "https://w3id.org/mobilitydcat-ap/network-coverage/metro-subway-tram-or-light-rail-network",
    "https://w3id.org/mobilitydcat-ap/network-coverage/motorways",
    "https://w3id.org/mobilitydcat-ap/network-coverage/other",
    "https://w3id.org/mobilitydcat-ap/network-coverage/other-public-transport-network",
    "https://w3id.org/mobilitydcat-ap/network-coverage/rail-network",
    "https://w3id.org/mobilitydcat-ap/network-coverage/regional-roads",
    "https://w3id.org/mobilitydcat-ap/network-coverage/state-roads-or-federal-roads",
    "https://w3id.org/mobilitydcat-ap/network-coverage/ten-network",
    "https://w3id.org/mobilitydcat-ap/network-coverage/tern-network",
    "https://w3id.org/mobilitydcat-ap/network-coverage/urban-and-local-roads",
    "https://w3id.org/mobilitydcat-ap/network-coverage/waterways",
}


class NetworkCoverage(Vocabulary):
    iris = NETWORK_COVERAGE
    namespace = Namespace('https://w3id.org/mobilitydcat-ap/network-coverage/')

    def __init__(self, iri):
        super().__init__(iri)
