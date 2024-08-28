from ckanext.digitraffic_theme.profiles.model.vocabulary import Vocabulary

RIGHTS_TYPE = [
    'https://w3id.org/mobilitydcat-ap/conditions-for-access-and-usage/contractual-arrangement',
    'https://w3id.org/mobilitydcat-ap/conditions-for-access-and-usage/fee-required',
    'https://w3id.org/mobilitydcat-ap/conditions-for-access-and-usage/free-of-charge',
    'https://w3id.org/mobilitydcat-ap/conditions-for-access-and-usage/licence-provided',
    'https://w3id.org/mobilitydcat-ap/conditions-for-access-and-usage/other',
    'https://w3id.org/mobilitydcat-ap/conditions-for-access-and-usage/royalty-free',
]


class RightsType(Vocabulary):
    iris = RIGHTS_TYPE

    def __init__(self, iri):
        super().__init__(iri)
