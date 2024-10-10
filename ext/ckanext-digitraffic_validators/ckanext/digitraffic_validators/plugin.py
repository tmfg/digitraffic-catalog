import os

import ckan.plugins as plugins
import yaml
from ckan.plugins import SingletonPlugin

current_dir = os.path.dirname(__file__)
yaml_path = os.path.join(current_dir, "mobility_dcat.yaml")

with open(yaml_path, "r") as file:
    schema = yaml.safe_load(file)


def find_field(schema, field_name):
    for field in schema.get("resource_fields", []):
        if field.get("field_name") == field_name:
            return field
    return None


# set value of field "format_label" based on the label of the current format in the yaml schema
def set_format_label(key, data, errors, context):
    format_value = data.get(key)
    if format_value:
        format_label = None
        format_field = find_field(schema, "format")
        if format_field:
            format_choices = format_field.get("choices", [])
            for choice in format_choices:
                if choice["value"] == format_value:
                    format_label = choice["label"]
        if format_label:
            data[key] = format_label
            return True
    return False


def set_format_iri(key, data, errors, context):
    format_value = data.get(("resources", 0, "format"))
    if format_value:
        format_iri = None
        format_field = find_field(schema, "format")
        if format_field:
            format_choices = format_field.get("choices", [])
            for choice in format_choices:
                if choice["value"] == format_value or choice["label"] == format_value:
                    format_iri = choice["value"]
        if format_iri:
            data[key] = format_iri
            return True
    return False


class DigitrafficValidators(SingletonPlugin):
    plugins.implements(plugins.IValidators)

    def get_validators(self):
        return {"set_format_label": set_format_label, "set_format_iri": set_format_iri}
