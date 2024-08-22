from typing import Any

from rdflib import Literal, DCAT, DCTERMS, URIRef, RDF

from ckanext.digitraffic_theme.profiles.model.class_instance import ClassInstance
from ckanext.digitraffic_theme.profiles.model.mobility_data_standard import MobilityDataStandard
from ckanext.digitraffic_theme.profiles.model.rights_statement import RightsStatement
from ckanext.digitraffic_theme.profiles.rdf.mobility_dcat_ap import MOBILITYDCATAP


class Distribution(ClassInstance):
    accessURL: Literal
    format: URIRef
    mobilityDataStandard: MobilityDataStandard
    rights: RightsStatement

    def __init__(self, iri: str, data: dict[str, Any]):
        super().__init__(iri, DCAT.Distribution)
        self.accessURL = Literal(data["url"])
        self.format = URIRef(data["format"])
        self.mobilityDataStandard = MobilityDataStandard(iri + '/mobility-data-standard', data["mobility_data_standard_version"], data["mobility_data_standard_schema"])
        self.rights = RightsStatement(iri + '/rights-statement', data["rights_type"])

    def predicate_objects(self):
        return [
            (RDF.type, self.type),
            (DCAT.accessURL, self.accessURL),
            (MOBILITYDCATAP.mobilityDataStandard, self.mobilityDataStandard),
            (DCTERMS.format, self.format),
            (DCTERMS.rights, self.rights)
        ]