import click
from ckan.plugins import toolkit
from ckanext.digitraffic_core.vaco.client import VacoClient
from ckanext.digitraffic_core.vaco.login import TrivoreLogin
from ckanext.digitraffic_core.vaco.submit import submit_all

VACO_ENABLED = "ckanext.digitraffic_core.vaco.enabled"
API_BASE_URL = "ckanext.digitraffic_core.vaco.api_base_url"
TOKEN_URL = "ckanext.digitraffic_core.vaco.token_url"
CLIENT_ID = "ckanext.digitraffic_core.vaco.client_id"
CLIENT_SECRET = "ckanext.digitraffic_core.vaco.client_secret"
SCOPE = "ckanext.digitraffic_core.vaco.scope"


@click.group(name="digitraffic-vaco", short_help="Validate resources in VACO")
def vaco():
    pass


@vaco.command()
def submit():
    """Send every public GTFS, NeTEx and GBFS resource to VACO for validation."""
    if not toolkit.asbool(toolkit.config.get(VACO_ENABLED)):
        click.echo(f"VACO validation is off ({VACO_ENABLED}).")
        return
    api_base_url = toolkit.config.get(API_BASE_URL)
    token_url = toolkit.config.get(TOKEN_URL)
    client_id = toolkit.config.get(CLIENT_ID)
    client_secret = toolkit.config.get(CLIENT_SECRET)
    if not all([api_base_url, token_url, client_id, client_secret]):
        raise click.UsageError(
            f"Set {API_BASE_URL}, {TOKEN_URL}, " f"{CLIENT_ID} and {CLIENT_SECRET}."
        )
    scope = toolkit.config.get(SCOPE) or None
    login = TrivoreLogin(token_url, client_id, client_secret, scope)
    result = submit_all(VacoClient(api_base_url, login.auth_header))
    click.echo(
        f"Sent {result.sent}, failed {result.failed}, "
        f"skipped {result.skipped} (organization without a Y-tunnus)."
    )
