from ckan_schema.mobility_dcat_ap_converter.range_value_converter import (
    RangeValueConverter,
)
from typing import Dict
from rdflib import DCTERMS, Dataset, URIRef

from dcat_schema_transpiler.mobility_dcat_ap.namespace import MOBILITYDCATAP
from mobility_dcat_ap.dataset import OA
from rdfs.rdfs_class import RDFSClass
from rdfs.rdfs_property import RDFSProperty


class Assessment(RangeValueConverter):
    iri = MOBILITYDCATAP.Assessment

    mandatory_properties = {}

    recommended_properties = {}

    optional_properties = {DCTERMS.issued, OA.hasBody}

    def __init__(self, clazz: RDFSClass, parent_class_iri: URIRef = None):
        super().__init__(clazz)

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
                return (
                    super().get_schema(ds, clazz_p, is_required)
                    | super().get_property_label_with_help_text(clazz_p.iri)
                    | super().get_necessity_mapping(clazz_p.iri)
                    | {"preset": "date", "form_snippet": "date.html"}
                )

            if clazz_p.is_iri(OA.hasBody):
                return {
                    "field_name": self.ckan_field(clazz_p, ds),
                    **super().get_property_label_with_help_text(clazz_p.iri),
                    **super().get_necessity_mapping(clazz_p.iri),
                    "required": is_required,
                    "preset": "url",
                    "form_snippet": "url_input.html",
                }
        return None

    def get_range_value(self, ds: Dataset, clazz_p: RDFSProperty) -> RDFSClass | None:
        return super().get_range_value(ds, clazz_p)

    def is_property_required(self, property: RDFSProperty) -> bool:
        return property.iri in Assessment.mandatory_properties
