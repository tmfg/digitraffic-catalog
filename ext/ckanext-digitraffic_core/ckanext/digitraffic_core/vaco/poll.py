import json
import logging
from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
from typing import Any, Optional

import requests
from ckan import model
from ckanext.digitraffic_core.orm_model.vaco_entry import VacoEntry
from ckanext.digitraffic_core.vaco.client import VacoApiError, VacoClient
from ckanext.digitraffic_core.vaco.submit import VALIDATION_RULES

log = logging.getLogger(__name__)

MAX_AGE = timedelta(days=7)
UNFINISHED_STATUSES = {"received", "processing"}


@dataclass(frozen=True)
class PollResult:
    finished: int
    unfinished: int
    failed: int


@dataclass(frozen=True)
class PollOutcome:
    """What one poll learned about a validation request."""

    status: Optional[str] = None
    validation_rule: Optional[str] = None
    validation_status: Optional[str] = None
    complete: bool = False
    etag: Optional[str] = None
    # Set when VACO could not be asked; the request is asked again on the next run
    error: Optional[str] = None


def poll_all(client: VacoClient) -> PollResult:
    """Ask VACO for the state of every unfinished validation request sent in the last 7 days."""
    entries = (
        model.Session.query(VacoEntry)
        .filter(
            VacoEntry.complete.is_(False),
            VacoEntry.entry_public_id.isnot(None),
            VacoEntry.submitted_at >= datetime.now(timezone.utc) - MAX_AGE,
        )
        .order_by(VacoEntry.submitted_at)
        .all()
    )
    log.info(
        "Polling %d unfinished VACO entries sent in the last 7 days", len(entries)
    )
    finished = unfinished = failed = 0
    for entry in entries:
        outcome = _poll(client, entry)
        _save(entry, outcome)
        model.Session.commit()
        if outcome.error is not None:
            failed += 1
        elif outcome.complete:
            finished += 1
        else:
            unfinished += 1
    return PollResult(finished, unfinished, failed)


def _poll(client: VacoClient, entry: VacoEntry) -> PollOutcome:
    resource_name = _english_name(entry.resource_id)
    log.info(
        "Polling VACO entry %s of resource %s (%s)",
        entry.entry_public_id,
        entry.resource_id,
        resource_name,
    )
    try:
        response = client.queue_fetch(entry.entry_public_id)
    except (requests.RequestException, VacoApiError) as e:
        log.exception("Polling VACO entry %s failed", entry.entry_public_id)
        return PollOutcome(error=str(e))

    outcome = _outcome_from(response.get("data") or {})
    log.info(
        "VACO entry %s of resource %s (%s): validation %s status: %s",
        entry.entry_public_id,
        entry.resource_id,
        resource_name,
        outcome.validation_rule,
        outcome.validation_status,
    )
    return outcome


def _outcome_from(vaco_entry: dict[str, Any]) -> PollOutcome:
    """Reads the validation's state from VACO's entry."""
    tasks = {
        task.get("name"): task.get("status") for task in vaco_entry.get("tasks") or []
    }
    status = vaco_entry.get("status")
    complete = status not in UNFINISHED_STATUSES
    validation_rule = _validation_rule(tasks)
    return PollOutcome(
        status=status,
        validation_rule=validation_rule,
        validation_status=tasks.get(validation_rule),
        complete=complete,
        # VACO sets the feed's ETag only after downloading it
        etag=vaco_entry.get("etag") if complete else None,
    )


def _save(entry: VacoEntry, outcome: PollOutcome) -> None:
    if outcome.error is not None:
        # Keeps the last known state, so the next run asks again
        entry.error = outcome.error
        return
    entry.polled_at = datetime.now(timezone.utc)
    entry.error = None
    entry.status = outcome.status
    entry.validation_status = outcome.validation_status
    entry.complete = outcome.complete
    if outcome.complete:
        entry.etag = outcome.etag


def _english_name(resource_id: str) -> str:
    resource = model.Resource.get(resource_id)
    names = resource.extras.get("name_translated") if resource else None
    if isinstance(names, str):
        names = json.loads(names)
    return (names or {}).get("en") or "no English name"


def _validation_rule(tasks: dict[str, Any]) -> Optional[str]:
    return next((rule for rule in VALIDATION_RULES.values() if rule in tasks), None)
