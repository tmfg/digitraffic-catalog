from unittest import mock

import pytest
from ckan import model
from ckan.tests import factories, helpers

from ckanext.digitraffic_core.model.frequency import Frequency
from ckanext.digitraffic_core.model.location import Location
from ckanext.digitraffic_core.model.mobility_theme import MOBILITY_THEME_TREE

_FAIL_REFERENCE_UPDATE = "ckanext.digitraffic_core.actions.dataset._update_is_referenced_by"


def _dataset_fields(org_id: str, title: str) -> dict:
    mobility_theme = str(
        [theme for theme, sub_themes in MOBILITY_THEME_TREE.items() if len(sub_themes) > 0][0]
    )
    return {
        "owner_org": org_id,
        "type": "dataset",
        "title_translated": {"en": f"{title} en", "fi": f"{title} fi", "sv": f"{title} sv"},
        "notes_translated": {"en": "Notes en", "fi": "Notes fi", "sv": "Notes sv"},
        "frequency": list(Frequency.get_iris())[0],
        "mobility_theme": mobility_theme,
        "spatial": [list(Location.get_iris())[0]],
        "contact_point": [
            {
                "contact_point_type": "http://www.w3.org/2006/vcard/ns#Organization",
                "fn": "Foo Bar",
                "has_email": "foo@example.com",
            }
        ],
    }


def _indexed(package_id: str) -> dict:
    results = helpers.call_action("package_search", fq=f'id:"{package_id}"', include_private=True)["results"]
    assert len(results) == 1
    return results[0]


@pytest.mark.usefixtures("clean_db", "clean_index", "with_plugins")
class TestPackageTransaction:
    def test_create_stores_and_indexes_id_as_name(self):
        org = factories.Organization()

        created = helpers.call_action("package_create", **_dataset_fields(org["id"], "Created"))

        assert created["name"] == created["id"]
        assert helpers.call_action("package_show", id=created["id"])["name"] == created["id"]
        assert _indexed(created["id"])["name"] == created["id"]

    def test_create_with_return_id_only_returns_the_id(self):
        org = factories.Organization()

        package_id = helpers.call_action(
            "package_create", context={"return_id_only": True}, **_dataset_fields(org["id"], "Id only")
        )

        assert helpers.call_action("package_show", id=package_id)["name"] == package_id

    def test_create_leaves_nothing_behind_when_reference_update_fails(self):
        org = factories.Organization()
        referred = helpers.call_action("package_create", **_dataset_fields(org["id"], "Referred"))
        packages_before = model.Session.query(model.Package).count()

        with mock.patch(_FAIL_REFERENCE_UPDATE, side_effect=RuntimeError("reference update failed")):
            with pytest.raises(RuntimeError):
                helpers.call_action(
                    "package_create",
                    related_resource=[referred["id"]],
                    **_dataset_fields(org["id"], "Failing"),
                )

        model.Session.remove()
        assert model.Session.query(model.Package).count() == packages_before
        assert helpers.call_action("package_show", id=referred["id"]).get("is_referenced_by", []) == []

    def test_update_saves_reference_and_indexes_both_datasets(self):
        org = factories.Organization()
        referred = helpers.call_action("package_create", **_dataset_fields(org["id"], "Referred"))
        referring = helpers.call_action("package_create", **_dataset_fields(org["id"], "Referring"))

        helpers.call_action(
            "package_patch",
            id=referring["id"],
            related_resource=[referred["id"]],
            title_translated={"en": "Changed en", "fi": "Changed fi", "sv": "Changed sv"},
        )

        assert helpers.call_action("package_show", id=referred["id"])["is_referenced_by"] == [referring["id"]]
        assert _indexed(referred["id"])["is_referenced_by"] == [referring["id"]]
        assert _indexed(referring["id"])["title_translated"]["fi"] == "Changed fi"

    def test_update_is_rolled_back_when_reference_update_fails(self):
        org = factories.Organization()
        referred = helpers.call_action("package_create", **_dataset_fields(org["id"], "Referred"))
        referring = helpers.call_action("package_create", **_dataset_fields(org["id"], "Referring"))

        with mock.patch(_FAIL_REFERENCE_UPDATE, side_effect=RuntimeError("reference update failed")):
            with pytest.raises(RuntimeError):
                helpers.call_action(
                    "package_patch",
                    id=referring["id"],
                    related_resource=[referred["id"]],
                    title_translated={"en": "Changed en", "fi": "Changed fi", "sv": "Changed sv"},
                )

        model.Session.remove()
        unchanged = helpers.call_action("package_show", id=referring["id"])
        assert unchanged["title_translated"]["fi"] == "Referring fi"
        assert unchanged.get("related_resource", []) == []
        assert helpers.call_action("package_show", id=referred["id"]).get("is_referenced_by", []) == []
        assert _indexed(referring["id"])["title_translated"]["fi"] == "Referring fi"
