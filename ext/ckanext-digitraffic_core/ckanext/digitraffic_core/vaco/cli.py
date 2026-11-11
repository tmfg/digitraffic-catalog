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
    client = _vaco_client()
    if client is None:
        return
    with _only_run("digitraffic-vaco submit") as started:
        if not started:
            return
        result = submit_all(client)
    click.echo(
        f"Sent {result.sent}, failed {result.failed}, "
        f"skipped {result.skipped} (organization without a Y-tunnus)."
    )


# ckan digitraffic-vaco poll
@vaco.command()
def poll():
    """Collect the results of the validation requests sent in the last 7 days."""
    client = _vaco_client()
    if client is None:
        return
    with _only_run("digitraffic-vaco poll") as started:
        if not started:
            return
        result = poll_all(client)
    click.echo(
        f"Finished {result.finished}, still in progress {result.unfinished}, "
        f"failed to poll {result.failed}."
    )


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
            click.echo(f"'{command}' is already running, not starting another.")
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
        click.echo(f"VACO validation is off ({VACO_ENABLED}).")
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
