from typing import Any, List

from rdflib import Literal, DCAT, DCTERMS, URIRef, RDF

from ckanext.digitraffic_theme.model.class_instance import ClassInstance
from ckanext.digitraffic_theme.model.mobility_data_standard import (
    MobilityDataStandard,
)
from ckanext.digitraffic_theme.model.rights_statement import RightsStatement
from ckanext.digitraffic_theme.model.communication_method import CommunicationMethod

from ckanext.digitraffic_theme.model.format import Format
from ckanext.digitraffic_theme.model.data_service import DataService
from ckanext.digitraffic_theme.rdf.mobility_dcat_ap import MOBILITYDCATAP
from ckanext.digitraffic_theme.rdf.cnt import CNT


class Distribution(ClassInstance):
    accessURL: URIRef
    format: Format
    mobilityDataStandard: MobilityDataStandard
    rights: RightsStatement
    description: List[Literal]
    # optional properties
    communicationMethod: CommunicationMethod | None
    characterEncoding: Literal | None
    accessService: DataService
    dataFormatNotes: List[Literal]
    downloadURL: URIRef | None

    def __init__(self, iri: str, data: dict[str, Any], dataset_ref: str):
        super().__init__(iri, DCAT.Distribution)
        self.accessURL = URIRef(data["url"])
        self.format = Format(data["format_iri"])
        self.description = [
            Literal(data.get("description_translated", {}).get(key, ""), lang=key)
            for key in data.get("description_translated", {}).keys()
        ]
        self.dataFormatNotes = [
            Literal(data.get("data_format_notes_translated", {}).get(key, ""), lang=key)
            for key in data.get("data_format_notes_translated", {}).keys()
        ]
        self.mobilityDataStandard = MobilityDataStandard(
            data["mobility_data_standard"],
        )
        self.rights = RightsStatement(None, data["rights_type"])
        self.communicationMethod = (
            CommunicationMethod(data["communication_method"])
            if data.get("communication_method", None)
            else None
        )
        self.characterEncoding = (
            Literal(data["character_encoding"])
            if data.get("character_encoding", None)
            else None
        )
        self.accessService = DataService(
            None,
            {
                "access_rights": self.rights,
                "dataset_ref": dataset_ref,
                "data_service_description_translated": data.get(
                    "data_service_description_translated", None
                ),
                "data_service_endpoint_description": data.get(
                    "data_service_endpoint_description", None
                ),
                "data_service_title_translated": data.get(
                    "data_service_title_translated", None
                ),
                "data_service_endpoint_url": data.get(
                    "data_service_endpoint_url", None
                ),
            },
        )
        self.downloadURL = (
            URIRef(data["download_url"]) if data.get("download_url", None) else None
        )

    def predicate_objects(self):
        pos = [
            (RDF.type, self.type),
            (DCAT.accessURL, self.accessURL),
            (MOBILITYDCATAP.mobilityDataStandard, self.mobilityDataStandard),
            (DCTERMS.format, self.format),
            (DCTERMS.rights, self.rights),
            # multilingual field
            *[(DCTERMS.description, entry) for entry in self.description],
            # multilingual field
            *[
                (MOBILITYDCATAP.dataFormatNotes, entry)
                for entry in self.dataFormatNotes
            ],
            (
                (MOBILITYDCATAP.communicationMethod, self.communicationMethod)
                if self.communicationMethod
                else None
            ),
            (
                (CNT.characterEncoding, self.characterEncoding)
                if self.characterEncoding
                else None
            ),
            (DCAT.accessService, self.accessService),
            (DCAT.downloadURL, self.downloadURL) if self.downloadURL else None,
        ]
        return [po for po in pos if po is not None]
