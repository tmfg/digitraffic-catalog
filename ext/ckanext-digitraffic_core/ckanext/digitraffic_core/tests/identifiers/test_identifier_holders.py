"""`IdentifierHolders` serialises identifier writes on a lock that its caller's transaction holds."""

import pytest
from ckan import model
from ckan.tests import factories, helpers
from sqlalchemy import text

from ckanext.digitraffic_core.identifiers.identifier_holders import IdentifierHolders
from ckanext.digitraffic_core.identifiers.organization_identifiers import (
    OrganizationIdentifiers,
)


def lock_is_free_elsewhere() -> bool:
    """Whether another database connection could take the identifier lock right now.

    The probe runs in its own autocommitted transaction, so it releases the lock again at once."""
    with model.meta.engine.connect() as connection:
        free = connection.execute(
            text("SELECT pg_try_advisory_xact_lock(hashtextextended(:name, 0))"),
            {"name": IdentifierHolders.LOCK_NAME},
        ).scalar()
    return bool(free)


@pytest.mark.usefixtures("clean_db", "with_plugins")
class TestIdentifierLock:
    def test_the_check_holds_the_lock_until_the_transaction_ends(self):
        IdentifierHolders().find_other_holder(
            OrganizationIdentifiers.parse(ytunnus="9000001-1"), None
        )

        assert not lock_is_free_elsewhere()
        model.Session.rollback()
        assert lock_is_free_elsewhere()

    def test_a_check_without_identifiers_takes_no_lock(self):
        IdentifierHolders().find_other_holder(OrganizationIdentifiers.parse(), None)

        assert lock_is_free_elsewhere()
        model.Session.rollback()

    def test_saving_an_organisation_releases_the_lock(self):
        organization = helpers.call_action(
            "organization_create",
            context={"user": factories.Sysadmin()["name"], "ignore_auth": False},
            name="lock-release",
            title="Oy Esimerkki Ab",
            ytunnus="9000001-1",
        )

        assert organization["ytunnus"] == "9000001-1"
        assert lock_is_free_elsewhere()
