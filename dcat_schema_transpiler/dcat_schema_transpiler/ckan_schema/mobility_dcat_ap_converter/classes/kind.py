from typing import Dict

from rdflib import Dataset

from ckan_schema.mobility_dcat_ap_converter.range_value_converter import (
    AggregateRangeValueConverter
)
from dcat_schema_transpiler.rdfs.rdfs_class import RDFSClass
from dcat_schema_transpiler.rdfs.rdfs_property import RDFSProperty

from dcat_schema_transpiler.namespaces.VCARD import VCARD


class Kind(AggregateRangeValueConverter):
    iri = VCARD.Kind
    aggregate_field_name = "vcard_kind"

    mandatory_properties = {
        VCARD.hasEmail,
        VCARD.fn,
    }

    recommended_properties = {
        VCARD.hasURL,
    }

    optional_properties = {
        VCARD.hasAddress,
        VCARD['organization-name'],
        VCARD.hasTelephone
    }

    def __init__(self, clazz: RDFSClass):
        super().__init__(clazz)
        self.__aggregate_schemas = []

    def ckan_field(self, p: RDFSProperty, pointer: str = None) -> str:
        mappings = {
            VCARD.hasEmail: 'has_email',
            VCARD.fn: 'fn',
            VCARD.hasURL: 'has_url',
            VCARD.hasAddress: 'has_address',
            VCARD['organization-name']: 'organization_name',
            VCARD.hasTelephone: 'has_telephone',
        }
        return mappings.get(p.iri)

    def get_range_value(self, ds: Dataset, clazz_p: RDFSProperty) -> RDFSClass | None:
        return super().get_range_value(ds, clazz_p)

    def get_schema(self, ds: Dataset, clazz_p: RDFSProperty | None, is_required: bool = None):
        if clazz_p.is_iri(VCARD.hasEmail):
            return {
                "field_name": self.ckan_field(clazz_p, None),
                "label": "Email",
                "required": is_required,
                "preset": "email"
            }
        if clazz_p.is_iri(VCARD.hasURL):
            return {
                "field_name": self.ckan_field(clazz_p, None),
                "label": "Web site",
                "required": is_required,
                "preset": "url"
            }
        if clazz_p.is_iri(VCARD.hasTelephone):
            return {
                "field_name": self.ckan_field(clazz_p, None),
                "label": "Phone number",
                "required": is_required,
                "preset": "phone"
            }
        schema = super().get_schema(ds, clazz_p, False)
        if clazz_p.is_iri(VCARD.fn):
            schema["label"] = "Full name"
        return schema

    def get_aggregate_schema(self) -> Dict:
        return {
            "field_name": Kind.aggregate_field_name,
            "label": "Fieldset",
            "repeating_subfields": self.__aggregate_schemas,
        }

    def add_to_aggregate(self, schema: Dict) -> None:
        self.__aggregate_schemas.append(schema)

    def is_property_required(self, property: RDFSProperty) -> bool:
        return property.iri in Kind.mandatory_properties
