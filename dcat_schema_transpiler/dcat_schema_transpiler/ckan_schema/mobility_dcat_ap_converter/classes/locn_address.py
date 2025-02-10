from rdflib import Dataset

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

    TRANSLATIONS = {
        LOCN.thoroughfare: {
            "label": {"en": "Street address", "fi": "Katuosoite"},
        },
        LOCN.postName: {
            "label": {"en": "City", "fi": "Kaupunki"},
        },
        LOCN.postCode: {
            "label": {"en": "Postal code", "fi": "Postinumero"},
        },
        LOCN.adminUnitL2: {
            "label": {"en": "Region", "fi": "Alue"},
        },
        LOCN.adminUnitL1: {
            "label": {"en": "Country", "fi": "Maa"},
        },
    }

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

    def get_label_with_help_text(
        self, p: RDFSProperty, ds: Dataset, pointer: str | None = None
    ) -> dict:
        translations = self.TRANSLATIONS.get(p.iri, None)
        if pointer and translations.get(pointer):
            return translations.get(pointer)
        return translations if translations else {"label": super().get_label(p, ds)}

    def get_range_value(self, ds: Dataset, clazz_p: RDFSProperty) -> RDFSClass | None:
        return super().get_range_value(ds, clazz_p)

    def get_schema(
        self, ds: Dataset, clazz_p: RDFSProperty | None, is_required: bool = None
    ):
        schema = super().get_schema(ds, clazz_p, False)

        return schema | self.get_label_with_help_text(clazz_p, ds) if schema else schema

    def is_property_required(self, property: RDFSProperty) -> bool:
        return property.iri in LOCNAddress.mandatory_properties
