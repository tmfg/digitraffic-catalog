from typing import Dict

from rdflib import DCTERMS, Dataset, URIRef

from ckan_schema.mobility_dcat_ap_converter.range_value_converter import (
    RangeValueConverter,
)
from dcat_schema_transpiler.rdfs.rdfs_class import RDFSClass
from dcat_schema_transpiler.rdfs.rdfs_property import RDFSProperty

from dcat_schema_transpiler.namespaces.VCARD import VCARD


class VCARDAddress(RangeValueConverter):
    iri = VCARD.Address

    optional_properties = {
        VCARD["country-name"],
        VCARD.locality,
        VCARD["postal-code"],
        VCARD.region,
        VCARD["street-address"],
    }

    TRANSLATIONS = {
        VCARD["country-name"]: {
            "label": {"en": "Country", "fi": "Maa"},
        },
        VCARD.locality: {
            "label": {"en": "City", "fi": "Kaupunki"},
        },
        VCARD["postal-code"]: {
            "label": {"en": "Postal code", "fi": "Postinumero"},
        },
        VCARD.region: {
            "label": {"en": "Region", "fi": "Alue"},
        },
        VCARD["street-address"]: {
            "label": {"en": "Street address", "fi": "Katuosoite"},
        },
    }

    def __init__(self, clazz: RDFSClass):
        super().__init__(clazz)
        self.__aggregate_schemas = []

    def ckan_field(self, p: RDFSProperty, pointer: str = None) -> str:
        mappings = {
            VCARD["country-name"]: "country_name",
            VCARD.locality: "locality",
            VCARD["postal-code"]: "postal_code",
            VCARD.region: "region",
            VCARD["street-address"]: "street_address",
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

        return super().get_schema(ds, clazz_p, False) | self.get_label_with_help_text(
            clazz_p, ds
        )

    def is_property_required(self, property: RDFSProperty) -> bool:
        return False
