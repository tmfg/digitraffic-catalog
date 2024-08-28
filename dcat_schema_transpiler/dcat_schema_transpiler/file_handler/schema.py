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


def sort_dataset_fields(dataset_fields: List[Dict[str, Any]]):
    order = ['owner_org', 'name', 'notes', 'metadata_language', 'mobility_theme',
             'mobility_theme_sub', 'frequency']
    dataset_fields.sort(key=partial(sort_by_field_name, order))


def sort_resource_fields(resource_fields: List[Dict[str, Any]]):
    order = ['url', 'format', 'mobility_data_standard_schema', 'mobility_data_standard_version', 'rights_type']
    resource_fields.sort(key=partial(sort_by_field_name, order))


def rdf_to_yaml(ds: Dataset):
    resource_fields = MobilityDCATAPToSchema.resource_fields(ds)
    dataset_fields_schema_map = MobilityDCATAPToSchema.dataset_fields(ds)
    dataset_fields_required_by_ckan = [
        {"field_name": "owner_org",
         "label": "Organization",
         "preset": "dataset_organization"}
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
