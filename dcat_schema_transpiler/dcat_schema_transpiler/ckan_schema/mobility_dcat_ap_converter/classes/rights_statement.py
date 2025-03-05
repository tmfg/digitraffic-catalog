from typing import Dict

from rdflib import DCTERMS, Dataset, RDFS, URIRef

from ckan_schema.mobility_dcat_ap_converter.range_value_converter import (
    RangeValueConverter,
)
from dcat_schema_transpiler.rdfs.rdfs_class import RDFSClass
from dcat_schema_transpiler.rdfs.rdfs_property import RDFSProperty
from mobility_dcat_ap.dataset import CVOCAB_RIGHTS_STATEMENT_TYPE


class RightsStatement(RangeValueConverter):
    iri = DCTERMS.RightsStatement
    mandatory_properties = {DCTERMS.type}
    recommended_properties = {RDFS.label}

    def __init__(self, clazz: RDFSClass):
        super().__init__(clazz)

    def ckan_field(self, p: RDFSProperty, pointer: str = None) -> str:
        mappings = {DCTERMS.type: "rights_type"}
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
        if clazz_p.is_iri(RDFS.label):
            return dict(
                field_name=self.ckan_field(clazz_p),
                required=is_required,
                **super().get_property_label_with_help_text(clazz_p.iri),
            )
        if clazz_p.iri in DCTERMS.type:
            return self.controlled_vocab_field(clazz_p, ds, is_required)
        return super().get_schema(ds, clazz_p, is_required)

    def controlled_vocab_field(
        self, p: RDFSProperty, ds: Dataset, is_required: bool
    ) -> Dict:
        match p.iri:
            case DCTERMS.type:
                g = ds.get_graph(URIRef(CVOCAB_RIGHTS_STATEMENT_TYPE))
                return {
                    "field_name": self.ckan_field(p),
                    **super().get_property_label_with_help_text(p.iri),
                    "required": is_required,
                    "preset": "select",
                    "sorted_choices": True,
                    "form_include_blank_choice": True,
                    "choices": RangeValueConverter.vocab_choices(graph=g, iri=self.iri),
                }

    def is_property_required(self, property: RDFSProperty) -> bool:
        return property.iri in RightsStatement.mandatory_properties
