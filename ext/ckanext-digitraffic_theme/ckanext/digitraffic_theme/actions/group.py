import ckan.plugins.toolkit as toolkit
from typing import Callable
from ckan.types import Context, DataDict, ActionResult


# Override group_create to drop extras (custom_fields in the templates) and image URLs
@toolkit.chained_action
def group_create(
    original_action: Callable, context: Context, data_dict: DataDict
) -> ActionResult.GroupCreate:
    if "extras" in data_dict:
        data_dict.pop("extras", None)
    if "image_url" in data_dict:
        data_dict.pop("image_url", None)

    return original_action(context, data_dict)


# Override group_update to drop extras (custom_fields in the templates) and image URLs
@toolkit.chained_action
def group_update(
    original_action: Callable, context: Context, data_dict: DataDict
) -> ActionResult.GroupUpdate:
    if "extras" in data_dict:
        data_dict.pop("extras", None)
    if "image_url" in data_dict:
        data_dict.pop("image_url", None)

    return original_action(context, data_dict)
