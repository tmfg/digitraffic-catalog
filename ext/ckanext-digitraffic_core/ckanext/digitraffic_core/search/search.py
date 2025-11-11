import os
import yaml
import json

DATASET_FIELDS_WITH_REPEATING_SUBFIELDS = [
    "contact_point",
    "assessment",
    "rights_holder",
]
DATASET_FIELDS_WITH_INDEXABLE_LABELS = [
    "mobility_theme",
    "mobility_theme_sub",
    "theme",
    "transport_mode",
    "spatial",
    "language",
    "georeferencing_method",
    "network_coverage",
    "intended_information_service",
]
RESOURCE_FIELDS_WITH_INDEXABLE_LABELS = [
    "data_grammar",
    "mobility_data_standard",
    "rights_type",
]
INDEXABLE_MULTILINGUAL_RESOURCE_FIELDS = [
    "data_service_title_translated",
    "description_translated",
    "data_service_description_translated",
    "name_translated",
    "data_format_notes_translated",
]


current_dir = os.path.dirname(__file__)
yaml_path = os.path.join(current_dir, "..", "schemas/mobility_dcat.yaml")

with open(yaml_path, "r") as file:
    schema = yaml.safe_load(file)


def find_dataset_field(schema, field_name):
    for field in schema.get("dataset_fields", []):
        if field.get("field_name") == field_name:
            return field
    return None


def find_resource_field(schema, field_name):
    for field in schema.get("resource_fields", []):
        if field.get("field_name") == field_name:
            return field
    return None


def before_dataset_index(data_dict):
    data = json.loads(data_dict["validated_data_dict"])
    # For indexing purposes, join the texts of repeating subfields into a single string
    # under the key of the containing field. CKAN's default indexing code expects extra
    # fields to contain simple string values which means that indexing will fail
    # if the dict values are left as is.
    for field in DATASET_FIELDS_WITH_REPEATING_SUBFIELDS:
        if field in data.keys():
            field_texts = set()
            for entry in data[field]:
                for key, value in entry.items():
                    if value and isinstance(value, str):
                        field_texts.add(value)
            data_dict[field] = "\n".join(field_texts)
    # Some fields get their range of values from controlled vocabularies, in
    # which case the value stored in the database is the URL of a term
    # in the vocabulary. However, we want to store the label used for this
    # term on the metadata forms in the search index to produce appropriate
    # search results. There are labels for each language, store them all in the
    # index.
    for field in DATASET_FIELDS_WITH_INDEXABLE_LABELS:
        if field in data.keys():
            field_texts = set()
            schema_field = find_dataset_field(schema, field)
            choices = schema_field.get("choices") if schema_field else []
            for choice in choices:
                if choice["value"] == data[field]:
                    for language in choice["label"]:
                        field_texts.add(choice["label"][language])
            # Fields matching the pattern extras_* will get copied to the general search index.
            data_dict[f"extras_{field}"] = "\n".join(field_texts)
    # index dataset resources
    for resource in data["resources"]:
        # extra fields for resources are not properly indexed by CKAN, do it here
        for field in INDEXABLE_MULTILINGUAL_RESOURCE_FIELDS:
            if field in resource.keys():
                field_texts = set()
                value = resource[field]
                if isinstance(value, str):
                    try:
                        value = json.loads(value)
                    except Exception:
                        value = {}
                if isinstance(value, dict):
                    for language in value:
                        field_texts.add(value[language])
                # Fields matching the pattern res_extras_* will get copied to the general search index.
                # A multi-valued dynamic field is also defined in the Solr schema for fields
                # matching this pattern. Multi-valued means that an array can be given as the value.
            data_dict[f"res_extras_{field}"] = list(field_texts)
        # do same thing here for resource fields with indexable labels as above with dataset fields
        for field in RESOURCE_FIELDS_WITH_INDEXABLE_LABELS:
            if field in resource.keys():
                field_texts = set()
                schema_field = find_resource_field(schema, field)
                choices = schema_field.get("choices") if schema_field else []
                for choice in choices:
                    if choice["value"] == resource[field]:
                        for language in choice["label"]:
                            field_texts.add(choice["label"][language])
                # Fields matching the pattern res_extras_* will get copied to the general search index.
                # A multi-valued dynamic field is also defined in the Solr schema for fields
                # matching this pattern. Multi-valued means that an array can be given as the value.
                data_dict[f"res_extras_{field}"] = list(field_texts)
    return data_dict
