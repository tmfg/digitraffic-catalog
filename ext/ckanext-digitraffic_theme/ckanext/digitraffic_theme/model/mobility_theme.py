from ckanext.digitraffic_theme.model.vocabulary import Vocabulary
from rdflib import URIRef

MOBILITY_THEME_TREE = {
    URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/air-and-space-travel"): {
    },
    URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/cycle-network-data"): {
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/network-closures-diversions"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/network-detailed-attributes"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/network-geometry-and-lane-character"),
    },
    URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/dynamic-traffic-signs-and-regulations"): {
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/bridge-closures-and-access-conditions"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/direction-of-travel-on-reversible-lanes"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/dynamic-overtaking-bans-on-heavy-goods-vehicles"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/dynamic-speed-limits"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/lane-closures-and-access-conditions"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/other-access-restrictions-and-traffic-regulations"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/other-temporary-traffic-management-measures-or-plans"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/road-closures-and-access-conditions"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/tunnel-closures-and-access-conditions"),
    },
    URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/filling-and-charging-stations"): {
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/availability-of-charging-points-for-electric-vehicles"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/availability-of-filling-stations"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/location-and-conditions-of-charging-points"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/location-and-conditions-of-filling-stations"),
    },
    URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/freight-and-logistics"): {
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/availability-of-delivery-areas"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/freight-delivery-regulations"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/location-of-delivery-areas"),
    },
    URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/general-information-for-trip-planning-"): {
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/address-identifiers"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/parameters-needed-to-calculate-costs"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/parameters-needed-to-calculate-environmental-factors"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/points-of-interest"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/topographic-places"),
    },
    URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/other"): {
    },
    URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/parking-service-and-rest-area-information"): {
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/bike-parking-locations"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/car-parking-availability"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/car-parking-locations-and-conditions"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/park-and-ride-stops"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/service-and-rest-area-availability"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/service-and-rest-area-locations-and-conditions"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/truck-parking-availability"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/truck-parking-locations-and-conditions"),
    },
    URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/pedestrian-network-data"): {
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/pedestrian-accessibility-facilities"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/pedestrian-network-geometry"),
    },
    URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/public-transport-non-scheduled-transport"): {
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/accesibility-information-for-vehicles"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/environmental-standards-for-vehicles"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/fares"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/locations-and-stations"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/provider-data"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/reservation-and-purchase-options"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/service-areas-and-service-times"),
    },
    URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/public-transport-scheduled-transport"): {
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/basic-commercial-conditions"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/basic-common-standard-fares"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/common-fare-products"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/connection-links"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/disruptions-delays-cancellations"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/environmental-standards-for-vehicles"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/hours-of-operation"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/network-topology-and-routes-lines"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/operational-calendar"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/passenger-classes"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/planned-interchanges-between-scheduled-services"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/purchase-information"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/real-time-estimated-departure-and-arrival-times"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/special-fare-products"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-accessibility-and-paths-within-facility"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-geometry-and-map-layout"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-location-and-features"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-status-of-features"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/timetables-static"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/transport-operators"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/vehicle-details"),
    },
    URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/real-time-traffic-data"): {
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/current-travel-times"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/expected-delays"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/location-and-length-of-queues"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/predicted-travel-times"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/speed"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/traffic-data-at-border-crossings-to-third-countries"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/traffic-volume"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/waiting-time-at-border-crossings-to-non-eu-member-states"),
    },
    URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/road-events-and-conditions"): {
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/accidents-and-incidents"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/poor-road-conditions"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/road-weather-conditions"),
    },
    URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/road-work-information"): {
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/long-term-road-works"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/short-term-road-works"),
    },
    URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/sharing-and-hiring-services"): {
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/bike-hiring-availability"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/bike-hiring-stations"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/bike-sharing-availability"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/bike-sharing-locations-and-stations"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/car-hiring-availability"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/car-hiring-stations"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/car-sharing-availability"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/car-sharing-locations-and-stations"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/e-scooter-sharing-availability"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/e-scooter-sharing-locations-and-stations"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/environmental-standards-for-vehicles"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/payment-methods"),
    },
    URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/static-road-network-data"): {
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/geometry"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/gradients"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/junctions"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/number-of-lanes"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/road-classification"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/road-width"),
    },
    URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/static-traffic-signs-and-regulations"): {
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/bridge-access-conditions"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/other-static-traffic-signs"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/other-traffic-regulations"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/permanent-access-restrictions"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/speed-limits"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/traffic-circulation-plans"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/tunnel-access-conditions"),
    },
    URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/toll-information"): {
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/applicable-road-user-charges-and-payment-methods"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/identification-of-tolled-roads"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/location-of-tolling-stations"),
        URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/payment-methods-for-tolls"),
    },
    URIRef("https://w3id.org/mobilitydcat-ap/mobility-theme/waterways-and-water-bodies"): {
    },
}


class MobilityTheme(Vocabulary):
    iris = [str(key) for key in MOBILITY_THEME_TREE.keys()]

    def __init__(self, iri):
        super().__init__(iri)

class MobilityThemeSub(Vocabulary):
    iris = [str(sub_theme) for theme, sub_themes in MOBILITY_THEME_TREE.items() for sub_theme in sub_themes]

    def __init__(self, iri):
        super().__init__(iri)


def is_valid_mobility_theme_sub(mobility_theme: MobilityTheme, mobility_theme_sub: MobilityThemeSub) -> bool:
    return mobility_theme_sub.iri in MOBILITY_THEME_TREE[mobility_theme.iri]
