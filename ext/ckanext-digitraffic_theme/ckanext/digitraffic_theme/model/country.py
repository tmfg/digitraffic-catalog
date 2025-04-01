from rdflib import Namespace
from ckanext.digitraffic_theme.model.vocabulary import Vocabulary

COUNTRIES = {
    "http://publications.europa.eu/resource/authority/country/AUT",
    "http://publications.europa.eu/resource/authority/country/BEL",
    "http://publications.europa.eu/resource/authority/country/BGR",
    "http://publications.europa.eu/resource/authority/country/HRV",
    "http://publications.europa.eu/resource/authority/country/CYP",
    "http://publications.europa.eu/resource/authority/country/CZE",
    "http://publications.europa.eu/resource/authority/country/DNK",
    "http://publications.europa.eu/resource/authority/country/EST",
    "http://publications.europa.eu/resource/authority/country/FIN",
    "http://publications.europa.eu/resource/authority/country/FRA",
    "http://publications.europa.eu/resource/authority/country/DEU",
    "http://publications.europa.eu/resource/authority/country/GRC",
    "http://publications.europa.eu/resource/authority/country/HUN",
    "http://publications.europa.eu/resource/authority/country/ISL",
    "http://publications.europa.eu/resource/authority/country/IRL",
    "http://publications.europa.eu/resource/authority/country/ITA",
    "http://publications.europa.eu/resource/authority/country/LVA",
    "http://publications.europa.eu/resource/authority/country/LTU",
    "http://publications.europa.eu/resource/authority/country/LUX",
    "http://publications.europa.eu/resource/authority/country/MLT",
    "http://publications.europa.eu/resource/authority/country/NLD",
    "http://publications.europa.eu/resource/authority/country/NOR",
    "http://publications.europa.eu/resource/authority/country/POL",
    "http://publications.europa.eu/resource/authority/country/PRT",
    "http://publications.europa.eu/resource/authority/country/ROU",
    "http://publications.europa.eu/resource/authority/country/SVK",
    "http://publications.europa.eu/resource/authority/country/SVN",
    "http://publications.europa.eu/resource/authority/country/ESP",
    "http://publications.europa.eu/resource/authority/country/SWE",
}


class Country(Vocabulary):
    iris = COUNTRIES
    namespace = Namespace("http://publications.europa.eu/resource/authority/country")

    def __init__(self, iri):
        super().__init__(iri)
