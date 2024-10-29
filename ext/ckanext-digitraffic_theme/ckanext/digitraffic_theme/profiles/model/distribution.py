from typing import Any, List

from rdflib import Literal, DCAT, DCTERMS, URIRef, RDF

from ckanext.digitraffic_theme.profiles.model.class_instance import ClassInstance
from ckanext.digitraffic_theme.profiles.model.mobility_data_standard import (
    MobilityDataStandard,
)
from ckanext.digitraffic_theme.profiles.model.rights_statement import RightsStatement
from ckanext.digitraffic_theme.profiles.model.format import Format
from ckanext.digitraffic_theme.profiles.rdf.mobility_dcat_ap import MOBILITYDCATAP


class Distribution(ClassInstance):
    accessURL: Literal
    format: Format
    mobilityDataStandard: MobilityDataStandard
    rights: RightsStatement
    description: List[Literal]

    def __init__(self, iri: str, data: dict[str, Any]):
        super().__init__(iri, DCAT.Distribution)
        self.accessURL = Literal(data["url"])
        self.format = Format(data["format_iri"])
        self.description = [
            Literal(data.get("description_translated", {}).get(key, ""), lang=key)
            for key in data.get("description_translated", {}).keys()
        ]
        self.mobilityDataStandard = MobilityDataStandard(
            None,
            data["mobility_data_standard_version"],
            data["mobility_data_standard_schema"],
        )
        self.rights = RightsStatement(None, data["rights_type"])

    def predicate_objects(self):
        return [
            (RDF.type, self.type),
            (DCAT.accessURL, self.accessURL),
            (MOBILITYDCATAP.mobilityDataStandard, self.mobilityDataStandard),
            (DCTERMS.format, self.format),
            (DCTERMS.rights, self.rights),
            # multilingual field
            *[(DCTERMS.description, entry) for entry in self.description],
        ]
