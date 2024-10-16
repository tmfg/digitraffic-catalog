import os

import ckan.plugins as plugins
import yaml
from ckan.plugins import SingletonPlugin

current_dir = os.path.dirname(__file__)
yaml_path = os.path.join(current_dir, "schemas/mobility_dcat.yaml")

with open(yaml_path, "r") as file:
    schema = yaml.safe_load(file)


def find_field(schema, field_name):
    for field in schema.get("resource_fields", []):
        if field.get("field_name") == field_name:
            return field
    return None


# get the IRI for the current format from the field "label_iri_map", which maps format labels to IRIs
# store it in CKAN extras under key "format_iri"
def set_format_iri(key, data, errors, context):
    format_value = data.get(("resources", 0, "format"))
    if format_value:
        format_iri = None
        format_field = find_field(schema, "format")
        if format_field:
            formats = format_field.get("label_iri_map", [])
            for _format in formats:
                if _format["label"] == format_value:
                    format_iri = _format["iri"]
        if format_iri:
            data[key] = format_iri
            return True
    return False


class DigitrafficValidators(SingletonPlugin):
    plugins.implements(plugins.IValidators)

    def get_validators(self):
        return {"set_format_iri": set_format_iri}
