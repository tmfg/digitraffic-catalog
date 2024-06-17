from __future__ import annotations
from rdflib import Dataset, URIRef
import pprint
import os
import yaml

from mobility_dcat_ap.namespace import MOBILITYDCATAP
from mobility_dcat_ap_to_schema import MobilityDCATAPToSchema
from rdfs.util import ClassPropertiesAggregator


def rdf_to_yaml(cp: ClassPropertiesAggregator, ds: Dataset):
    resource_fields_schema_map = MobilityDCATAPToSchema.fields_from_aggregator(cp, ds, URIRef(MOBILITYDCATAP._NS))
    dataset_fields_schema_map = [
        {"field_name": "title",
         "label": "Title",
         "preset": "title",
         "form_placeholder": "eg. A descriptive title"},

        {"field_name": "name",
         "label": "URL",
         "preset": "dataset_slug",
         "form_placeholder": "eg. my-dataset"},

        {"field_name": "notes",
         "label": "Description",
         "form_snippet": "markdown.html",
         "form_placeholder": "eg. Some useful notes about the data"},

        {"field_name": "tag_string",
         "label": "Tags",
         "preset": "tag_string_autocomplete",
         "form_placeholder": "eg. economy, mental health, government"},

        {"field_name": "license_id",
         "label": "License",
         "form_snippet": "license.html",
         "help_text": "License definitions and additional information can be found at http://opendefinition.org/"},

        {"field_name": "owner_org",
         "label": "Organization",
         "preset": "dataset_organization"},

        {"field_name": "url",
         "label": "Source",
         "form_placeholder": "http://example.com/dataset.json",
         "display_property": "foaf:homepage",
         "display_snippet": "link.html"},

        {"field_name": "version",
         "label": "Version",
         "validators": "ignore_missing unicode_safe package_version_validator",
         "form_placeholder": "1.0"},

        {"field_name": "author",
         "label": "Author",
         "form_placeholder": "Joe Bloggs",
         "display_property": "dc:creator"},

        {"field_name": "author_email",
         "label": "Author Email",
         "form_placeholder": "joe@example.com",
         "display_property": "dc:creator",
         "display_snippet": "email.html",
         "display_email_name_field": "author"},

        {"field_name": "maintainer",
         "label": "Maintainer",
         "form_placeholder": "Joe Bloggs",
         "display_property": "dc:contributor"},

        {"field_name": "maintainer_email",
         "label": "Maintainer Email",
         "form_placeholder": "joe@example.com",
         "display_property": "dc:contributor",
         "display_snippet": "email.html",
         "display_email_name_field": "maintainer"}
    ]
    schema_map = {
        "scheming_version": 2,
        "dataset_type": "dataset",
        "dataset_fields": dataset_fields_schema_map,
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