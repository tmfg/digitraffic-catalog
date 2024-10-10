from __future__ import annotations

from rdflib import Dataset
import pprint
import os
import yaml

from mobility_dcat_ap_to_schema import resource_fields, dataset_fields


def rdf_to_yaml(ds: Dataset):

    schema_map = {
        "scheming_version": 2,
        "dataset_type": "dataset",
        "dataset_fields": dataset_fields(ds),
        "resource_fields": resource_fields(ds)
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
