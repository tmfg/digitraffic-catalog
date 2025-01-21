import json
import ckan.tests.factories as factories
import pytest
from ckan.tests import factories, helpers
from ckan.tests.factories import Organization
from ckanext.digitraffic_theme.model.frequency import Frequency
from ckanext.digitraffic_theme.model.location import Location
from ckanext.digitraffic_theme.model.mobility_theme import MOBILITY_THEME_TREE


def create_dataset(org: Organization):
    notes = {
        "en": "English description",
        "fi": "Suomenkielinen kuvaus",
        "sv": "Svensk beskrivning",
    }
    titles = {
        "en": "English title",
        "fi": "Suomenkielinen nimi",
        "sv": "Svensk titel",
    }
    dataset_frequency = list(Frequency.iris)[0]
    dataset_mobility_theme = str(
        [
            main_theme
            for main_theme, sub_themes in MOBILITY_THEME_TREE.items()
            if len(sub_themes) > 0
        ][0]
    )
    dataset_spatial = list(Location.iris)[0]

    dataset = factories.Dataset(
        owner_org=org["id"],
        notes_translated=notes,
        title_translated=titles,
        frequency=dataset_frequency,
        mobility_theme=dataset_mobility_theme,
        spatial=dataset_spatial,
    )

    return dataset


@pytest.mark.usefixtures("clean_db", "clean_index", "with_plugins")
class TestDatasetValidators:

    def test_add_and_remove_reference(self):
        organization = factories.Organization()

        dataset_1 = create_dataset(organization)
        dataset_2 = create_dataset(organization)

        # create reference from dataset_1 to dataset_2 and commit changes
        dataset_1["related_resource"] = dataset_2["id"]
        helpers.call_action("package_update", **dataset_1)

        updated_dataset_1 = helpers.call_action("package_show", id=dataset_1["id"])
        updated_dataset_2 = helpers.call_action("package_show", id=dataset_2["id"])

        assert updated_dataset_1.get("related_resource") == dataset_2["id"]
        assert dataset_1["id"] in updated_dataset_2["is_referenced_by"]

        # remove the reference from dataset_1 (field "related_resource") - this should result in reference also being removed from dataset_2 (field "is_referenced_by")
        dataset_1["related_resource"] = ""
        helpers.call_action("package_update", **dataset_1)

        updated_dataset_1 = helpers.call_action("package_show", id=dataset_1["id"])
        updated_dataset_2 = helpers.call_action("package_show", id=dataset_2["id"])

        assert not updated_dataset_1.get("related_resource")
        assert not dataset_1["id"] in updated_dataset_2.get("is_referenced_by")

    def test_add_and_change_reference(self):
        organization = factories.Organization()

        dataset_1 = create_dataset(organization)
        dataset_2 = create_dataset(organization)
        dataset_3 = create_dataset(organization)

        # create reference from dataset_1 to dataset_2 and commit changes
        dataset_1["related_resource"] = dataset_2["id"]
        helpers.call_action("package_update", **dataset_1)

        updated_dataset_1 = helpers.call_action("package_show", id=dataset_1["id"])
        updated_dataset_2 = helpers.call_action("package_show", id=dataset_2["id"])

        assert updated_dataset_1.get("related_resource") == dataset_2["id"]
        assert dataset_1["id"] in updated_dataset_2.get("is_referenced_by")

        # refer from dataset_1 to dataset_3 instead of dataset_2
        dataset_1["related_resource"] = dataset_3["id"]
        helpers.call_action("package_update", **dataset_1)

        updated_dataset_1 = helpers.call_action("package_show", id=dataset_1["id"])
        updated_dataset_2 = helpers.call_action("package_show", id=dataset_2["id"])
        updated_dataset_3 = helpers.call_action("package_show", id=dataset_3["id"])

        assert updated_dataset_1.get("related_resource") == dataset_3["id"]
        assert not dataset_1["id"] in updated_dataset_2.get("is_referenced_by")
        assert dataset_1["id"] in updated_dataset_3.get("is_referenced_by")

    def test_multiple_references(self):
        organization = factories.Organization()

        dataset_1 = create_dataset(organization)
        dataset_2 = create_dataset(organization)
        dataset_3 = create_dataset(organization)

        # create reference from dataset_1 and dataset_2 to dataset_3
        dataset_1["related_resource"] = dataset_3["id"]
        dataset_2["related_resource"] = dataset_3["id"]
        helpers.call_action("package_update", **dataset_1)
        helpers.call_action("package_update", **dataset_2)

        updated_dataset_1 = helpers.call_action("package_show", id=dataset_1["id"])
        updated_dataset_2 = helpers.call_action("package_show", id=dataset_2["id"])
        updated_dataset_3 = helpers.call_action("package_show", id=dataset_3["id"])

        assert updated_dataset_1.get("related_resource") == dataset_3["id"]
        assert updated_dataset_2.get("related_resource") == dataset_3["id"]
        assert len(json.loads(updated_dataset_3.get("is_referenced_by"))) == 2
        assert dataset_1["id"] in updated_dataset_3.get("is_referenced_by")
        assert dataset_2["id"] in updated_dataset_3.get("is_referenced_by")
