import ckan.tests.factories as factories
import pytest
from ckan.tests import factories, helpers
from ckan.tests.factories import Organization
from ckanext.digitraffic_theme.model.frequency import Frequency
from ckanext.digitraffic_theme.model.location import Location
from ckanext.digitraffic_theme.model.mobility_theme import MOBILITY_THEME_TREE
from ckanext.digitraffic_theme.validators.dataset_validators import (
    dataset_reference_validator,
)


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

        assert updated_dataset_1["related_resource"] == dataset_2["id"]
        assert dataset_1["id"] in updated_dataset_2["is_referenced_by"]

        dataset_1["related_resource"] = ""
        helpers.call_action("package_update", **dataset_1)

        updated_dataset_1 = helpers.call_action("package_show", id=dataset_1["id"])
        updated_dataset_2 = helpers.call_action("package_show", id=dataset_2["id"])

        assert not updated_dataset_1.get("related_resource")
        assert not dataset_1["id"] in updated_dataset_2["is_referenced_by"]
