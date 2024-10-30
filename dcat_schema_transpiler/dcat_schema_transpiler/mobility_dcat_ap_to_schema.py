from rdflib import Dataset, URIRef, DCAT, DCTERMS
from typing import List, Dict, Any

from functools import partial

from ckan_schema.mobility_dcat_ap_converter.class_converter import ClassConverter
from ckan_schema.mobility_dcat_ap_converter.classes.distribution import Distribution
from ckan_schema.mobility_dcat_ap_converter.classes.rights_statement import (
    RightsStatement,
)
from dcat_schema_transpiler.rdfs.rdfs_class import RDFSClass
from dcat_schema_transpiler.rdfs.util import ClassPropertiesAggregator


def sort_by_field_name(order_list: List[str], field: Dict[str, Any]):
    try:
        return order_list.index(field["field_name"])
    except:
        return 9999


def sort_by_label(field: Dict[str, Any]):
    return field["label"]


def sort_location(field: Dict[str, Any]):
    return (
        0 if "http://data.europa.eu/nuts/code" in field["value"] else 1,
        field["label"],
    )


def sort_dropdowns(schemas: List[Dict[str, Any]]):
    for schema in schemas:
        if schema.get("preset", "") == "select":
            if schema.get("field_name") == "spatial":
                schema["choices"].sort(key=sort_location)
            else:
                schema["choices"].sort(key=sort_by_label)


def sort_dataset_fields(dataset_fields: List[Dict[str, Any]]):
    order = [
        "owner_org",
        "title_translated",
        "name",
        "notes_translated",
        "metadata_language",
        "frequency",
        "mobility_theme",
        "mobility_theme_sub",
        "spatial",
        "version",
        "version_notes_translated",
    ]
    dataset_fields.sort(key=partial(sort_by_field_name, order))
    sort_dropdowns(dataset_fields)


def sort_resource_fields(resource_fields: List[Dict[str, Any]]):
    order = [
        "url",
        "name_translated",
        "description_translated",
        "format",
        "mobility_data_standard_schema",
        "mobility_data_standard_version",
        "rights_type",
        "license_id",
    ]
    resource_fields.sort(key=partial(sort_by_field_name, order))
    sort_dropdowns(resource_fields)


def fields_from_aggregator(
    cps: ClassPropertiesAggregator, ds: Dataset, graph_namespace: URIRef
) -> List:
    clazz = cps.clazz
    return ClassConverter.convert(clazz, ds)


def resource_fields(ds: Dataset) -> List:
    distribution = RDFSClass.from_ds(DCAT.Distribution, ds)

    ckan_defaults = {DCTERMS.license, DCTERMS.title, DCTERMS.description}

    distribution_fields_to_omit = (
        Distribution.recommended_properties | Distribution.optional_properties
    ) - ckan_defaults

    resource_fields = ClassConverter.convert(
        distribution,
        ds,
        omit={
            DCAT.Distribution: distribution_fields_to_omit,
            DCTERMS.RightsStatement: RightsStatement.recommended_properties,
        },
    )

    # append custom field needed to store format iri in ckan
    resource_fields.append(
        {
            "field_name": "format_iri",
            "required": False,
            "form_snippet": None,
            "validators": "set_format_iri",
        }
    )

    sort_resource_fields(resource_fields)

    return resource_fields


def dataset_fields(ds: Dataset) -> List:
    catalog_record = RDFSClass.from_ds(DCAT.CatalogRecord, ds)

    dataset_fields_schema_map = ClassConverter.convert(
        catalog_record,
        ds,
        omit={
            DCAT.Distribution: "all",
            # Dataset publisher is set to the organization
            DCAT.Dataset: {DCTERMS.publisher},
        },
    )

    dataset_fields_required_by_ckan = [
        {
            "field_name": "owner_org",
            "label": "Organization",
            "preset": "dataset_organization",
            "required": True,
        },
        {
            "field_name": "name",
            "label": "URL",
            "preset": "dataset_slug",
            "form_placeholder": "eg. my-dataset",
            "required": True,
        },
    ]

    dataset_fields = dataset_fields_required_by_ckan + dataset_fields_schema_map

    sort_dataset_fields(dataset_fields)

    return dataset_fields
