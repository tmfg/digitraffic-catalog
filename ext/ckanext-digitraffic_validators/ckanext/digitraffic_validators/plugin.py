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


# set field format_iri for CKAN extras on the basis of current format label
def set_format_iri(key, data, errors, context):
    format_key = ("resources", 0, "format")
    format_value = data.get(format_key)
    if format_value:
        format_iri = None
        format_field = find_field(schema, "format")
        if format_field:
            format_choices = format_field.get("choices", [])
            for choice in format_choices:
                if choice["label"] == format_value:
                    format_iri = choice["iri"]
        if format_iri:
            data[key] = format_iri
            return True
    return False


class DigitrafficValidators(SingletonPlugin):
    plugins.implements(plugins.IValidators)

    def get_validators(self):
        return {"set_format_iri": set_format_iri}
