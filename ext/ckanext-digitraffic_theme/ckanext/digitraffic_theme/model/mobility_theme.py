from ckanext.digitraffic_theme.model.vocabulary import Vocabulary

MOBILITY_THEME = [
    "https://w3id.org/mobilitydcat-ap/mobility-theme/air-and-space-travel",
    "https://w3id.org/mobilitydcat-ap/mobility-theme/cycle-network-data",
    "https://w3id.org/mobilitydcat-ap/mobility-theme/dynamic-traffic-signs-and-regulations",
    "https://w3id.org/mobilitydcat-ap/mobility-theme/filling-and-charging-stations",
    "https://w3id.org/mobilitydcat-ap/mobility-theme/freight-and-logistics",
    "https://w3id.org/mobilitydcat-ap/mobility-theme/general-information-for-trip-planning-",
    "https://w3id.org/mobilitydcat-ap/mobility-theme/other",
    "https://w3id.org/mobilitydcat-ap/mobility-theme/parking-service-and-rest-area-information",
    "https://w3id.org/mobilitydcat-ap/mobility-theme/pedestrian-network-data",
    "https://w3id.org/mobilitydcat-ap/mobility-theme/public-transport-non-scheduled-transport",
    "https://w3id.org/mobilitydcat-ap/mobility-theme/public-transport-scheduled-transport",
    "https://w3id.org/mobilitydcat-ap/mobility-theme/real-time-traffic-data",
    "https://w3id.org/mobilitydcat-ap/mobility-theme/road-events-and-conditions",
    "https://w3id.org/mobilitydcat-ap/mobility-theme/road-work-information",
    "https://w3id.org/mobilitydcat-ap/mobility-theme/sharing-and-hiring-services",
    "https://w3id.org/mobilitydcat-ap/mobility-theme/static-road-network-data",
    "https://w3id.org/mobilitydcat-ap/mobility-theme/static-traffic-signs-and-regulations",
    "https://w3id.org/mobilitydcat-ap/mobility-theme/toll-information",
    "https://w3id.org/mobilitydcat-ap/mobility-theme/waterways-and-water-bodies",
]


class MobilityTheme(Vocabulary):
    iris = MOBILITY_THEME

    def __init__(self, iri):
        super().__init__(iri)
