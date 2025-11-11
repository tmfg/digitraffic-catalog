import ckan.plugins.toolkit as toolkit
from typing import Callable
from ckan.types import Context, DataDict, ActionResult


# Override user_create to drop image URLs
@toolkit.chained_action
def user_create(
    original_action: Callable, context: Context, data_dict: DataDict
) -> ActionResult.UserCreate:
    if "image_url" in data_dict:
        data_dict["image_url"] = ""

    return original_action(context, data_dict)


# Override user_update to drop image URLs
@toolkit.chained_action
def user_update(
    original_action: Callable, context: Context, data_dict: DataDict
) -> ActionResult.UserUpdate:
    if "image_url" in data_dict:
        data_dict["image_url"] = ""

    return original_action(context, data_dict)
