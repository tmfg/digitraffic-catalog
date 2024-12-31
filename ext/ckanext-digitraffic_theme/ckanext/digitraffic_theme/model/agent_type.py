from rdflib import Namespace

from ckanext.digitraffic_theme.model.vocabulary import Vocabulary

AGENT_TYPE = {
    "http://purl.org/adms/publishertype/Academia-ScientificOrganisation",
    "http://purl.org/adms/publishertype/Company",
    "http://purl.org/adms/publishertype/IndustryConsortium",
    "http://purl.org/adms/publishertype/LocalAuthority",
    "http://purl.org/adms/publishertype/NationalAuthority",
    "http://purl.org/adms/publishertype/NonGovernmentalOrganisation",
    "http://purl.org/adms/publishertype/NonProfitOrganisation",
    "http://purl.org/adms/publishertype/PrivateIndividual(s)",
    "http://purl.org/adms/publishertype/RegionalAuthority",
    "http://purl.org/adms/publishertype/StandardisationBody",
    "http://purl.org/adms/publishertype/SupraNationalAuthority",
}


class AgentType(Vocabulary):
    iris = AGENT_TYPE
    namespace = Namespace("http://purl.org/adms/publishertype/")

    def __init__(self, iri):
        super().__init__(iri)
