import json
import logging
from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
from typing import Any, Optional

import requests
from ckan import model
from ckanext.digitraffic_core.orm_model.vaco_validation import VacoValidation
from ckanext.digitraffic_core.vaco.client import VacoApiError, VacoClient
from ckanext.digitraffic_core.vaco.submit import VALIDATION_RULES

log = logging.getLogger(__name__)

MAX_AGE = timedelta(days=7)
UNFINISHED_STATUSES = {"received", "processing"}
DOWNLOAD_TASK = "prepare.download"
# VACO did not download the feed because its ETag had not changed since the previous request
FEED_UNCHANGED = "feed_unchanged"


@dataclass(frozen=True)
class PollResult:
    finished: int
    unfinished: int
    failed: int


def poll_all(client: VacoClient) -> PollResult:
    """Ask VACO for the state of every unfinished validation request sent in the last 7 days."""
    validations = (
        model.Session.query(VacoValidation)
        .filter(
            VacoValidation.complete.is_(False),
            VacoValidation.entry_public_id.isnot(None),
            VacoValidation.submitted_at >= datetime.now(timezone.utc) - MAX_AGE,
        )
        .order_by(VacoValidation.submitted_at)
        .all()
    )
    finished = unfinished = failed = 0
    for validation in validations:
        outcome = _poll(client, validation)
        model.Session.commit()
        if outcome is None:
            failed += 1
        elif outcome:
            finished += 1
        else:
            unfinished += 1
    return PollResult(finished, unfinished, failed)


def _poll(client: VacoClient, validation: VacoValidation) -> Optional[bool]:
    """Updates the row from VACO's answer. Returns whether the request has finished, or `None` if polling failed."""
    resource_name = _english_name(validation.resource_id)
    log.info(
        "Polling VACO entry %s of resource %s (%s)",
        validation.entry_public_id,
        validation.resource_id,
        resource_name,
    )
    try:
        response = client.queue_fetch(validation.entry_public_id)
    except (requests.RequestException, VacoApiError) as e:
        # Asked again on the next run, until the request is 7 days old
        log.exception("Polling VACO entry %s failed", validation.entry_public_id)
        validation.error = str(e)
        return None

    entry = response.get("data") or {}
    tasks = {task.get("name"): task.get("status") for task in entry.get("tasks") or []}
    status = entry.get("status")
    validation_rule = _validation_rule(tasks)
    validation.polled_at = datetime.now(timezone.utc)
    validation.error = None
    validation.validation_status = tasks.get(validation_rule)
    validation.complete = status not in UNFINISHED_STATUSES
    if validation.complete:
        validation.etag = entry.get("etag")
        status = FEED_UNCHANGED if tasks.get(DOWNLOAD_TASK) == "cancelled" else status
    validation.status = status
    if status == FEED_UNCHANGED:
        outcome = "feed unchanged, VACO did not download or validate it"
    else:
        outcome = f"validation {validation_rule} status: {validation.validation_status}"
    log.info(
        "VACO entry %s of resource %s (%s): %s",
        validation.entry_public_id,
        validation.resource_id,
        resource_name,
        outcome,
    )
    return validation.complete


def _english_name(resource_id: str) -> str:
    resource = model.Resource.get(resource_id)
    names = resource.extras.get("name_translated") if resource else None
    if isinstance(names, str):
        names = json.loads(names)
    return (names or {}).get("en") or "no English name"


def _validation_rule(tasks: dict[str, Any]) -> Optional[str]:
    return next((rule for rule in VALIDATION_RULES.values() if rule in tasks), None)
