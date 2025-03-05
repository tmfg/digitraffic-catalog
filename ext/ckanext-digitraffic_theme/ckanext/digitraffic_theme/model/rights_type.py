from rdflib import Namespace
from ckanext.digitraffic_theme.model.vocabulary import Vocabulary

RIGHTS_TYPE = {
    "https://w3id.org/mobilitydcat-ap/conditions-for-access-and-usage/contractual-arrangement",
    "https://w3id.org/mobilitydcat-ap/conditions-for-access-and-usage/contractual-arrangement-fee-required",
    "https://w3id.org/mobilitydcat-ap/conditions-for-access-and-usage/contractual-arrangement-free-of-charge",
    "https://w3id.org/mobilitydcat-ap/conditions-for-access-and-usage/fee-required",
    "https://w3id.org/mobilitydcat-ap/conditions-for-access-and-usage/free-of-charge",
    "https://w3id.org/mobilitydcat-ap/conditions-for-access-and-usage/licence-provided",
    "https://w3id.org/mobilitydcat-ap/conditions-for-access-and-usage/licence-provided-fee-required",
    "https://w3id.org/mobilitydcat-ap/conditions-for-access-and-usage/licence-provided-free-of-charge",
    "https://w3id.org/mobilitydcat-ap/conditions-for-access-and-usage/other",
    "https://w3id.org/mobilitydcat-ap/conditions-for-access-and-usage/royalty-free",
}


class RightsType(Vocabulary):
    iris = RIGHTS_TYPE
    namespace = Namespace(
        "https://w3id.org/mobilitydcat-ap/conditions-for-access-and-usage/"
    )

    def __init__(self, iri):
        super().__init__(iri)
