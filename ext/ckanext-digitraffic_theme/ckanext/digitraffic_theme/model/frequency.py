from rdflib import Namespace

from ckanext.digitraffic_theme.model.vocabulary import Vocabulary

FREQUENCY = {
    "https://w3id.org/mobilitydcat-ap/update-frequency/24h",
    "https://w3id.org/mobilitydcat-ap/update-frequency/12h",
    "https://w3id.org/mobilitydcat-ap/update-frequency/1min",
    "https://w3id.org/mobilitydcat-ap/update-frequency/1h",
    "https://w3id.org/mobilitydcat-ap/update-frequency/less-than-yearly",
    "https://w3id.org/mobilitydcat-ap/update-frequency/6-months",
    "https://w3id.org/mobilitydcat-ap/update-frequency/30min",
    "https://w3id.org/mobilitydcat-ap/update-frequency/2h",
    "https://w3id.org/mobilitydcat-ap/update-frequency/3-months",
    "https://w3id.org/mobilitydcat-ap/update-frequency/5min",
    "https://w3id.org/mobilitydcat-ap/update-frequency/15min",
    "https://w3id.org/mobilitydcat-ap/update-frequency/3h",
    "https://w3id.org/mobilitydcat-ap/update-frequency/10min",
    "http://publications.europa.eu/resource/authority/frequency/DAILY",
    "http://publications.europa.eu/resource/authority/frequency/QUARTERLY",
    "http://publications.europa.eu/resource/authority/frequency/NEVER",
    "http://publications.europa.eu/resource/authority/frequency/BIMONTHLY",
    "http://publications.europa.eu/resource/authority/frequency/QUINQUENNIAL",
    "http://publications.europa.eu/resource/authority/frequency/ANNUAL_3",
    "http://publications.europa.eu/resource/authority/frequency/BIDECENNIAL",
    "http://publications.europa.eu/resource/authority/frequency/UNKNOWN",
    "http://publications.europa.eu/resource/authority/frequency/AS_NEEDED",
    "http://publications.europa.eu/resource/authority/frequency/TRIENNIAL",
    "http://publications.europa.eu/resource/authority/frequency/ANNUAL",
    "http://publications.europa.eu/resource/authority/frequency/NOT_PLANNED",
    "http://publications.europa.eu/resource/authority/frequency/BIHOURLY",
    "http://publications.europa.eu/resource/authority/frequency/WEEKLY",
    "http://publications.europa.eu/resource/authority/frequency/UPDATE_CONT",
    "http://publications.europa.eu/resource/authority/frequency/MONTHLY_3",
    "http://publications.europa.eu/resource/authority/frequency/WEEKLY_3",
    "http://publications.europa.eu/resource/authority/frequency/ANNUAL_2",
    "http://publications.europa.eu/resource/authority/frequency/IRREG",
    "http://publications.europa.eu/resource/authority/frequency/BIWEEKLY",
    "http://publications.europa.eu/resource/authority/frequency/CONT",
    "http://publications.europa.eu/resource/authority/frequency/DAILY_2",
    "http://publications.europa.eu/resource/authority/frequency/MONTHLY",
    "http://publications.europa.eu/resource/authority/frequency/WEEKLY_2",
    "http://publications.europa.eu/resource/authority/frequency/OP_DATPRO",
    "http://publications.europa.eu/resource/authority/frequency/QUADRENNIAL",
    "http://publications.europa.eu/resource/authority/frequency/OTHER",
    "http://publications.europa.eu/resource/authority/frequency/DECENNIAL",
    "http://publications.europa.eu/resource/authority/frequency/MONTHLY_2",
    "http://publications.europa.eu/resource/authority/frequency/BIENNIAL",
    "http://publications.europa.eu/resource/authority/frequency/HOURLY",
    "http://publications.europa.eu/resource/authority/frequency/TRIDECENNIAL",
    "http://publications.europa.eu/resource/authority/frequency/TRIHOURLY",
}


class Frequency(Vocabulary):
    iris = FREQUENCY
    namespace = Namespace("http://publications.europa.eu/resource/authority/frequency/")

    def __init__(self, iri):
        super().__init__(iri)
