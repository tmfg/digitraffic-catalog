from typing import Dict

from rdflib import Dataset
from rdflib.namespace import SKOS

from ckan_schema.mobility_dcat_ap_converter.range_value_converter import (
    RangeValueConverter,
    AggregateRangeValueConverter
)
from dcat_schema_transpiler.rdfs.rdfs_class import RDFSClass
from dcat_schema_transpiler.rdfs.rdfs_property import RDFSProperty



class Organization(RangeValueConverter, AggregateRangeValueConverter):
    aggregate_field_name = "org_organization"

    mandatory_properties = {
        SKOS.prefLabel
    }

    recommended_properties = set()

    optional_properties = set()

    def __init__(self, clazz: RDFSClass):
        super().__init__(clazz)
        self.__aggregate_schemas = []

    def ckan_field(self, p: RDFSProperty, pointer: str = None) -> str:
        mappings = {
            SKOS.prefLabel: "organization_name"
        }
        return mappings.get(p.iri)

    def get_range_value(self, ds: Dataset, clazz_p: RDFSProperty) -> RDFSClass | None:
        return super().get_range_value(ds, clazz_p)

    def get_schema(self, ds: Dataset, clazz_p: RDFSProperty | None, is_required: bool = None):
        schema = super().get_schema(ds, clazz_p, False)
        if clazz_p.is_iri(SKOS.prefLabel):
            schema["label"] = "Organization name"
        return schema

    def get_aggregate_schema(self) -> Dict:
        return {
            "field_name": Organization.aggregate_field_name,
            "label": "Fieldset",
            "repeating_subfields": self.__aggregate_schemas,
        }

    def add_to_aggregate(self, schema: Dict) -> None:
        self.__aggregate_schemas.append(schema)

    def is_property_required(self, property: RDFSProperty) -> bool:
        return property.iri in Organization.mandatory_properties
