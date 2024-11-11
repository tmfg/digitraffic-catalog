from ckanext.digitraffic_theme.model.vocabulary import Vocabulary

LANGUAGES = [
    'http://publications.europa.eu/resource/authority/language/ENG',
    'http://publications.europa.eu/resource/authority/language/FIN',
    'http://publications.europa.eu/resource/authority/language/SWE',
]


class Language(Vocabulary):
    iris = LANGUAGES

    def __init__(self, iri):
        super().__init__(iri)
