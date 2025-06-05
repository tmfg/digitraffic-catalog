import json
import ckan.tests.factories as factories
import pytest
from ckan.tests import factories, helpers
from ckan.tests.factories import Organization
from ckan.logic import ValidationError
from ckanext.digitraffic_theme.model.frequency import Frequency
from ckanext.digitraffic_theme.model.location import Location
from ckanext.digitraffic_theme.model.transport_mode import TransportMode
from ckanext.digitraffic_theme.model.intended_information_service import (
    IntendedInformationService,
)
from ckanext.digitraffic_theme.model.language import Language
from ckanext.digitraffic_theme.model.georeferencing_method import GeoreferencingMethod
from ckanext.digitraffic_theme.model.network_coverage import NetworkCoverage


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
    dataset_frequency = list(Frequency.iris)[:1]
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

    def vocabulary_test(self, field_name, valid_value, invalid_value, match_message):
        """
        :param field_name: The name of the field being validated.
        :param valid_value: A valid value for the field.
        :param invalid_value: An invalid value for the field.
        :param match_message: The error message to match for invalid values.
        """
        organization = factories.Organization()
        dataset = create_dataset(organization)

        dataset[field_name] = valid_value
        helpers.call_action("package_update", **dataset)

        assert (
            helpers.call_action("package_show", id=dataset["id"])[field_name]
            == valid_value
        )

        dataset[field_name] = invalid_value
        with pytest.raises(ValidationError, match=match_message):
            helpers.call_action("package_update", **dataset)

    def test_frequency_validator(self):
        self.vocabulary_test(
            field_name="frequency",
            valid_value=list(Frequency.iris)[:1],
            invalid_value=["weekly"],
            match_message="does not belong to",
        )

    def test_spatial_reference_validator(self):
        self.vocabulary_test(
            field_name="conforms_to",
            valid_value="https://www.opengis.net/def/crs/EPSG/0/4326",
            invalid_value="gps",
            match_message="Given spatial reference is not supported",
        )

    def test_location_validator(self):
        self.vocabulary_test(
            field_name="spatial",
            valid_value=list(Location.iris)[0],
            invalid_value="suomi",
            match_message="does not belong to",
        )

    def test_transport_mode_validator(self):
        self.vocabulary_test(
            field_name="transport_mode",
            valid_value=list(TransportMode.iris)[0],
            invalid_value="car",
            match_message="does not belong to",
        )

    def test_language_validator(self):
        self.vocabulary_test(
            field_name="language",
            valid_value=list(Language.iris)[0],
            invalid_value="gothic",
            match_message="does not belong to",
        )

    def test_georeferencing_method_validator(self):
        self.vocabulary_test(
            field_name="georeferencing_method",
            valid_value=list(GeoreferencingMethod.iris)[0],
            invalid_value="gps",
            match_message="does not belong to",
        )

    def test_network_coverage_validator(self):
        self.vocabulary_test(
            field_name="network_coverage",
            valid_value=list(NetworkCoverage.iris)[0],
            invalid_value="roads",
            match_message="does not belong to",
        )

    def test_intended_information_service_validator(self):
        self.vocabulary_test(
            field_name="intended_information_service",
            valid_value=list(IntendedInformationService.iris)[0],
            invalid_value="trip planner",
            match_message="does not belong to",
        )

    def test_phone_number_validation(self):
        organization = factories.Organization()
        dataset = create_dataset(organization)

        dataset["rights_holder"] = [{"phone": "+358123"}]
        with pytest.raises(
            ValidationError, match="Phone number is not in a valid format"
        ):
            helpers.call_action("package_update", **dataset)

        dataset["contact_point"] = [{"has_telephone": "1234567"}]
        with pytest.raises(
            ValidationError, match="Phone number is not in a valid format"
        ):
            helpers.call_action("package_update", **dataset)

    def test_country_validator(self):
        organization = factories.Organization()
        dataset = create_dataset(organization)

        dataset["contact_point"] = [
            {
                "contact_point_type": "http://www.w3.org/2006/vcard/ns#Organization",
                "has_email": "foo@example.com",
                "fn": "Foo Bar",
                "country_name": "http://publications.europa.eu/resource/authority/country/FIN"
            }
        ]
        dataset["rights_holder"] = [
            {
                "type": "http://purl.org/adms/publishertype/Company",
                "name": "Bar Foo",
                "admin_unit_l1": "http://publications.europa.eu/resource/authority/country/ESP"
            }
        ]
        helpers.call_action("package_update", **dataset)

        updated_dataset = helpers.call_action("package_show", id=dataset["id"])
        assert (
            updated_dataset["contact_point"][0]
            == {"contact_point_type": "http://www.w3.org/2006/vcard/ns#Organization", "country_name": "http://publications.europa.eu/resource/authority/country/FIN", "has_email": "foo@example.com", "fn": "Foo Bar"}
        )
        assert (
            updated_dataset["rights_holder"][0]
            == {"type": "http://purl.org/adms/publishertype/Company", "admin_unit_l1": "http://publications.europa.eu/resource/authority/country/ESP", "name": "Bar Foo"}
        )

        dataset["contact_point"] = [{"country_name": "phrygia"}]
        dataset["rights_holder"] = [{"admin_unit_l1": "persia"}]

        with pytest.raises(ValidationError, match="does not belong to"):
            helpers.call_action("package_update", **dataset)

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
