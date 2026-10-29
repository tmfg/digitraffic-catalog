"""Organisation identifiers through the action API: `organization_schema.yaml` and its validators.

The `…Guard` classes cover behaviour that already works and must keep working with the schema in force.
"""

import uuid

import pytest
from ckan.logic import ValidationError
from ckan.tests import factories, helpers

from ckanext.digitraffic_core.validators.organization_validators import (
    IDENTIFIER_REQUIRED_OPTION,
)

IDENTIFIER_KEYS = ("ytunnus", "euid", "eudi")


def sysadmin_context():
    return {"user": factories.Sysadmin()["name"], "ignore_auth": False}


def admin_context(user):
    return {"user": user["name"], "ignore_auth": False}


def create_organization(**fields):
    """A sysadmin creates an organisation through the API, with authorisation checked."""
    fields.setdefault("name", f"organization-{uuid.uuid4().hex[:12]}")
    fields.setdefault("title", "Oy Esimerkki Ab")
    return helpers.call_action(
        "organization_create", context=sysadmin_context(), **fields
    )


def show(organization):
    return helpers.call_action("organization_show", id=organization["id"])


def error_text(excinfo):
    return str(excinfo.value.error_dict)


def organization_with_admin(**identifiers):
    """An organisation and a user who is its admin but not a sysadmin."""
    admin = factories.User()
    organization = create_organization(
        users=[{"name": admin["name"], "capacity": "admin"}], **identifiers
    )
    return organization, admin


@pytest.mark.usefixtures("clean_db", "with_plugins")
class TestOrganizationSchemaGuard:
    def test_schema_declares_the_organisation_fields(self):
        schema = helpers.call_action(
            "scheming_organization_schema_show", type="organization"
        )

        assert [field["field_name"] for field in schema["fields"]] == [
            "title",
            "name",
            "description",
            "ytunnus",
            "euid",
            "eudi",
        ]

    def test_organisation_without_identifiers_is_created_while_not_required(self):
        organization = factories.Organization()

        assert show(organization)["id"] == organization["id"]

    def test_raw_extras_are_still_dropped_but_schema_fields_are_kept(self):
        # The chained organization_create pops the raw `extras` list; schema fields arrive as top-level keys.
        organization = create_organization(
            ytunnus="9000001-1", extras=[{"key": "foo", "value": "bar"}]
        )

        shown = show(organization)
        assert shown["ytunnus"] == "9000001-1"
        assert "foo" not in shown
        assert all(extra["key"] != "foo" for extra in shown.get("extras", []))


@pytest.mark.usefixtures("clean_db", "with_plugins")
class TestIdentifierStorage:
    def test_ytunnus_is_stored_trimmed(self):
        organization = create_organization(ytunnus="  9000003-8 ")

        assert show(organization)["ytunnus"] == "9000003-8"

    def test_euid_is_stored_trimmed(self):
        organization = create_organization(euid=" FIFPRO.9000001-1 ")

        assert show(organization)["euid"] == "FIFPRO.9000001-1"

    def test_eudi_is_stored_trimmed(self):
        organization = create_organization(eudi="  eudi-example-1 ")

        assert show(organization)["eudi"] == "eudi-example-1"

    def test_blank_identifiers_store_nothing(self):
        organization = create_organization(ytunnus="", euid="", eudi="   ")

        # `None`, not "": no group_extra row is written for a blank value.
        shown = show(organization)
        for key in IDENTIFIER_KEYS:
            assert shown.get(key) is None
        assert all(
            extra["key"] not in IDENTIFIER_KEYS for extra in shown.get("extras", [])
        )

    def test_sysadmin_can_clear_an_identifier(self):
        organization = create_organization(ytunnus="9000001-1", eudi="eudi-example-1")

        helpers.call_action(
            "organization_patch",
            context=sysadmin_context(),
            id=organization["id"],
            ytunnus="",
        )

        shown = show(organization)
        assert shown.get("ytunnus") is None
        assert shown["eudi"] == "eudi-example-1"

    def test_sysadmin_can_clear_the_only_identifier(self):
        # The update then sends no extras at all, and CKAN keeps the stored ones unless told to delete.
        organization = create_organization(ytunnus="9000001-1")

        helpers.call_action(
            "organization_patch",
            context=sysadmin_context(),
            id=organization["id"],
            ytunnus="  ",
        )

        shown = show(organization)
        assert shown.get("ytunnus") is None
        assert all(
            extra["key"] not in IDENTIFIER_KEYS for extra in shown.get("extras", [])
        )

    def test_sysadmin_can_clear_every_identifier_as_the_form_does(self):
        # The edit form submits every field, the cleared ones as empty strings.
        organization = create_organization(
            ytunnus="9000001-1", euid="FIFPRO.9000001-1", eudi="eudi-example-1"
        )

        helpers.call_action(
            "organization_update",
            context=sysadmin_context(),
            id=organization["id"],
            name=organization["name"],
            title=organization["title"],
            description="",
            ytunnus="",
            euid="",
            eudi="",
        )

        shown = show(organization)
        for key in IDENTIFIER_KEYS:
            assert shown.get(key) is None, key

    def test_clearing_an_identifier_that_is_not_stored_changes_nothing(self):
        organization = create_organization(eudi="eudi-example-1")

        helpers.call_action(
            "organization_patch",
            context=sysadmin_context(),
            id=organization["id"],
            ytunnus="",
            euid="",
        )

        shown = show(organization)
        assert (shown.get("ytunnus"), shown.get("euid")) == (None, None)
        assert shown["eudi"] == "eudi-example-1"

    def test_cleared_identifier_can_be_set_again(self):
        organization = create_organization(ytunnus="9000001-1")
        for ytunnus in ("", "9000003-8"):
            helpers.call_action(
                "organization_patch",
                context=sysadmin_context(),
                id=organization["id"],
                ytunnus=ytunnus,
            )

        assert show(organization)["ytunnus"] == "9000003-8"


@pytest.mark.usefixtures("clean_db", "with_plugins")
class TestIdentifierFormat:
    def test_ytunnus_with_wrong_check_digit_is_rejected(self):
        with pytest.raises(ValidationError) as excinfo:
            create_organization(ytunnus="9000001-2")

        assert "ytunnus" in excinfo.value.error_dict

    def test_ytunnus_in_another_form_is_rejected(self):
        with pytest.raises(ValidationError) as excinfo:
            create_organization(ytunnus="FI9000003-8")

        assert "ytunnus" in excinfo.value.error_dict

    def test_euid_in_another_form_is_rejected(self):
        with pytest.raises(ValidationError) as excinfo:
            create_organization(euid="fifpro.9000001-1")

        assert "euid" in excinfo.value.error_dict

    def test_finnish_euid_with_an_invalid_ytunnus_is_rejected(self):
        with pytest.raises(ValidationError) as excinfo:
            create_organization(euid="FIFPRO.9000001-2")

        assert "euid" in excinfo.value.error_dict

    def test_euid_without_registration_number_is_rejected(self):
        with pytest.raises(ValidationError) as excinfo:
            create_organization(euid="FIFPRO.")

        assert "euid" in excinfo.value.error_dict

    def test_finnish_euid_of_another_company_is_rejected(self):
        with pytest.raises(ValidationError) as excinfo:
            create_organization(ytunnus="9000001-1", euid="FIFPRO.9000003-8")

        assert "euid" in excinfo.value.error_dict

    def test_foreign_euid_next_to_a_ytunnus_is_accepted(self):
        organization = create_organization(
            ytunnus="9000001-1", euid="SEBOLREG.9000000001"
        )

        shown = show(organization)
        assert (shown["ytunnus"], shown["euid"]) == ("9000001-1", "SEBOLREG.9000000001")


@pytest.mark.usefixtures("clean_db", "with_plugins")
class TestIdentifierRequirement:
    @pytest.mark.ckan_config(IDENTIFIER_REQUIRED_OPTION, "true")
    def test_organisation_without_identifier_is_rejected_when_required(self):
        with pytest.raises(ValidationError) as excinfo:
            create_organization()

        assert "EUDI" in error_text(excinfo)

    @pytest.mark.ckan_config(IDENTIFIER_REQUIRED_OPTION, "true")
    def test_any_one_identifier_is_enough_when_required(self):
        organization = create_organization(eudi="eudi-example-1")

        assert show(organization)["eudi"] == "eudi-example-1"

    @pytest.mark.ckan_config(IDENTIFIER_REQUIRED_OPTION, "true")
    def test_clearing_the_only_identifier_is_rejected_when_required(self):
        organization = create_organization(ytunnus="9000001-1")

        with pytest.raises(ValidationError) as excinfo:
            helpers.call_action(
                "organization_patch",
                context=sysadmin_context(),
                id=organization["id"],
                ytunnus="",
            )

        assert "EUDI" in error_text(excinfo)
        assert show(organization)["ytunnus"] == "9000001-1"

    @pytest.mark.ckan_config(IDENTIFIER_REQUIRED_OPTION, "true")
    def test_clearing_every_identifier_is_rejected_when_required(self):
        organization = create_organization(
            ytunnus="9000001-1", euid="FIFPRO.9000001-1", eudi="eudi-example-1"
        )

        with pytest.raises(ValidationError):
            helpers.call_action(
                "organization_update",
                context=sysadmin_context(),
                id=organization["id"],
                name=organization["name"],
                title=organization["title"],
                ytunnus="",
                euid="",
                eudi="",
            )

        shown = show(organization)
        assert (shown["ytunnus"], shown["euid"], shown["eudi"]) == (
            "9000001-1",
            "FIFPRO.9000001-1",
            "eudi-example-1",
        )

    @pytest.mark.ckan_config(IDENTIFIER_REQUIRED_OPTION, "true")
    def test_clearing_one_of_two_identifiers_is_allowed_when_required(self):
        organization = create_organization(ytunnus="9000001-1", eudi="eudi-example-1")

        helpers.call_action(
            "organization_patch",
            context=sysadmin_context(),
            id=organization["id"],
            ytunnus="",
        )

        shown = show(organization)
        assert shown.get("ytunnus") is None
        assert shown["eudi"] == "eudi-example-1"

    def test_existing_organisation_without_identifier_cannot_be_saved_once_required(
        self, ckan_config, monkeypatch
    ):
        organization = create_organization()
        monkeypatch.setitem(ckan_config, IDENTIFIER_REQUIRED_OPTION, "true")

        # Even an edit that does not touch the identifiers: existing organisations need
        # an identifier before the option is switched on.
        with pytest.raises(ValidationError):
            helpers.call_action(
                "organization_patch",
                context=sysadmin_context(),
                id=organization["id"],
                description="Edited",
            )


@pytest.mark.usefixtures("clean_db", "with_plugins")
class TestIdentifierUniqueness:
    def test_same_ytunnus_on_another_organisation_is_rejected_without_naming_it(self):
        first = create_organization(title="Ensimmäinen Esimerkki Oy", ytunnus="9000001-1")

        with pytest.raises(ValidationError) as excinfo:
            create_organization(title="Toinen Esimerkki Oy", ytunnus="9000001-1")

        text = error_text(excinfo)
        assert "ytunnus" in excinfo.value.error_dict
        assert "already in use" in text
        for disclosed in (first["title"], first["name"], first["id"]):
            assert disclosed not in text

    def test_finnish_euid_collides_with_the_same_ytunnus(self):
        create_organization(ytunnus="9000001-1")

        with pytest.raises(ValidationError) as excinfo:
            create_organization(euid="FIFPRO.9000001-1")

        assert "euid" in excinfo.value.error_dict

    def test_ytunnus_collides_with_the_same_finnish_euid(self):
        create_organization(euid="FIFPRO.9000001-1")

        with pytest.raises(ValidationError) as excinfo:
            create_organization(ytunnus="9000001-1")

        assert "ytunnus" in excinfo.value.error_dict

    def test_same_eudi_on_another_organisation_is_rejected(self):
        create_organization(eudi="eudi-example-1")

        with pytest.raises(ValidationError) as excinfo:
            create_organization(eudi="eudi-example-1")

        assert "eudi" in excinfo.value.error_dict


@pytest.mark.usefixtures("clean_db", "with_plugins")
class TestIdentifierUniquenessGuard:
    def test_organisation_keeps_its_own_identifier_on_update(self):
        organization = create_organization(ytunnus="9000001-1")

        helpers.call_action(
            "organization_patch",
            context=sysadmin_context(),
            id=organization["id"],
            description="Edited",
        )

        assert show(organization)["ytunnus"] == "9000001-1"

    def test_identifier_of_a_deleted_organisation_can_be_reused(self):
        deleted = create_organization(ytunnus="9000001-1")
        helpers.call_action("organization_delete", id=deleted["id"])

        organization = create_organization(ytunnus="9000001-1")

        assert show(organization)["ytunnus"] == "9000001-1"

    def test_foreign_euid_does_not_collide_with_a_ytunnus(self):
        create_organization(ytunnus="9000001-1")

        organization = create_organization(euid="SEBOLREG.9000001-1")

        assert show(organization)["euid"] == "SEBOLREG.9000001-1"


@pytest.mark.usefixtures("clean_db", "with_plugins")
class TestSysadminOnlyIdentifiers:
    def test_admin_save_omitting_an_identifier_keeps_it(self):
        organization, admin = organization_with_admin(
            ytunnus="9000001-1", euid="FIFPRO.9000001-1"
        )

        # organization_update replaces the extras: without the guard the EUID would be dropped.
        helpers.call_action(
            "organization_update",
            context=admin_context(admin),
            id=organization["id"],
            name=organization["name"],
            title=organization["title"],
            description="Updated description",
            ytunnus="9000001-1",
        )

        shown = show(organization)
        assert (shown["ytunnus"], shown["euid"]) == ("9000001-1", "FIFPRO.9000001-1")

    def test_admin_save_with_blank_identifier_keeps_it(self):
        organization, admin = organization_with_admin(ytunnus="9000001-1")

        helpers.call_action(
            "organization_patch",
            context=admin_context(admin),
            id=organization["id"],
            ytunnus="",
        )

        assert show(organization)["ytunnus"] == "9000001-1"

    def test_admin_cannot_change_an_identifier(self):
        organization, admin = organization_with_admin(ytunnus="9000001-1")

        with pytest.raises(ValidationError) as excinfo:
            helpers.call_action(
                "organization_patch",
                context=admin_context(admin),
                id=organization["id"],
                ytunnus="9000003-8",
            )

        assert "ytunnus" in excinfo.value.error_dict
        assert "administrator" in error_text(excinfo)
        assert show(organization)["ytunnus"] == "9000001-1"

    def test_admin_cannot_add_an_identifier(self):
        organization, admin = organization_with_admin()

        with pytest.raises(ValidationError) as excinfo:
            helpers.call_action(
                "organization_patch",
                context=admin_context(admin),
                id=organization["id"],
                euid="FIFPRO.9000001-1",
            )

        assert "euid" in excinfo.value.error_dict

    def test_sysadmin_can_change_an_identifier(self):
        organization = create_organization(ytunnus="9000001-1")

        helpers.call_action(
            "organization_patch",
            context=sysadmin_context(),
            id=organization["id"],
            ytunnus="9000003-8",
        )

        assert show(organization)["ytunnus"] == "9000003-8"


@pytest.mark.usefixtures("clean_db", "with_plugins")
class TestSysadminOnlyIdentifiersGuard:
    def test_admin_save_with_the_stored_identifier_succeeds(self):
        organization, admin = organization_with_admin(ytunnus="9000001-1")

        helpers.call_action(
            "organization_patch",
            context=admin_context(admin),
            id=organization["id"],
            description="Edited",
        )

        assert show(organization)["ytunnus"] == "9000001-1"

    def test_sysadmin_update_omitting_an_identifier_deletes_it_but_patch_keeps_it(self):
        updated = create_organization(ytunnus="9000001-1")
        patched = create_organization(ytunnus="9000003-8")

        helpers.call_action(
            "organization_update",
            context=sysadmin_context(),
            id=updated["id"],
            name=updated["name"],
            title=updated["title"],
            eudi="eudi-example-1",
        )
        helpers.call_action(
            "organization_patch",
            context=sysadmin_context(),
            id=patched["id"],
            eudi="eudi-example-2",
        )

        assert show(updated).get("ytunnus") is None
        assert show(patched)["ytunnus"] == "9000003-8"
