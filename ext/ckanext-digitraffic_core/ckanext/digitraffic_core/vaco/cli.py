import logging
import time
from contextlib import contextmanager
from typing import Generator, Optional

import click
from ckan import model
from ckan.plugins import toolkit
from ckanext.digitraffic_core.vaco.client import VacoClient
from ckanext.digitraffic_core.vaco.login import TrivoreLogin
from ckanext.digitraffic_core.vaco.poll import poll_all
from ckanext.digitraffic_core.vaco.submit import submit_all
from sqlalchemy import text

log = logging.getLogger(__name__)

VACO_ENABLED = "ckanext.digitraffic_core.vaco.enabled"
API_BASE_URL = "ckanext.digitraffic_core.vaco.api_base_url"
TOKEN_URL = "ckanext.digitraffic_core.vaco.token_url"
CLIENT_ID = "ckanext.digitraffic_core.vaco.client_id"
CLIENT_SECRET = "ckanext.digitraffic_core.vaco.client_secret"


@click.group(name="digitraffic-vaco", short_help="Validate resources in VACO")
def vaco():
    pass


# ckan digitraffic-vaco submit
@vaco.command()
def submit():
    """Send every public GTFS, NeTEx and GBFS resource to VACO for validation."""
    _set_log_event("vaco.submit")
    client = _vaco_client()
    if client is None:
        return
    with _only_run("digitraffic-vaco submit") as started:
        if not started:
            return
        started_at = time.monotonic()
        result = submit_all(client)
    log.info(
        "VACO submit done in %.1f s: sent %d, failed %d, skipped %d (organization without a Y-tunnus)",
        time.monotonic() - started_at,
        result.sent,
        result.failed,
        result.skipped,
    )


# ckan digitraffic-vaco poll
@vaco.command()
def poll():
    """Collect the results of the validation requests sent in the last 7 days."""
    _set_log_event("vaco.poll")
    client = _vaco_client()
    if client is None:
        return
    with _only_run("digitraffic-vaco poll") as started:
        if not started:
            return
        started_at = time.monotonic()
        result = poll_all(client)
    log.info(
        "VACO poll done in %.1f s: finished %d, still in progress %d, failed to poll %d",
        time.monotonic() - started_at,
        result.finished,
        result.unfinished,
        result.failed,
    )


def _set_log_event(event: str) -> None:
    """Adds `event` to every later log line of this process, also from CKAN and other libraries."""
    # The deployed log formatter writes it as the `event` field, for searching a job's lines in OpenSearch
    make_record = logging.getLogRecordFactory()

    def make_record_with_event(*args, **kwargs) -> logging.LogRecord:
        record = make_record(*args, **kwargs)
        record.event = event
        return record

    logging.setLogRecordFactory(make_record_with_event)


@contextmanager
def _only_run(command: str) -> Generator[bool, None, None]:
    """Yields `False` when the same command is already running, started by the schedule or by hand."""
    # The database releases the lock if the process dies, so a crashed run does not block the next one
    with model.Session.get_bind().connect() as connection:
        got_lock = connection.execute(
            text("SELECT pg_try_advisory_lock(hashtext(:command))"),
            {"command": command},
        ).scalar()
        if not got_lock:
            log.warning("'%s' is already running, not starting another", command)
        try:
            yield bool(got_lock)
        finally:
            if got_lock:
                connection.execute(
                    text("SELECT pg_advisory_unlock(hashtext(:command))"),
                    {"command": command},
                )


def _vaco_client() -> Optional[VacoClient]:
    if not toolkit.asbool(toolkit.config.get(VACO_ENABLED)):
        log.info("VACO validation is off (%s)", VACO_ENABLED)
        return None
    api_base_url = toolkit.config.get(API_BASE_URL)
    token_url = toolkit.config.get(TOKEN_URL)
    client_id = toolkit.config.get(CLIENT_ID)
    client_secret = toolkit.config.get(CLIENT_SECRET)
    if not all([api_base_url, token_url, client_id, client_secret]):
        raise click.UsageError(
            f"Set {API_BASE_URL}, {TOKEN_URL}, " f"{CLIENT_ID} and {CLIENT_SECRET}."
        )
    login = TrivoreLogin(token_url, client_id, client_secret)
    return VacoClient(api_base_url, login.auth_header)
