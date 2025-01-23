from rdflib import Namespace

from ckanext.digitraffic_theme.model.vocabulary import Vocabulary

TRANSPORT_MODE = {
    "https://w3id.org/mobilitydcat-ap/transport-mode/air",
    "https://w3id.org/mobilitydcat-ap/transport-mode/bicycle",
    "https://w3id.org/mobilitydcat-ap/transport-mode/bike-hire",
    "https://w3id.org/mobilitydcat-ap/transport-mode/bike-sharing",
    "https://w3id.org/mobilitydcat-ap/transport-mode/bus",
    "https://w3id.org/mobilitydcat-ap/transport-mode/car",
    "https://w3id.org/mobilitydcat-ap/transport-mode/car-hire",
    "https://w3id.org/mobilitydcat-ap/transport-mode/car-pooling",
    "https://w3id.org/mobilitydcat-ap/transport-mode/car-sharing",
    "https://w3id.org/mobilitydcat-ap/transport-mode/e-scooter",
    "https://w3id.org/mobilitydcat-ap/transport-mode/long-distance-coach",
    "https://w3id.org/mobilitydcat-ap/transport-mode/long-distance-rail",
    "https://w3id.org/mobilitydcat-ap/transport-mode/maritime",
    "https://w3id.org/mobilitydcat-ap/transport-mode/metro-subway-train",
    "https://w3id.org/mobilitydcat-ap/transport-mode/motorcycle",
    "https://w3id.org/mobilitydcat-ap/transport-mode/other",
    "https://w3id.org/mobilitydcat-ap/transport-mode/pedestrian",
    "https://w3id.org/mobilitydcat-ap/transport-mode/regional-and-local-rail",
    "https://w3id.org/mobilitydcat-ap/transport-mode/ride-pooling",
    "https://w3id.org/mobilitydcat-ap/transport-mode/shuttle-bus",
    "https://w3id.org/mobilitydcat-ap/transport-mode/shuttle-ferry",
    "https://w3id.org/mobilitydcat-ap/transport-mode/taxi",
    "https://w3id.org/mobilitydcat-ap/transport-mode/tram-light-rail",
    "https://w3id.org/mobilitydcat-ap/transport-mode/truck",
}


class TransportMode(Vocabulary):
    iris = TRANSPORT_MODE
    namespace = Namespace("https://w3id.org/mobilitydcat-ap/transport-mode/")

    def __init__(self, iri):
        super().__init__(iri)
