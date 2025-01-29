import os
import yaml


current_dir = os.path.dirname(__file__)
yaml_path = os.path.join(current_dir, "..", "schemas/mobility_dcat.yaml")

with open(yaml_path, "r") as file:
    schema = yaml.safe_load(file)


def find_field(schema, field_name):
    for field in schema.get("resource_fields", []):
        if field.get("field_name") == field_name:
            return field
    return None


# set field format_iri for resource on the basis of current format label
def set_format_iri(key, data, errors, context):
    if "resources" in key and len(key) > 1:
        format_key = ("resources", key[1], "format")
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
