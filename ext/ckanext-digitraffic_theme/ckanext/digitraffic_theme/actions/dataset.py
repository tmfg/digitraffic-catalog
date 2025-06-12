import json
from sqlalchemy import cast
from sqlalchemy.dialects.postgresql import JSONB
from ckan.types import AlchemySession, Context
from ckan.plugins.toolkit import get_action
from ckan.model.package import Package
from ckan.model.package_extra import PackageExtra

def get_old_related_resource_ids(dataset_id: str, session: AlchemySession) -> set:
    """
    Get the old related dataset ids for a dataset.
    """
    referring_dataset_ids = (session.query(Package)
                             .with_entities(Package.id)
                             .join(PackageExtra, (Package.id == PackageExtra.package_id))
                             .filter(
        PackageExtra.key == "is_referenced_by",
        cast(PackageExtra.value, JSONB).has_key(dataset_id)
    )
                             .all())

    if not referring_dataset_ids:
        return set()
    return set([row[0] for row in referring_dataset_ids])

def _existing_is_referenced_by(session: AlchemySession, related_resource_id: str) -> AlchemySession.query:
    is_referenced_by_row = (session.query(PackageExtra)
    .with_entities(PackageExtra.value)
    .filter(
        PackageExtra.package_id == related_resource_id,
        PackageExtra.key == "is_referenced_by"
    )
    .first())
    if not is_referenced_by_row:
        return None
    return json.loads(is_referenced_by_row[0])

def _update_is_referenced_by(context: Context, related_resource_id: str, new_is_referenced_by: list[str]):
    """
    Update the is_referenced_by for the referred dataset.

    Using package_update action to update the is_referenced_by field as it updates caches, does validation and more
    """
    referred_dataset = get_action("package_show")(
        context,
        {"id": related_resource_id},
    )
    referred_dataset["is_referenced_by"] = new_is_referenced_by
    get_action("package_update")(context, referred_dataset)

def add_reference_to_referred_dataset(context: Context, dataset_id: str, related_resource_id: str, session: AlchemySession):
    """
    Add a reference to the referred dataset.
    """
    existing_is_referenced_by = _existing_is_referenced_by(session, related_resource_id)
    if existing_is_referenced_by:
        referenced_by = existing_is_referenced_by
    else:
        referenced_by = []
    referenced_by.append(dataset_id)
    _update_is_referenced_by(context, related_resource_id, referenced_by)

def remove_reference_from_referred_dataset(context: Context, dataset_id: str, related_resource_id: str, session: AlchemySession):
    """
    Remove a reference from the referred dataset.
    """
    existing_is_referenced_by = _existing_is_referenced_by(session, related_resource_id)
    if existing_is_referenced_by:
        if dataset_id in existing_is_referenced_by:
            _update_is_referenced_by(context, related_resource_id, [ref for ref in existing_is_referenced_by if ref != dataset_id])

def handle_related_resource_upsert(dataset_id: str, related_resources: list[str], context: Context):
    """
    Handle the related resources state in the database.

    When some dataset references other datasets, by using the related_resource field,
    we also need to update the is_referenced_by field of the referred datasets.
    """
    session = context["session"]

    old_related_resources = get_old_related_resource_ids(dataset_id, session)
    new_related_resources = set(related_resources)
    related_resources_to_add = new_related_resources - old_related_resources
    related_resources_to_remove = old_related_resources - new_related_resources

    for related_resource in related_resources_to_add:
        add_reference_to_referred_dataset(context, dataset_id, related_resource, session)

    for related_resource in related_resources_to_remove:
        remove_reference_from_referred_dataset(context, dataset_id, related_resource, session)
