from __future__ import annotations

from typing import Dict

import pprint
import os
import yaml

from mobility_dcat_ap.dataset import create_dataset
from mobility_dcat_ap_to_schema import schema


def schema_to_file(schema_map: Dict):
    file_abspath = os.path.abspath("./output/schema.yaml")
    pprint.pprint(f"Creating file {file_abspath}")
    file_dirname = os.path.dirname(file_abspath)
    if not os.path.isdir(file_dirname):
        os.makedirs(file_dirname)
    with open(file_abspath, "w") as schema_file:
        yaml.dump(
            schema_map,
            schema_file,
            encoding="utf-8",
            allow_unicode=True,
            default_flow_style=False,
            sort_keys=False,
        )
    return file_abspath


ds = create_dataset()
schema_map = schema(ds)
schema_to_file(schema_map)
