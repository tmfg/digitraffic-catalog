from ckan_schema.mobility_dcat_ap_converter.range_value_converter import (
    RangeValueConverter,
    AggregateRangeValueConverter,
)
from typing import Dict
from rdflib import DCTERMS, Dataset

from dcat_schema_transpiler.mobility_dcat_ap.namespace import MOBILITYDCATAP
from mobility_dcat_ap.dataset import OA
from rdfs.rdfs_class import RDFSClass
from rdfs.rdfs_property import RDFSProperty


class Assessment(AggregateRangeValueConverter):
    iri = MOBILITYDCATAP.Assessment

    mandatory_properties = {}

    recommended_properties = {}

    optional_properties = {DCTERMS.issued, OA.hasBody}

    field_name = "assessment"

    def __init__(self, clazz: RDFSClass):
        super().__init__(clazz)
        self.__aggregate_schemas = []

    def ckan_field(self, p: RDFSProperty, pointer: str | None = None) -> str:
        mappings = {DCTERMS.issued: "assessment_date", OA.hasBody: "assessment_result"}

        field_name = mappings.get(p.iri)

        if field_name is not None:
            return field_name
        else:
            raise ValueError(
                f"A mapping was not found between the class {self.clazz.iri} property {p.iri} and CKAN datamodel"
            )

    def get_schema(self, ds: Dataset, clazz_p: RDFSProperty, is_required: bool = False):
        class_properties = self.optional_properties

        if clazz_p.iri in class_properties:
            if clazz_p.is_iri(DCTERMS.issued):
                return super().get_schema(ds, clazz_p, is_required)
            if clazz_p.is_iri(OA.hasBody):
                return {
                    "field_name": self.ckan_field(clazz_p, None),
                    "label": "Assessment result",
                    "required": is_required,
                    "preset": "url",
                    "help_text": "URL for the results of an assessment process by some organisation",
                }
        return None

    def get_label(self, p: RDFSProperty, ds: Dataset):
        if p.is_iri(DCTERMS.issued):
            return "Assessment date"
        if p.is_iri(OA.hasBody):
            return "Assessment result"
        return super().get_label(p, ds)

    def get_range_value(self, ds: Dataset, clazz_p: RDFSProperty) -> RDFSClass | None:
        return super().get_range_value(ds, clazz_p)

    def get_aggregate_schema(self) -> Dict:
        return {
            "field_name": Assessment.field_name,
            "label": "Assessment",
            "repeating_subfields": self.__aggregate_schemas,
        }

    def add_to_aggregate(self, schema: Dict) -> None:
        self.__aggregate_schemas.append(schema)

    def is_property_required(self, property: RDFSProperty) -> bool:
        return property.iri in Assessment.mandatory_properties
