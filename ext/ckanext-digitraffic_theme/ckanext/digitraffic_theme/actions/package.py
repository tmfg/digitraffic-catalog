from typing import Callable
from ckan.types import ActionResult, Context, DataDict
import ckan.plugins.toolkit as toolkit
import uuid


@toolkit.chained_action
def package_create(
    original_action: Callable, context: Context, data_dict: DataDict
) -> ActionResult.PackageCreate:
    package_id = uuid.uuid4()
    data_dict["id"] = package_id
    data_dict["title"] = data_dict["title_translated-en"]
    data_dict["name"] = f"{package_id}-{data_dict['title_translated-en']}"
    package = original_action(context, data_dict)
    return package
