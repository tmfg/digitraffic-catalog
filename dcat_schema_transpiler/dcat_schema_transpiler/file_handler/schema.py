from __future__ import annotations

from functools import partial
from typing import List, Dict, Any

from rdflib import Dataset, URIRef
import pprint
import os
import yaml

from mobility_dcat_ap_to_schema import MobilityDCATAPToSchema


def sort_by_field_name(order_list: List[str], field: Dict[str, Any]):
    try:
        return order_list.index(field['field_name'])
    except:
        return 9999

def sort_by_label(field: Dict[str, Any]):
    return field["label"]

def sort_location(field: Dict[str, Any]):
    return (0 if 'http://data.europa.eu/nuts/code' in field["value"] else 1, field["label"])

def sort_dropdowns(schemas: List[Dict[str, Any]]):
    for schema in schemas:
        if schema.get("preset", "") == "select":
            if schema.get("field_name") == "spatial":
                schema["choices"].sort(key=sort_location)
            else:
                schema["choices"].sort(key=sort_by_label)

def sort_dataset_fields(dataset_fields: List[Dict[str, Any]]):
    order = ['owner_org', 'name', 'notes', 'metadata_language',  'frequency', 'mobility_theme',
             'mobility_theme_sub', 'spatial']
    dataset_fields.sort(key=partial(sort_by_field_name, order))
    sort_dropdowns(dataset_fields)


def sort_resource_fields(resource_fields: List[Dict[str, Any]]):
    order = ['url', 'format', 'mobility_data_standard_schema', 'mobility_data_standard_version', 'rights_type']
    resource_fields.sort(key=partial(sort_by_field_name, order))
    sort_dropdowns(resource_fields)


def rdf_to_yaml(ds: Dataset):
    resource_fields = MobilityDCATAPToSchema.resource_fields(ds)
    dataset_fields_schema_map = MobilityDCATAPToSchema.dataset_fields(ds)
    dataset_fields_required_by_ckan = [
        {"field_name": "owner_org",
         "label": "Organization",
         "preset": "dataset_organization",
         "required": True},
        {"field_name": "name",
         "label": "URL",
         "preset": "dataset_slug",
         "required": True}
    ]
    dataset_fields = dataset_fields_required_by_ckan + dataset_fields_schema_map
    sort_dataset_fields(dataset_fields)
    sort_resource_fields(resource_fields)
    schema_map = {
        "scheming_version": 2,
        "dataset_type": "dataset",
        "dataset_fields": dataset_fields,
        "resource_fields": resource_fields
    }

    file_abspath = os.path.abspath("./output/schema.yaml")
    pprint.pprint(f'Creating file {file_abspath}')
    file_dirname = os.path.dirname(file_abspath)
    if not os.path.isdir(file_dirname):
        os.makedirs(file_dirname)
    with open(file_abspath, 'w') as schema_file:
        yaml.dump(schema_map, schema_file, encoding='utf-8', allow_unicode=True, default_flow_style=False,
                  sort_keys=False)
    return file_abspath
