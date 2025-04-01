from rdflib import Namespace
from ckanext.digitraffic_theme.model.vocabulary import Vocabulary

LANGUAGES = {
    "http://publications.europa.eu/resource/authority/language/ENG",
    "http://publications.europa.eu/resource/authority/language/FIN",
    "http://publications.europa.eu/resource/authority/language/SWE",
    "http://publications.europa.eu/resource/authority/language/EST",
    "http://publications.europa.eu/resource/authority/language/NOR",
    "http://publications.europa.eu/resource/authority/language/DAN",
    "http://publications.europa.eu/resource/authority/language/DEU",
    "http://publications.europa.eu/resource/authority/language/FRA",
    "http://publications.europa.eu/resource/authority/language/SPA",
    "http://publications.europa.eu/resource/authority/language/LAV",
    "http://publications.europa.eu/resource/authority/language/LIT",
    "http://publications.europa.eu/resource/authority/language/ISL",
    "http://publications.europa.eu/resource/authority/language/POL",
    "http://publications.europa.eu/resource/authority/language/NLD",
}


class Language(Vocabulary):
    iris = LANGUAGES
    namespace = Namespace("http://publications.europa.eu/resource/authority/language/")

    def __init__(self, iri):
        super().__init__(iri)
