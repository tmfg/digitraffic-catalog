from typing import List, TypedDict, NotRequired

from rdflib import Literal, DCAT, DCTERMS, RDF

from ckanext.digitraffic_theme.model.class_instance import ClassInstance
from ckanext.digitraffic_theme.model.mobility_data_standard import (
    MobilityDataStandard,
)
from ckanext.digitraffic_theme.model.rights_statement import RightsStatement
from ckanext.digitraffic_theme.model.application_layer_protocol import ApplicationLayerProtocol
from ckanext.digitraffic_theme.model.format import Format
from ckanext.digitraffic_theme.rdf.mobility_dcat_ap import MOBILITYDCATAP


class DistributionInput(TypedDict):
    access_url: Literal
    format: Format
    description: List[Literal]
    mobility_data_standard: MobilityDataStandard
    rights: RightsStatement
    application_layer_protocol: NotRequired[ApplicationLayerProtocol]


class Distribution(ClassInstance):

    def __init__(self, iri: str, data: DistributionInput):
        super().__init__(iri, DCAT.Distribution)
        self.access_url = data["access_url"]
        self.format = data["format"]
        self.description = data["description"]
        self.mobility_data_standard = data["mobility_data_standard"]
        self.rights = data["rights"]
        self.application_layer_protocol = data["application_layer_protocol"]

    def predicate_objects(self):
        return [
            (RDF.type, self.type),
            (DCAT.accessURL, self.access_url),
            (MOBILITYDCATAP.mobilityDataStandard, self.mobility_data_standard),
            (DCTERMS.format, self.format),
            (DCTERMS.rights, self.rights),
            # multilingual field
            *[(DCTERMS.description, entry) for entry in self.description],
            (MOBILITYDCATAP.applicationLayerProtocol, self.application_layer_protocol)
        ]
