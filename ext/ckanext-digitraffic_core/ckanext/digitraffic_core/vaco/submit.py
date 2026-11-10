import logging
from dataclasses import dataclass
from datetime import datetime, timezone
from typing import Any

import requests
from ckan import model
from ckan.plugins import toolkit
from ckanext.digitraffic_core.identifiers.ytunnus import Ytunnus
from ckanext.digitraffic_core.orm_model.vaco_entry import VacoEntry
from ckanext.digitraffic_core.vaco.client import VacoApiError, VacoClient
from ckanext.digitraffic_core.vaco.resources import (
    feed_url,
    public_datasets,
    vaco_format,
)

log = logging.getLogger(__name__)

# netex.entur is sent without a codespace until the catalog's codespace is decided
# (docs/vaco-validation-plan.md, open item 4)
VALIDATION_RULES = {
    "gtfs": "gtfs.canonical",
    "netex": "netex.entur",
    "gbfs": "gbfs.entur",
}
SEND_FAILED = "send_failed"
FORMAT_NAMES = {"gtfs": "GTFS", "netex": "NeTEx", "gbfs": "GBFS"}


@dataclass(frozen=True)
class SubmitResult:
    sent: int
    failed: int
    skipped: int


def build_payload(
    package: dict[str, Any],
    resource: dict[str, Any],
    format: str,
    business_id: str,
) -> dict[str, Any]:
    # package.name is just a UUID, prefer human-readable name
    dataset_title = (package.get("title_translated") or {}).get("en") or package["name"]
    resource_title = (resource.get("name_translated") or {}).get("en") or resource["id"]
    # No `etag`: VACO skips the download when it equals the ETag of its previous entry for this resource,
    # so only the feed's current ETag would work, and the catalog does not ask the feed server for it.
    return {
        "url": feed_url(resource),
        "format": format,
        "name": f"{dataset_title} / {resource_title} / {FORMAT_NAMES[format]}",
        "businessId": business_id,
        "validations": [{"name": VALIDATION_RULES[format]}],
        "context": resource["id"],
    }


def submit_all(client: VacoClient) -> SubmitResult:
    """Send a validation request to VACO for every public GTFS, NeTEx and GBFS resource."""
    site_user = toolkit.get_action("get_site_user")({"ignore_auth": True}, {})
    context = {"user": site_user["name"], "ignore_auth": True}
    sent = failed = skipped = 0
    for package in public_datasets(context):
        organization = model.Group.get(package["owner_org"])
        business_id = organization.extras.get(Ytunnus.KEY) if organization else None
        for resource in package["resources"]:
            format = vaco_format(resource)
            if format is None:
                continue
            if not business_id:
                # VACO needs a Y-tunnus to know which company the feed belongs to
                log.warning(
                    "Not sending resource %s to VACO: organization %s has no Y-tunnus",
                    resource["id"],
                    package["owner_org"],
                )
                skipped += 1
                continue
            payload = build_payload(package, resource, format, business_id)
            if _submit(client, package, resource, payload):
                sent += 1
            else:
                failed += 1
    return SubmitResult(sent, failed, skipped)


def _submit(
    client: VacoClient,
    package: dict[str, Any],
    resource: dict[str, Any],
    payload: dict[str, Any],
) -> bool:
    submitted_at = datetime.now(timezone.utc)
    log.info(
        "Sending resource %s of dataset %s (%s) to %s",
        resource["id"],
        package["name"],
        payload["format"],
        client.queue_url,
    )
    try:
        response = client.queue_create(payload)
        data = response.get("data") or {}
        if not data.get("publicId"):
            raise VacoApiError("VACO response has no publicId")
    except (requests.RequestException, VacoApiError) as e:
        log.exception("Sending resource %s to VACO failed", resource["id"])
        validation = VacoEntry(
            resource["id"],
            package["id"],
            submitted_at,
            status=SEND_FAILED,
            complete=True,
            error=str(e),
        )
        accepted = False
    else:
        links = response.get("links") or {}
        magic_link = ((links.get("refs") or {}).get("magic") or {}).get("href")
        log.info(
            "Sent resource %s to VACO as entry %s, status is %s, results at %s",
            resource["id"],
            data["publicId"],
            data.get("status"),
            magic_link,
        )
        validation = VacoEntry(
            resource["id"],
            package["id"],
            submitted_at,
            entry_public_id=data["publicId"],
            status=data.get("status"),
            magic_link=magic_link,
        )
        accepted = True
    model.Session.add(validation)
    model.Session.commit()
    return accepted
