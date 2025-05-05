from typing import Callable
from ckan.types import ActionResult, Context, DataDict, Schema
import ckan.plugins.toolkit as toolkit
import uuid
import ckan.model as model
import ckan.lib.plugins as lib_plugins
import ckan.logic as logic
import logging
from ckan.plugins import PluginImplementations, get_plugin
from ckanext.scheming.plugins import SchemingDatasetsPlugin


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
    in the database yet. This will make it impossible to submit the dataset after
    validation errors.
    """
    package_plugin = lib_plugins.lookup_package_plugin()
    scheming = get_plugin("scheming_datasets")
    schema: Schema = context.get("schema") or package_plugin.create_package_schema()
    data, errors = scheming.validate(context, data_dict, schema, "package_create")

    # this is copy-paste from the default package_create
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

    package_id = uuid.uuid4()
    data_dict["id"] = str(package_id)
    # the name/url of a dataset has been specified to follow the format {package_id}-{title in English}
    data_dict["name"] = f"{package_id}-{data_dict['title_translated-en']}"
    return original_action(context, data_dict)
