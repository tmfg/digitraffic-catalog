import json
import logging
from typing import Any

import phonenumbers
from ckan.common import _, config
from ckan.lib.navl.dictization_functions import Invalid
from ckan.logic import get_action
from ckan.types import Context
from ckanext.digitraffic_theme.helpers.helpers import is_dataset_public
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


def dataset_reference_validator(value: Any, context: Context):
    # get currently edited package from contect
    package = context.get("package", None)

    # in this case related_resource was set to empty for currently edited dataset
    if package and not value:

        # get dataset details
        referring_dataset = get_action("package_show")(
            context,
            {"id": package.id},
        )

        resource_reference = referring_dataset.get("related_resource")

        # a reference to another dataset exists if the below is true
        if resource_reference and isinstance(resource_reference, str):

            # the output validator for dataset references will transform the id into an url
            # where the last part of the path is the id
            referred_id = resource_reference.split("/")[-1]

            # get the details of the referred dataset
            referred_dataset = get_action("package_show")(
                context,
                {"id": referred_id},
            )
            reference_list = json.loads(referred_dataset["is_referenced_by"])

            # remove the previous reference if it was found
            if package.id in reference_list:
                logger.info(
                    f"Removing reference to dataset id {package.id} from dataset id {referred_id}"
                )
                reference_list.remove(package.id)
                referred_dataset["is_referenced_by"] = json.dumps(reference_list)
                # commit the changes
                get_action("package_update")(context, referred_dataset)

    # in this case related_resource was given a value for currently edited dataset
    if package and value:
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
            reference_list = referred_dataset["is_referenced_by"].split("\n")

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


def dataset_reference_output_validator(value: Any, context: Context):
    ckan_site_url = config.get("ckan.site_url", "").rstrip("/")
    # show reference to public datasets
    if is_dataset_public(value):
        return f"{ckan_site_url}/dataset/{value}"
    return ""


def dataset_referenced_by_output_validator(value: Any, context: Context):
    if value and isinstance(json.loads(value), list):
        ckan_site_url = config.get("ckan.site_url", "").rstrip("/")
        dataset_ids = json.loads(value)
        # show references made by public datasets
        # TODO: format strings in html templates to avoid string manipulation in validator functions
        public_datasets = [
            f"{ckan_site_url}/dataset/{dataset_id}"
            for dataset_id in dataset_ids
            if is_dataset_public(dataset_id)
        ]
        return "\n".join(public_datasets)
    return ""
