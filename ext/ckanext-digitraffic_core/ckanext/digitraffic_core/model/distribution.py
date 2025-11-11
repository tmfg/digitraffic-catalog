from typing import Any, List, TypedDict, NotRequired, Optional

from rdflib import Literal, DCAT, DCTERMS, RDF, URIRef

from ckanext.digitraffic_core.model.class_instance import ClassInstance
from ckanext.digitraffic_core.model.mobility_data_standard import (
    MobilityDataStandard,
)
from ckanext.digitraffic_core.model.rights_statement import RightsStatement
from ckanext.digitraffic_core.model.application_layer_protocol import (
    ApplicationLayerProtocol,
)
from ckanext.digitraffic_core.model.format import Format
from ckanext.digitraffic_core.model.license_document import LicenseDocument
from ckanext.digitraffic_core.model.communication_method import CommunicationMethod

from ckanext.digitraffic_core.model.data_service import DataService
from ckanext.digitraffic_core.model.period_of_time import PeriodOfTime

from ckanext.digitraffic_core.rdf.mobility_dcat_ap import MOBILITYDCATAP
from ckanext.digitraffic_core.rdf.cnt import CNT
from ckanext.digitraffic_core.rdf.adms import ADMS


class DistributionInput(TypedDict):
    access_url: URIRef
    mobility_data_standard: MobilityDataStandard
    format: Format
    rights: RightsStatement

    # Recommended properties
    application_layer_protocol: NotRequired[ApplicationLayerProtocol]
    license: NotRequired[LicenseDocument]
    description: List[Literal]

    # optional properties
    communication_method: Optional[CommunicationMethod]
    character_encoding: Optional[Literal]
    data_format_notes: List[Literal]
    access_service: DataService
    data_format_notes: List[Literal]
    download_url: Optional[URIRef]
    data_grammar: Optional[URIRef]
    sample: Optional[URIRef]
    temporal: Optional[PeriodOfTime]
    title: NotRequired[List[Literal]]


class Distribution(ClassInstance):

    def __init__(self, iri: str, data: dict[str, Any]):
        super().__init__(iri, DCAT.Distribution)
        self.access_url = data["access_url"]
        self.format = data["format"]
        self.description = data["description"]
        self.mobility_data_standard = data["mobility_data_standard"]
        self.rights = data["rights"]
        self.application_layer_protocol = data.get("application_layer_protocol")
        self.license = data.get("license")

        self.data_format_notes = data["data_format_notes"]

        self.communication_method = data.get("communication_method")
        self.character_encoding = data.get("character_encoding")
        self.access_service = data.get("access_service")
        self.download_url = data.get("download_url")
        self.data_grammar = data.get("data_grammar")
        self.sample = data.get("sample")
        self.temporal = data.get("temporal")
        self.title = data.get("title")

    def predicate_objects(self):
        pos = [
            (RDF.type, self.type),
            (DCAT.accessURL, self.access_url),
            (MOBILITYDCATAP.mobilityDataStandard, self.mobility_data_standard),
            (DCTERMS.format, self.format),
            (DCTERMS.rights, self.rights),
            # multilingual field
            *[(DCTERMS.description, entry) for entry in self.description],
            # multilingual field
            *[
                (MOBILITYDCATAP.dataFormatNotes, entry)
                for entry in self.data_format_notes
            ],
            (
                (MOBILITYDCATAP.communicationMethod, self.communication_method)
                if self.communication_method
                else None
            ),
            (
                (CNT.characterEncoding, self.character_encoding)
                if self.character_encoding
                else None
            ),
            (
                (DCAT.accessService, self.access_service)
                if self.access_service
                else None
            ),
            (DCAT.downloadURL, self.download_url) if self.download_url else None,
            (MOBILITYDCATAP.grammar, self.data_grammar) if self.data_grammar else None,
            (ADMS.sample, self.sample) if self.sample else None,
            (
                (
                    MOBILITYDCATAP.applicationLayerProtocol,
                    self.application_layer_protocol,
                )
                if self.application_layer_protocol
                else None
            ),
            (DCTERMS.license, self.license) if self.license else None,
            (DCTERMS.temporal, self.temporal) if self.temporal else None,
            *[
                (DCTERMS.title, title)
                for title in self.title
            ],
        ]
        return [po for po in pos if po is not None]
