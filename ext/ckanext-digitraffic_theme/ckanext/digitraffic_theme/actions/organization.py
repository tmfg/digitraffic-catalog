import ckan.plugins.toolkit as toolkit
from typing import Callable
from ckan.types import Context, DataDict, ActionResult


# Override organization_create to drop extras (custom_fields in the templates) and image URLs
@toolkit.chained_action
def organization_create(
    original_action: Callable, context: Context, data_dict: DataDict
) -> ActionResult.OrganizationCreate:
    if "extras" in data_dict:
        data_dict.pop("extras", None)
    if "image_url" in data_dict:
        data_dict["image_url"] = ""

    return original_action(context, data_dict)


# Override organization_update to drop extras (custom_fields in the templates) and image URLs
@toolkit.chained_action
def organization_update(
    original_action: Callable, context: Context, data_dict: DataDict
) -> ActionResult.OrganizationUpdate:
    if "extras" in data_dict:
        data_dict.pop("extras", None)
    if "image_url" in data_dict:
        data_dict["image_url"] = ""

    return original_action(context, data_dict)
