import os
import yaml

from typing import Any
from ckan.types import Context

from ckanext.digitraffic_theme.model.format import Format, is_valid_format_label
from ckanext.digitraffic_theme.model.data_grammar import DataGrammar
from ckanext.digitraffic_theme.model.mobility_data_standard import MobilityDataStandard
from ckanext.digitraffic_theme.model.communication_method import CommunicationMethod
from ckanext.digitraffic_theme.model.rights_type import RightsType
from ckanext.digitraffic_theme.model.character_encoding import CharacterEncoding
from ckanext.digitraffic_theme.model.standard_license import StandardLicense
from ckanext.digitraffic_theme.model.application_layer_protocol import (
    ApplicationLayerProtocol,
)


from ckanext.digitraffic_theme.validators.dataset_validators import vocabulary_validator

from ckan.lib.navl.dictization_functions import Invalid
from ckan.common import _
from ckan.logic import ValidationError


current_dir = os.path.dirname(__file__)
yaml_path = os.path.join(current_dir, "..", "schemas/mobility_dcat.yaml")

with open(yaml_path, "r") as file:
    schema = yaml.safe_load(file)


def find_field(schema, field_name):
    for field in schema.get("resource_fields", []):
        if field.get("field_name") == field_name:
            return field
    return None


def data_grammar_validator(value: Any, context: Context):
    return vocabulary_validator(value, DataGrammar)


def mobility_data_standard_validator(value: Any, context: Context):
    return vocabulary_validator(value, MobilityDataStandard)


def communication_method_validator(value: Any, context: Context):
    return vocabulary_validator(value, CommunicationMethod)


def rights_type_validator(value: Any, context: Context):
    return vocabulary_validator(value, RightsType)


def standard_license_validator(value: Any, context: Context):
    return vocabulary_validator(value, StandardLicense)


def application_layer_protocol_validator(value: Any, context: Context):
    return vocabulary_validator(value, ApplicationLayerProtocol)


def character_encoding_validator(value: Any, context: Context):
    if value:
        if CharacterEncoding.is_known_label(value):
            return value
        else:
            raise ValidationError(_(f"{value} is not a valid character encoding"))
    return value


# set field format_iri for resource on the basis of current format label if it passes validation
def set_format_iri(key, data, errors, context):
    if "resources" in key and len(key) > 1:
        format_key = ("resources", key[1], "format")
        format_value = data.get(format_key)
        if format_value:
            # validate format label
            if is_valid_format_label(format_value):
                format_iri = None
                format_field = find_field(schema, "format")
                if format_field:
                    format_choices = format_field.get("choices", [])
                    for choice in format_choices:
                        if choice["label"]["en"] == format_value:
                            format_iri = choice["iri"]
                if format_iri:
                    data[key] = format_iri
                    return True
            else:
                raise Invalid(_(f"Value does not belong to {Format.namespace}"))
    return False
