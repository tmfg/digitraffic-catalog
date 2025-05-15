from dcat_schema_transpiler.mobility_dcat_ap.dataset import (
    CVOCAB_COUNTRY,
)
from rdflib import Dataset, URIRef

from ckan_schema.mobility_dcat_ap_converter.range_value_converter import (
    RangeValueConverter,
)
from dcat_schema_transpiler.rdfs.rdfs_class import RDFSClass
from dcat_schema_transpiler.rdfs.rdfs_property import RDFSProperty

from dcat_schema_transpiler.namespaces.LOCN import LOCN


class LOCNAddress(RangeValueConverter):
    iri = LOCN.Address
    mandatory_properties = set()

    recommended_properties = {
        LOCN.adminUnitL2,
        LOCN.postName,
        LOCN.adminUnitL1,
        LOCN.postCode,
        LOCN.thoroughfare,
    }

    optional_properties = set()

    def __init__(self, clazz: RDFSClass):
        super().__init__(clazz)

    def ckan_field(self, p: RDFSProperty, pointer: str = None) -> str:
        mappings = {
            LOCN.adminUnitL2: "admin_unit_l2",
            LOCN.postName: "post_name",
            LOCN.adminUnitL1: "admin_unit_l1",
            LOCN.postCode: "post_code",
            LOCN.thoroughfare: "thoroughfare",
        }
        return mappings.get(p.iri)

    def get_range_value(self, ds: Dataset, clazz_p: RDFSProperty) -> RDFSClass | None:
        return super().get_range_value(ds, clazz_p)

    def get_schema(
        self, ds: Dataset, clazz_p: RDFSProperty | None, is_required: bool = None
    ):
        if clazz_p.is_iri(LOCN.adminUnitL1):
            g_countries = ds.get_graph(URIRef(CVOCAB_COUNTRY))

            schema = {
                "field_name": self.ckan_field(clazz_p),
                **super().get_property_label_with_help_text(clazz_p.iri),
                "required": is_required,
                "preset": "select",
                "sorted_choices": True,
                "form_include_blank_choice": True,
                "choices": RangeValueConverter.vocab_choices(
                    g_countries, RangeValueConverter.country_filter
                ),
                "validators": super().get_validators(["country_validator"]),
            }
        else:
            schema = super().get_schema(ds, clazz_p, False)
        if schema is None:
            return None
        return {
            **schema,
            **super().get_necessity_mapping(clazz_p.iri),
        }

    def is_property_required(self, property: RDFSProperty) -> bool:
        return property.iri in LOCNAddress.mandatory_properties
