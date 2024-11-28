from typing import Any

from ckan.types import Context
from ckan.lib.navl.dictization_functions import Invalid
from ckan.common import _

from ckanext.digitraffic_theme.model.mobility_theme import MobilityTheme, MobilityThemeSub, is_valid_mobility_theme_sub
from ckanext.digitraffic_theme.model.spatial_reference import SpatialReference
import phonenumbers


def mobility_theme_sub_validator(key, data, errors, context):
    if data.get(key):
        mobility_theme_sub = MobilityThemeSub(data.get(key))
        mobility_theme = MobilityTheme(data[('mobility_theme',)])
        return is_valid_mobility_theme_sub(mobility_theme, mobility_theme_sub)
    return True


def phone_number_validator(value: Any, context: Context):
    if value:
        try:
            phone_number = phonenumbers.parse(value)
            is_valid = phonenumbers.is_valid_number(phone_number)
            if is_valid:
                return phonenumbers.format_number(phone_number, phonenumbers.PhoneNumberFormat.INTERNATIONAL)
        except:
            is_valid = False
        if not is_valid:
            raise Invalid(_('Phone number is not in a valid format. Make sure it starts with a valid country code. e.g. +358'))
    return value


def spatial_reference_validator(value: Any, context: Context):
    if value:
        if not SpatialReference.is_known_iri(value):
            value_with_prefix = str(SpatialReference.namespace[value])
            if SpatialReference.is_known_iri(value_with_prefix):
                return value_with_prefix
            raise Invalid(_('Given spatial reference is not supported'))
    return value
