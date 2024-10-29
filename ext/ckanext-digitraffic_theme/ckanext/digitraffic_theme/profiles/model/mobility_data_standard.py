from __future__ import annotations

from rdflib import Literal, RDF

from ckanext.dcat.profiles import OWL
from ckanext.digitraffic_theme.profiles.model.class_instance import ClassInstance
from ckanext.digitraffic_theme.profiles.model.mobility_data_standard_schema import (
    MobilityDataStandardSchema,
)
from ckanext.digitraffic_theme.profiles.rdf.mobility_dcat_ap import MOBILITYDCATAP


class MobilityDataStandard(ClassInstance):
    version: Literal
    schema: MobilityDataStandardSchema

    def __init__(self, iri: str | None, version: str, schema: str):
        super().__init__(iri, MOBILITYDCATAP.MobilityDataStandard)
        self.version = Literal(version)
        self.schema = MobilityDataStandardSchema(schema)

    def predicate_objects(self):
        return [
            (RDF.type, self.type),
            (OWL.versionInfo, self.version),
            (MOBILITYDCATAP.schema, self.schema),
        ]
