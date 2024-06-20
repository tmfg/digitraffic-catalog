from __future__ import annotations
from rdflib import Dataset, URIRef
import pprint
import os
import yaml

from mobility_dcat_ap_to_schema import MobilityDCATAPToSchema


def rdf_to_yaml(ds: Dataset):
    resource_fields_schema_map = MobilityDCATAPToSchema.resource_fields(ds)
    dataset_fields_schema_map = MobilityDCATAPToSchema.dataset_fields(ds)
    dataset_fields_required_by_ckan = [
        {"field_name": "owner_org",
         "label": "Organization",
         "preset": "dataset_organization"}
    ]
    schema_map = {
        "scheming_version": 2,
        "dataset_type": "dataset",
        "dataset_fields": dataset_fields_required_by_ckan + dataset_fields_schema_map,
        "resource_fields": resource_fields_schema_map
    }

    file_abspath = os.path.abspath("./output/schema.yaml")
    pprint.pprint(f'Creating file {file_abspath}')
    file_dirname = os.path.dirname(file_abspath)
    if not os.path.isdir(file_dirname):
        os.makedirs(file_dirname)
    with open(file_abspath, 'w') as schema_file:
        yaml.dump(schema_map, schema_file, encoding='utf-8', allow_unicode=True)
    return file_abspath