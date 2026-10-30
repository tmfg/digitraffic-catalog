"""Stored organisation identifiers that break the identifier rules, as seen by an organisation admin."""

import uuid

import pytest
from ckan import model
from ckan.logic import ValidationError
from ckan.tests import factories, helpers


def create_organization_with_admin(**identifiers):
    admin = factories.User()
    organization = helpers.call_action(
        "organization_create",
        context={"user": factories.Sysadmin()["name"], "ignore_auth": False},
        name=f"organization-{uuid.uuid4().hex[:12]}",
        title="Oy Esimerkki Ab",
        users=[{"name": admin["name"], "capacity": "admin"}],
        **identifiers,
    )
    return organization, admin


def overwrite_stored_extra(organization, key, value):
    """Write a stored value directly: no action accepts one that breaks the rules."""
    group = model.Group.get(organization["id"])
    group.extras[key] = value
    model.Session.commit()


@pytest.mark.usefixtures("clean_db", "with_plugins")
class TestStoredIdentifiersBreakingTheRules:
    def test_admin_save_is_rejected_with_a_field_error(self):
        organization, admin = create_organization_with_admin(ytunnus="9000001-1")
        overwrite_stored_extra(organization, "ytunnus", "FI90000011")

        with pytest.raises(ValidationError) as excinfo:
            helpers.call_action(
                "organization_patch",
                context={"user": admin["name"], "ignore_auth": False},
                id=organization["id"],
                description="Edited",
            )

        assert "ytunnus" in excinfo.value.error_dict
        assert "system administrator" in str(excinfo.value.error_dict)
