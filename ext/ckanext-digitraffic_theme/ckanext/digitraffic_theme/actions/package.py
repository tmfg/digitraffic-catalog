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


@toolkit.chained_action
def package_create(
    original_action: Callable, context: Context, data_dict: DataDict
) -> ActionResult.PackageCreate:
    """
    We need to first validate the dataset using the validation function
    of the scheming extension.

    Since we create the id and name ourselves, passing them on to the original action along
    with an invalid data_dict will lead to issues.
    When the dataset creation form is submitted with corrected data after receiving validation errors,
    _and id or name exists_, package_update will be called instead of package_create.
    In this case, the corresponding package will not be found since it will not have been saved
    in the database yet. This makes it impossible to submit the dataset after
    validation errors, so we validate here first.
    """
    package_plugin = lib_plugins.lookup_package_plugin()
    scheming = get_plugin("scheming_datasets")
    schema: Schema = context.get("schema") or package_plugin.create_package_schema()

    # Both 'name' and 'id' use the same uuid. 'id' is assigned after validation - new packages should not have an id at this stage.
    package_name = uuid.uuid4()
    data_dict["name"] = str(package_name)

    data, errors = scheming.validate(context, data_dict, schema, "package_create")

    # This is copy-pasted from the default package_create so logging is consistent.
    log.debug(
        "package_create validate_errs=%r user=%s package=%s data=%r",
        errors,
        context.get("user"),
        data.get("name"),
        data_dict,
    )

    if errors:
        model.Session.rollback()
        raise logic.ValidationError(errors)

    # Both 'name' and 'id' use the same uuid.
    data_dict["id"] = str(package_name)

    return original_action(context, data_dict)
