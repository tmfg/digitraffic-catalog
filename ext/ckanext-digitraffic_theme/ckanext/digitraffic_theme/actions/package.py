from typing import Callable
from ckan.types import ActionResult, Context, DataDict, Schema
import ckan.plugins.toolkit as toolkit
import uuid
import ckan.model as model
import ckan.lib.plugins as lib_plugins
import ckan.logic as logic
import logging
from ckan.plugins import get_plugin


log = logging.getLogger(__name__)

_CREATE_KEY_VALUE = str(uuid.uuid4())


@toolkit.chained_action
def package_update(
    original_action: Callable, context: Context, data_dict: DataDict
) -> ActionResult.PackageUpdate:
    # prevent user from updating 'name' (in practice the url) of package
    if (context.get("create_in_process") != _CREATE_KEY_VALUE and
        "name" in data_dict):
        del data_dict["name"]
    return original_action(context, data_dict)


@toolkit.chained_action
def package_patch(
    original_action: Callable, context: Context, data_dict: DataDict
) -> ActionResult.PackagePatch:
    # prevent user from updating 'name' (in practice the url) of package
    if (context.get("create_in_process") != _CREATE_KEY_VALUE and
        "name" in data_dict):
        del data_dict["name"]
    return original_action(context, data_dict)


@toolkit.chained_action
def package_create(
    original_action: Callable, context: Context, data_dict: DataDict
) -> ActionResult.PackageCreate:
    """
    This overrides the default package_create action to generate an UUID and use it as the value
    of both 'id' and 'name' (in practice the URL identifier of the dataset).
    First we validate the dataset using the validation function of the extension ckanext-scheming.
    If validation passes, assign id and call original package_create.

    Since we create the id and name ourselves, passing them on to the original action along
    with an invalid data_dict will lead to issues. That is why validation is required also here.
    If the dataset creation form is submitted with corrected data after receiving validation errors,
    _and id or name exists_, package_update will be called instead of package_create.
    In this case, the corresponding package will not be found since it will not have been saved
    in the database yet. This makes it impossible to submit the dataset after
    validation errors, so we validate here first.
    """
    tmp_name = str(uuid.uuid4())
    data_dict["name"] = tmp_name
    context["defer_commit"] = True
    context["create_in_process"] = _CREATE_KEY_VALUE

    saved_data = original_action(context, data_dict)

    toolkit.get_action('package_patch')(context, {
        "id": saved_data["id"],
        "name": saved_data["id"]
    })
    saved_data["name"] = saved_data["id"]
    del context["create_in_process"]
    model.repo.commit()
    context["defer_commit"] = False
    return saved_data
