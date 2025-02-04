import json
import logging
from typing import Any

import phonenumbers
from ckan.common import _, config
from ckan.lib.navl.dictization_functions import Invalid
from ckan.logic import get_action
from ckan.types import Context
from ckanext.digitraffic_theme.model.mobility_theme import (
    MobilityTheme,
    MobilityThemeSub,
    is_valid_mobility_theme_sub,
)
from ckanext.digitraffic_theme.model.spatial_reference import SpatialReference

logger = logging.getLogger(__name__)


def mobility_theme_sub_validator(key, data, errors, context):
    if data.get(key):
        mobility_theme_sub = MobilityThemeSub(data.get(key))
        mobility_theme = MobilityTheme(data[("mobility_theme",)])
        return is_valid_mobility_theme_sub(mobility_theme, mobility_theme_sub)
    return True


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
            raise Invalid(
                _(
                    "Phone number is not in a valid format. Make sure it starts with a valid country code. e.g. +358"
                )
            )
    return value


def spatial_reference_validator(value: Any, context: Context):
    if value:
        if not SpatialReference.is_known_iri(value):
            value_with_prefix = str(SpatialReference.namespace[value])
            if SpatialReference.is_known_iri(value_with_prefix):
                return value_with_prefix
            raise Invalid(_("Given spatial reference is not supported"))
    return value


def is_referenced_by_validator(value: Any, context: Context):
    if value:
        return value

    package = context.get("package", None)

    # not doing this will result in is_referenced_by being reset for the
    # currently edited dataset on form submit (because form data for the field will always be empty)
    if package and not value:
        package_details = get_action("package_show")(
            context,
            {"id": package.id},
        )

        return package_details.get("is_referenced_by", None)

    return None


def remove_reference_from_referred_dataset(
    referring_id: str, referred_id: str, context: Context
):
    # get the details of the referred dataset
    referred_dataset = get_action("package_show")(
        context,
        {"id": referred_id},
    )
    reference_list = (
        json.loads(referred_dataset["is_referenced_by"])
        if referred_dataset.get("is_referenced_by")
        else None
    )

    # remove reference by given dataset if it was found
    if reference_list and referring_id in reference_list:
        logger.info(
            f"Removing reference by dataset id {referring_id} from dataset id {referred_id}"
        )
        reference_list.remove(referring_id)
        referred_dataset["is_referenced_by"] = json.dumps(reference_list)
        # commit the changes
        get_action("package_update")(context, referred_dataset)


def dataset_reference_validator(value: Any, context: Context):
    # get currently edited package from contect
    package = context.get("package", None)

    if package is None:
        return None

    # get dataset details
    referring_dataset = get_action("package_show")(
        context,
        {"id": package.id},
    )
    referred_id = referring_dataset.get("related_resource")

    # in this case related_resource was set to empty for currently edited dataset
    if not value:
        # a reference to another dataset exists if the below is true
        if referred_id and isinstance(referred_id, str):
            remove_reference_from_referred_dataset(package.id, referred_id, context)

    # in this case related_resource was given a value for currently edited dataset
    if value:
        # first check if there was a previous reference to a different dataset
        # if yes - remove old reference from referred dataset
        if referred_id and referred_id != value:
            remove_reference_from_referred_dataset(package.id, referred_id, context)

        referred_dataset = get_action("package_show")(
            context,
            {"id": value},
        )
        # dataset being referred to by the currently edited dataset already has a list of references
        if (
            package
            and referred_dataset.get("is_referenced_by")
            and isinstance(referred_dataset["is_referenced_by"], str)
        ):
            # values are saved to the database as strings of json lists but the output validator transforms these to strings
            # where the list elements are separated by line breaks
            reference_list = json.loads(referred_dataset["is_referenced_by"])

            if package.id in reference_list:
                pass
            elif package.id is not None:
                reference_list.append(package.id)
                referred_dataset["is_referenced_by"] = json.dumps(reference_list)
        # dataset being referred to by the currently edited dataset does not have previous references, create a new list
        else:
            referred_dataset["is_referenced_by"] = json.dumps([package.id])

        # commit the changes
        get_action("package_update")(context, referred_dataset)

    return value
