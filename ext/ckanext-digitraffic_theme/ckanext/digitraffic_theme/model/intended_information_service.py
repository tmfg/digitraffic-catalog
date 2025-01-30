from rdflib import Namespace
from ckanext.digitraffic_theme.model.vocabulary import Vocabulary

INTENDED_INFORMATION_SERVICE = {
    "https://w3id.org/mobilitydcat-ap/intended-information-service/dynamic-availability-check",
    "https://w3id.org/mobilitydcat-ap/intended-information-service/dynamic-information-service",
    "https://w3id.org/mobilitydcat-ap/intended-information-service/dynamic-passing-times-trip-plans-and-auxiliary-information",
    "https://w3id.org/mobilitydcat-ap/intended-information-service/information-service",
    "https://w3id.org/mobilitydcat-ap/intended-information-service",
    "https://w3id.org/mobilitydcat-ap/intended-information-service/location-search",
    "https://w3id.org/mobilitydcat-ap/intended-information-service/other",
    "https://w3id.org/mobilitydcat-ap/intended-information-service/trip-plan-computation-scheduled-modes-transport",
    "https://w3id.org/mobilitydcat-ap/intended-information-service/trip-plans",
    "https://w3id.org/mobilitydcat-ap/intended-information-service/trip-plans-auxiliary-information-availability-check",
}


class IntendedInformationService(Vocabulary):
    iris = INTENDED_INFORMATION_SERVICE
    namespace = Namespace(
        "https://w3id.org/mobilitydcat-ap/intended-information-service"
    )

    def __init__(self, iri):
        super().__init__(iri)
