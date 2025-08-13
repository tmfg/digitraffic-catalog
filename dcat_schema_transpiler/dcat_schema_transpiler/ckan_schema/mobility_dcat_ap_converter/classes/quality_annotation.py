from ckan_schema.mobility_dcat_ap_converter.range_value_converter import (
    RangeValueConverter,
)
from dcat_schema_transpiler.namespaces.DQV import DQV
from mobility_dcat_ap.dataset import OA
from rdflib import Dataset, URIRef

from dcat_schema_transpiler.rdfs.rdfs_class import RDFSClass
from dcat_schema_transpiler.rdfs.rdfs_property import RDFSProperty


class QualityAnnotation(RangeValueConverter):
    iri = DQV.QualityAnnotation

    mandatory_properties = {}

    recommended_properties = {}

    optional_properties = {OA.hasBody, OA.hasTarget}

    def __init__(self, clazz: RDFSClass, parent_class_iri: URIRef = None):
        super().__init__(clazz)

    def ckan_field(self, p: RDFSProperty, pointer: str = None) -> str:
        mappings = {OA.hasBody: "quality_description"}
        field_name = mappings.get(p.iri)

        if field_name is not None:
            return field_name
        else:
            raise ValueError(
                f"A mapping was not found between the class {self.clazz.iri} property {p.iri} and CKAN datamodel"
            )

    def get_range_value(self, ds: Dataset, clazz_p: RDFSProperty) -> RDFSClass | None:
        return super().get_range_value(ds, clazz_p)

    def get_schema(self, ds: Dataset, clazz_p: RDFSProperty, is_required: bool = False):
        class_properties = self.optional_properties
        if clazz_p.iri in class_properties:
            if clazz_p.is_iri(OA.hasBody):
                return {
                    "field_name": "quality_description",
                    **super().get_necessity_mapping(clazz_p.iri),
                    **super().get_property_label_with_help_text(clazz_p.iri),
                    "required": is_required,
                    "preset": "url",
                }
            # oa:hasTarget is not needed in the schema or the CKAN data input form
            if clazz_p.is_iri(OA.hasTarget):
                return None
        return None

    def get_label(self, p: RDFSProperty, ds: Dataset):
        if p.is_iri(OA.hasBody):
            return "Quality annotation resource"
        return super().get_label(p, ds)

    def is_property_required(self, property: RDFSProperty) -> bool:
        return property.iri in QualityAnnotation.mandatory_properties
