"""The organisation form is rendered from `organization_schema.yaml`; identifiers are read-only for non-sysadmins."""

from html.parser import HTMLParser

import pytest
from ckan.plugins.toolkit import url_for
from ckan.tests import factories

IDENTIFIER_INPUTS = ("field-ytunnus", "field-euid", "field-eudi")


class FormPage(HTMLParser):
    """Attributes of every element on a page, looked up by `id` or `name`."""

    def __init__(self, html: str):
        super().__init__()
        self.by_id: dict[str, dict[str, str | None]] = {}
        self.names: set[str] = set()
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        if attributes.get("id"):
            self.by_id[attributes["id"]] = attributes
        if attributes.get("name"):
            self.names.add(attributes["name"])

    def find(self, input_id: str) -> dict[str, str | None] | None:
        return self.by_id.get(input_id)


def form(app, url, user):
    response = app.get(url, headers={"Authorization": user["token"]}, status=200)
    return FormPage(response.body)


@pytest.mark.usefixtures("clean_db", "with_plugins")
class TestOrganizationForm:
    def test_new_organisation_form_has_the_schema_fields(self, app):
        sysadmin = factories.SysadminWithToken()

        page = form(app, url_for("organization.new"), sysadmin)

        for input_id in ("field-title", "field-name", "field-description", *IDENTIFIER_INPUTS):
            field = page.find(input_id)
            assert field is not None, input_id
            assert "readonly" not in field, input_id
        assert "image_url" not in page.names
        assert "image_upload" not in page.names

    def test_identifiers_are_read_only_for_an_organisation_admin(self, app):
        admin = factories.UserWithToken()
        organization = factories.Organization(
            users=[{"name": admin["name"], "capacity": "admin"}], ytunnus="9000001-1"
        )

        page = form(app, url_for("organization.edit", id=organization["name"]), admin)

        for input_id in IDENTIFIER_INPUTS:
            assert "readonly" in page.find(input_id), input_id
        assert page.find("field-ytunnus")["value"] == "9000001-1"

    def test_identifiers_are_editable_for_a_sysadmin(self, app):
        sysadmin = factories.SysadminWithToken()
        organization = factories.Organization(ytunnus="9000001-1")

        page = form(app, url_for("organization.edit", id=organization["name"]), sysadmin)

        for input_id in IDENTIFIER_INPUTS:
            assert "readonly" not in page.find(input_id), input_id
