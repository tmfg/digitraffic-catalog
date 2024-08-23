from rdflib import Literal, RDF

from ckanext.dcat.profiles import OWL
from ckanext.digitraffic_theme.profiles.model.class_instance import ClassInstance
from ckanext.digitraffic_theme.profiles.rdf.mobility_dcat_ap import MOBILITYDCATAP


class MobilityDataStandard(ClassInstance):
    version: Literal
    schema: Literal

    def __init__(self, iri:str|None, version: str, schema: str):
        super().__init__(iri, MOBILITYDCATAP.MobilityDataStandard)
        self.version = Literal(version)
        self.schema = Literal(schema)

    def predicate_objects(self):
        return [
            (RDF.type, self.type),
            (OWL.vesrionInfo, self.version),
            (MOBILITYDCATAP.schema, self.schema)
        ]