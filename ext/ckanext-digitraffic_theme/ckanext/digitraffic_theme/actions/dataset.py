from ckan.types import AlchemySession, Context
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
        PackageExtra.value == dataset_id
    )
                             .all())

    if not referring_dataset_ids:
        return set()
    return set([row[0] for row in referring_dataset_ids])

def add_reference_to_referred_dataset(dataset_id: str, related_resource_id: str, session: AlchemySession):
    """
    Add a reference to the referred dataset.
    """
    (session.add(PackageExtra(
        package_id = related_resource_id,
        key = "is_referenced_by",
        value = dataset_id
    )))

def remove_reference_from_referred_dataset(dataset_id: str, related_resource_id: str, session: AlchemySession):
    """
    Remove a reference from the referred dataset.
    """
    extra_to_remove = (session.query(PackageExtra)
                       .filter(
        PackageExtra.package_id == related_resource_id,
        PackageExtra.key == "is_referenced_by",
        PackageExtra.value == dataset_id
                       )
                       .first())
    if extra_to_remove:
        session.delete(extra_to_remove)

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
        add_reference_to_referred_dataset(dataset_id, related_resource, session)

    for related_resource in related_resources_to_remove:
        remove_reference_from_referred_dataset(dataset_id, related_resource, session)