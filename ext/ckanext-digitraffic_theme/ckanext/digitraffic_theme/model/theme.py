from rdflib import Namespace

from ckanext.digitraffic_theme.model.vocabulary import Vocabulary

THEME = {
    "http://publications.europa.eu/resource/authority/data-theme/AGRI",
    "http://publications.europa.eu/resource/authority/data-theme/ECON",
    "http://publications.europa.eu/resource/authority/data-theme/EDUC",
    "http://publications.europa.eu/resource/authority/data-theme/ENER",
    "http://publications.europa.eu/resource/authority/data-theme/ENVI",
    "http://publications.europa.eu/resource/authority/data-theme/GOVE",
    "http://publications.europa.eu/resource/authority/data-theme/HEAL",
    "http://publications.europa.eu/resource/authority/data-theme/INTR",
    "http://publications.europa.eu/resource/authority/data-theme/JUST",
    "http://publications.europa.eu/resource/authority/data-theme/SOCI",
    "http://publications.europa.eu/resource/authority/data-theme/OP_DATPRO",
    "http://publications.europa.eu/resource/authority/data-theme/REGI",
    "http://publications.europa.eu/resource/authority/data-theme/TECH",
    "http://publications.europa.eu/resource/authority/data-theme/TRAN",
}


class Theme(Vocabulary):
    iris = THEME
    namespace = Namespace("http://publications.europa.eu/resource/authority/data-theme/")

    def __init__(self, iri):
        super().__init__(iri)
