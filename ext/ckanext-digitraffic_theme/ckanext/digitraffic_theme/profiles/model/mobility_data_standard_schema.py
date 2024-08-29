from ckanext.digitraffic_theme.profiles.model.vocabulary import Vocabulary

MOBILITY_DATA_STANDARD_SCHEMA = [
    'https://w3id.org/mobilitydcat-ap/mobility-data-standard/c-its',
    'https://w3id.org/mobilitydcat-ap/mobility-data-standard/datex-II',
    'https://w3id.org/mobilitydcat-ap/mobility-data-standard/dino',
    'https://w3id.org/mobilitydcat-ap/mobility-data-standard/gbfs',
    'https://w3id.org/mobilitydcat-ap/mobility-data-standard/gml',
    'https://w3id.org/mobilitydcat-ap/mobility-data-standard/gtfs',
    'https://w3id.org/mobilitydcat-ap/mobility-data-standard/gtfs-rt',
    'https://w3id.org/mobilitydcat-ap/mobility-data-standard/inspire',
    'https://w3id.org/mobilitydcat-ap/mobility-data-standard/netex',
    'https://w3id.org/mobilitydcat-ap/mobility-data-standard/ocit-c',
    'https://w3id.org/mobilitydcat-ap/mobility-data-standard/other',
    'https://w3id.org/mobilitydcat-ap/mobility-data-standard/siri',
    'https://w3id.org/mobilitydcat-ap/mobility-data-standard/tn-its',
    'https://w3id.org/mobilitydcat-ap/mobility-data-standard/tpegml',
]


class MobilityDataStandardSchema(Vocabulary):
    iris = MOBILITY_DATA_STANDARD_SCHEMA

    def __init__(self, iri):
        super().__init__(iri)
