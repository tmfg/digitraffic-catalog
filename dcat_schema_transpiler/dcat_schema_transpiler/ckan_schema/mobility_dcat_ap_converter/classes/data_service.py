from ckan_schema.mobility_dcat_ap_converter.range_value_converter import (
    AggregateRangeValueConverter,
    RangeValueConverter,
)
from rdflib import DCAT, DCTERMS, Dataset

from dcat_schema_transpiler.rdfs.rdfs_class import RDFSClass
from dcat_schema_transpiler.rdfs.rdfs_property import RDFSProperty


class DataService(AggregateRangeValueConverter):
    iri = DCAT.DataService

    mandatory_properties = {DCAT.endpointURL, DCTERMS.title}

    recommended_properties = {DCAT.endpointDescription}

    optional_properties = {DCTERMS.description}

    aggregate_field_name = "dcat_data_service"

    field_name = "data_service"

    def __init__(self, clazz: RDFSClass):
        super().__init__(clazz)
        self.__aggregate_schemas = []

    def ckan_field(self, p: RDFSProperty, pointer: str = None) -> str:
        mappings = {
            DCAT.endpointURL: "data_service_endpoint_url",
            DCAT.endpointDescription: "data_service_endpoint_description",
            DCTERMS.title: "data_service_title_translated",
            DCTERMS.description: "data_service_description_translated",
        }
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
        is_required = clazz_p.iri in self.mandatory_properties
        if clazz_p.is_iri(DCAT.endpointURL):
            return {
                "field_name": self.ckan_field(clazz_p),
                **super().get_property_label_with_help_text(clazz_p.iri),
                **super().get_necessity_mapping(clazz_p.iri),
                "required": is_required,
                "preset": "url",
            }
        if clazz_p.is_iri(DCAT.endpointDescription):
            return {
                "field_name": self.ckan_field(clazz_p),
                **super().get_property_label_with_help_text(clazz_p.iri),
                **super().get_necessity_mapping(clazz_p.iri),
                "required": is_required,
                "preset": "url",
            }
        """
        Multilingual fields should have "required: false" at the field level.
        Required input languages are given in separate field "required_languages".
        """
        if clazz_p.is_iri(DCTERMS.title) or clazz_p.is_iri(DCTERMS.description):
            schema = super().get_schema(ds, clazz_p, is_required=False)
            return {
                **(
                    schema
                    | RangeValueConverter.get_translated_field_properties(
                        schema.get("label", {}) if schema else {}, is_required
                    )
                )
            }
        schema = super().get_schema(ds, clazz_p, False)
        return schema

    def get_aggregate_schema(self) -> dict:
        return {
            "field_name": DataService.field_name,
            "form_blanks": 0,
            **super().get_class_label_with_help_text(),
            "repeating_subfields": self.__aggregate_schemas,
        }

    def add_to_aggregate(self, schema: dict) -> None:
        self.__aggregate_schemas.append(schema)

    def is_property_required(self, property: RDFSProperty) -> bool:
        return property.iri in DataService.mandatory_properties
