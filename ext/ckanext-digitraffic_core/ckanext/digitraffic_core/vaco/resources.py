from typing import Any, Iterator, Optional

from ckan import model
from ckan.plugins import toolkit
from ckan.types import Context

MOBILITY_DATA_STANDARD_FORMATS = {
    "https://w3id.org/mobilitydcat-ap/mobility-data-standard/gtfs": "gtfs",
    "https://w3id.org/mobilitydcat-ap/mobility-data-standard/netex": "netex",
    "https://w3id.org/mobilitydcat-ap/mobility-data-standard/gbfs": "gbfs",
}
GTFS_FILE_TYPE = "http://publications.europa.eu/resource/authority/file-type/GTFS"


def vaco_format(resource: dict[str, Any]) -> Optional[str]:
    """The format VACO validates the resource's feed as, or `None` when the resource is not sent."""
    standard_format = MOBILITY_DATA_STANDARD_FORMATS.get(
        resource.get("mobility_data_standard")
    )
    if standard_format:
        return standard_format
    # The file-type vocabulary has GTFS but no NeTEx or GBFS
    if resource.get("format_iri") == GTFS_FILE_TYPE or resource.get("format") == "GTFS":
        return "gtfs"
    return None


def feed_url(resource: dict[str, Any]) -> str:
    return resource.get("download_url") or resource["url"]


def public_datasets(context: Context) -> Iterator[dict[str, Any]]:
    """Every public dataset that is not deleted, as `package_show` returns it."""
    package_ids = [
        package_id
        for (package_id,) in model.Session.query(model.Package.id)
        .filter(
            model.Package.state == "active",
            model.Package.private.is_(False),
            model.Package.type == "dataset",
        )
        .order_by(model.Package.name)
    ]
    for package_id in package_ids:
        yield toolkit.get_action("package_show")(dict(context), {"id": package_id})
