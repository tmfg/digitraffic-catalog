from typing import Any, Optional

from ckan import model
from ckan.plugins import toolkit
from ckanext.digitraffic_core.orm_model.vaco_entry import VacoEntry
from ckanext.digitraffic_core.vaco.cli import API_BASE_URL, VACO_ENABLED
from ckanext.digitraffic_core.vaco.poll import FEED_UNCHANGED
from ckanext.digitraffic_core.vaco.resources import vaco_format
from ckanext.digitraffic_core.vaco.submit import VALIDATION_RULES


def vaco_validation(resource: dict[str, Any]) -> Optional[dict[str, Any]]:
    """What the resource page shows about the resource's VACO validation, or `None` when it shows nothing."""
    format = vaco_format(resource)
    api_base_url = toolkit.config.get(API_BASE_URL)
    if format is None or not api_base_url or not toolkit.asbool(toolkit.config.get(VACO_ENABLED)):
        return None
    validation = (
        model.Session.query(VacoEntry)
        .filter(
            VacoEntry.resource_id == resource["id"],
            VacoEntry.entry_public_id.isnot(None),
            VacoEntry.status.is_distinct_from(FEED_UNCHANGED),
        )
        .order_by(VacoEntry.submitted_at.desc())
        .first()
    )
    if validation is None:
        return {"started": False}
    return {
        "started": True,
        # VACO cancels the validation when it cannot download the feed
        "no_data": validation.validation_status == "cancelled",
        # VACO draws the badge from the request's current state, so it also shows a validation still in progress
        "badge_url": f"{api_base_url.rstrip('/')}/api/badge/{validation.entry_public_id}/{VALIDATION_RULES[format]}",
        "magic_link": validation.magic_link,
    }
