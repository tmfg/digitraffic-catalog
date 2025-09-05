import json
import logging
from typing import Any, Callable, TypeVar, Type

import phonenumbers
from ckan.common import _
from ckan.types import Context
from ckan.model.package import Package
from sqlalchemy import exists

from ckanext.scheming.helpers import scheming_get_dataset_schema, scheming_field_by_name

from ckanext.digitraffic_theme.model.mobility_theme import (
    MobilityTheme,
    MobilityThemeSub,
    is_valid_mobility_theme_sub,
    is_valid_mobility_theme,
)
from ckanext.digitraffic_theme.model.spatial_reference import SpatialReference
from ckanext.digitraffic_theme.model.frequency import Frequency
from ckanext.digitraffic_theme.model.schema_choice_vocabulary import (
    SchemaChoiceVocabulary,
)
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
import ckan.plugins.toolkit as toolkit


logger = logging.getLogger(__name__)


def mobility_theme_sub_validator(key, data, errors, context):
    if data.get(key):
        mobility_theme_sub = MobilityThemeSub(data.get(key))
        mobility_theme = MobilityTheme(data[("mobility_theme",)])
        if is_valid_mobility_theme_sub(mobility_theme, mobility_theme_sub):
            return data
        else:
            raise toolkit.Invalid(_("Invalid value of mobility theme sub category"))
    return data


def mobility_theme_validator(value: Any, context: Context):
    if value:
        if is_valid_mobility_theme(MobilityTheme(value)):
            return value
        else:
            raise toolkit.Invalid(_("Invalid value of mobility theme category"))
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
            raise toolkit.Invalid(
                _(
                    "Phone number is not in a valid format. Make sure it starts with a valid country code. e.g. +358"
                )
            )
    return value


def vocabulary_validator(value: Any, _class: type):
    def iris_are_valid(iri_or_iris: Any, _class: type) -> bool:
        values = iri_or_iris if isinstance(iri_or_iris, (list, set)) else [iri_or_iris]
        return all(_class.is_known_iri(iri) for iri in values)

    if value:
        if issubclass(_class, SchemaChoiceVocabulary) and iris_are_valid(value, _class):
            return value
        else:
            schema = scheming_get_dataset_schema("dataset")
            field = scheming_field_by_name(
                schema["resource_fields"], "mobility_data_standard"
            )
            logger.info(
                _("{value} of type {type} does not belong to {namespace}").format(
                    value=value, type=type(value), namespace=_class.namespace
                )
            )
            raise toolkit.Invalid(
                _("Provided value does not belong to {namespace}").format(
                    namespace=field["label"]["fi"], value=value, type=type(value)
                )
            )
    return value


def spatial_reference_validator(value: Any, context: Context):
    if value:
        if not SpatialReference.is_known_iri(value):
            value_with_prefix = str(SpatialReference.namespace[value])
            if SpatialReference.is_known_iri(value_with_prefix):
                return value_with_prefix
            raise toolkit.Invalid(
                _("Provide a valid EPSG number between 2000 and 69036405")
            )
    return value


ValueType = TypeVar("ValueType")


def multiple_values_converter(
    validator: Callable[[Type[ValueType], ...], Any],
    value: list[Type[ValueType]] | str,
    *args,
    **kwargs
):
    if not value:
        return value

    def json_to_list(value: str) -> list[Type[ValueType]]:
        if isinstance(value, str):
            # If the value is a string, assume it to be a JSON list
            try:
                value = json.loads(value)
                return [validator(item, *args, **kwargs) for item in value]
            except json.JSONDecodeError:
                raise toolkit.Invalid(_("Value must be a JSON list"))
        raise toolkit.Invalid(_("Value must be a JSON list"))

    def list_to_json(value: list[Type[ValueType]]) -> str:
        return json.dumps([validator(item, *args, **kwargs) for item in value])

    # determine which converter to use and call it
    if isinstance(value, str):
        return json_to_list(value)
    if isinstance(value, list):
        return list_to_json(value)
    raise toolkit.Invalid(_("Value must either be a JSON list (str) or a list"))


def value_to_list(value: Any):
    if isinstance(value, list):
        return value
    elif value is None:
        return None
    elif value == "":
        return ""
    return [value]


def frequency_validator(value: Any, context: Context):
    return vocabulary_validator(value, Frequency)


def transport_mode_validator(value: Any, context: Context):
    def validator(val, *args):
        return vocabulary_validator(val, TransportMode)

    return multiple_values_converter(validator, value, context)


def theme_validator(value: Any, context: Context):
    return vocabulary_validator(value, Theme)


def location_validator(value: Any, context: Context):
    def validator(val, *args):
        return vocabulary_validator(val, Location)

    return multiple_values_converter(validator, value, context)


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
        package_details = toolkit.get_action("package_show")(
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
        raise toolkit.Invalid(_("Session is required for related resource validation."))
    if not value:
        raise toolkit.Invalid(_("Related resource id cannot be empty."))
    if not session.query(
        exists().select_from(Package).where(Package.id == value)
    ).scalar():
        raise toolkit.Invalid(
            _(
                "Related resource with id {value} does not exist or is not a valid dataset."
            ).format(value=value)
        )
    return value


def dataset_reference_validator(value: Any, context: Context):
    return multiple_values_converter(related_resource_validator, value, context)
