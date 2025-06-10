import json
import logging
from typing import Any, Callable, TypeVar, Type

import phonenumbers
from ckan.common import _
from ckan.logic import get_action, ValidationError
from ckan.types import Context
from ckan.model.package import Package
from sqlalchemy import exists

from ckanext.digitraffic_theme.model.mobility_theme import (
    MobilityTheme,
    MobilityThemeSub,
    is_valid_mobility_theme_sub,
    is_valid_mobility_theme,
)
from ckanext.digitraffic_theme.model.spatial_reference import SpatialReference
from ckanext.digitraffic_theme.model.frequency import Frequency
from ckanext.digitraffic_theme.model.vocabulary import Vocabulary
from ckanext.digitraffic_theme.model.transport_mode import TransportMode
from ckanext.digitraffic_theme.model.theme import Theme
from ckanext.digitraffic_theme.model.location import Location
from ckanext.digitraffic_theme.model.language import Language
from ckanext.digitraffic_theme.model.country import Country
from ckanext.digitraffic_theme.model.georeferencing_method import GeoreferencingMethod
from ckanext.digitraffic_theme.model.network_coverage import NetworkCoverage
from ckanext.digitraffic_theme.model.intended_information_service import (
    IntendedInformationService,
)


logger = logging.getLogger(__name__)


def mobility_theme_sub_validator(key, data, errors, context):
    if data.get(key):
        mobility_theme_sub = MobilityThemeSub(data.get(key))
        mobility_theme = MobilityTheme(data[("mobility_theme",)])
        if is_valid_mobility_theme_sub(mobility_theme, mobility_theme_sub):
            return data
        else:
            raise ValidationError(_("Invalid value of mobility theme sub category"))
    return data


def mobility_theme_validator(value: Any, context: Context):
    if value:
        if is_valid_mobility_theme(MobilityTheme(value)):
            return value
        else:
            raise ValidationError(_("Invalid value of mobility theme category"))
    return value


def phone_number_validator(value: Any, context: Context):
    if value:
        try:
            phone_number = phonenumbers.parse(value)
            is_valid = phonenumbers.is_valid_number(phone_number)
            if is_valid:
                return phonenumbers.format_number(
                    phone_number, phonenumbers.PhoneNumberFormat.INTERNATIONAL
                )
        except:
            is_valid = False
        if not is_valid:
            raise ValidationError(
                _(
                    "Phone number is not in a valid format. Make sure it starts with a valid country code. e.g. +358"
                )
            )
    return value


def vocabulary_validator(value: Any, _class: type):
    if value:
        if issubclass(_class, Vocabulary) and _class.is_known_iri(value):
            return value
        else:
            raise ValidationError(
                _("{value} does not belong to {namespace}").format(
                    value=value, namespace=_class.namespace
                )
            )
    return value


def spatial_reference_validator(value: Any, context: Context):
    if value:
        if not SpatialReference.is_known_iri(value):
            value_with_prefix = str(SpatialReference.namespace[value])
            if SpatialReference.is_known_iri(value_with_prefix):
                return value_with_prefix
            raise ValidationError(_("Given spatial reference is not supported"))
    return value

ValueType = TypeVar("ValueType")

def multiple_values_converter(validator: Callable[[Type[ValueType], ...], Any], value: list[Type[ValueType]] | str, *args, **kwargs):
    if not value:
        return value
    def json_to_list(value: str) -> list[Type[ValueType]]:
        if isinstance(value, str):
            # If the value is a string, assume it to be a JSON list
            try:
                value = json.loads(value)
                return [
                    validator(item, *args, **kwargs)
                    for item
                    in value
                ]
            except json.JSONDecodeError:
                raise ValidationError(_("Value must be a JSON list"))
        raise ValidationError(_("Value must be a JSON list"))
    def list_to_json(value: list[Type[ValueType]]) -> str:
        return json.dumps([
            validator(item, *args, **kwargs)
            for item
            in value
        ])
    # determine which converter to use and call it
    if isinstance(value, str):
        return json_to_list(value)
    if isinstance(value, list):
        return list_to_json(value)
    raise ValidationError(_("Value must either be a JSON list (str) or a list"))

def value_to_list(value: Any):
    if isinstance(value, list):
        return value
    elif value is None:
        return None
    elif value == "":
        return ""
    return [value]

def frequency_validator(value: Any, context: Context):
    return vocabulary_validator(value,Frequency)


def transport_mode_validator(value: Any, context: Context):
    return vocabulary_validator(value, TransportMode)


def theme_validator(value: Any, context: Context):
    return vocabulary_validator(value, Theme)


def location_validator(value: Any, context: Context):
    return vocabulary_validator(value, Location)


def language_validator(value: Any, context: Context):
    return vocabulary_validator(value, Language)


def georeferencing_method_validator(value: Any, context: Context):
    return vocabulary_validator(value, GeoreferencingMethod)


def network_coverage_validator(value: Any, context: Context):
    return vocabulary_validator(value, NetworkCoverage)


def intended_information_service_validator(value: Any, context: Context):
    return vocabulary_validator(value, IntendedInformationService)


def country_validator(value: Any, context: Context):
    return vocabulary_validator(value, Country)

def single_is_referenced_by_validator(value: str, context: Context):
    return value


def is_referenced_by_validator(value: Any, context: Context):
    package = context.get("package", None)
    # not doing this will result in is_referenced_by being reset for the
    # currently edited dataset on form submit (because form data for the field will always be empty)
    if package and value is None:
        package_details = get_action("package_show")(
            context,
            {"id": package.id},
        )

        value = package_details.get("is_referenced_by", None)
    return multiple_values_converter(single_is_referenced_by_validator, value, context)

def related_resource_validator(value: str, context: Context):
    """
    Validate a related resource.

    It should be a valid id of a dataset that is referenced by the current dataset. The
    referenced dataset should already exist in the database.
    """
    session = context.get("session")
    if not session:
        raise ValidationError(_("Session is required for related resource validation."))
    if not value:
        raise ValidationError(_("Related resource id cannot be empty."))
    if not session.query(exists().select_from(Package).where(Package.id == value)).scalar():
        raise ValidationError(
            _(
                "Related resource with id {value} does not exist or is not a valid dataset."
            ).format(value=value)
        )
    return value


def dataset_reference_validator(value: Any, context: Context):
    return multiple_values_converter(related_resource_validator, value, context)
