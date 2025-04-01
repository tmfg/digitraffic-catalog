from test_dataset_validators import create_dataset
import pytest
from ckan.tests import factories, helpers
from ckan.logic import ValidationError
from ckanext.digitraffic_theme.model.standard_license import StandardLicense
from ckanext.digitraffic_theme.model.mobility_data_standard import MobilityDataStandard
from ckanext.digitraffic_theme.model.data_grammar import DataGrammar
from ckanext.digitraffic_theme.model.communication_method import CommunicationMethod
from ckanext.digitraffic_theme.model.rights_type import RightsType
from ckanext.digitraffic_theme.model.format import Format
from ckanext.digitraffic_theme.model.application_layer_protocol import (
    ApplicationLayerProtocol,
)
from ckanext.digitraffic_theme.model.character_encoding import CharacterEncoding


def create_resource(package_id):
    url = "http://test.resource"
    resource = factories.Resource(
        package_id=package_id,
        url=url,
        format=list(Format.labels)[0],
        mobility_data_standard=list(MobilityDataStandard.iris)[0],
        rights_type=list(RightsType.iris)[0],
    )

    return resource


@pytest.mark.usefixtures("clean_db", "clean_index", "with_plugins")
class TestResourceValidators:
    def vocabulary_test(self, field_name, valid_value, invalid_value, match_message):
        """
        :param field_name: The name of the field being validated.
        :param valid_value: A valid value for the field.
        :param invalid_value: An invalid value for the field.
        :param match_message: The error message to match for invalid values.
        """
        organization = factories.Organization()
        dataset = create_dataset(organization)
        resource = create_resource(dataset["id"])

        resource[field_name] = valid_value
        helpers.call_action("resource_update", **resource)

        assert (
            helpers.call_action("resource_show", id=resource["id"])[field_name]
            == valid_value
        )

        resource[field_name] = invalid_value
        with pytest.raises(ValidationError, match=match_message):
            helpers.call_action("resource_update", **resource)

    def test_data_grammar_validator(self):
        self.vocabulary_test(
            field_name="data_grammar",
            valid_value=list(DataGrammar.iris)[0],
            invalid_value="json schema",
            match_message="does not belong to",
        )

    def test_mobility_data_standard_validator(self):
        self.vocabulary_test(
            field_name="mobility_data_standard",
            valid_value=list(MobilityDataStandard.iris)[0],
            invalid_value="gtfs",
            match_message="does not belong to",
        )

    def test_communication_method_validator(self):
        self.vocabulary_test(
            field_name="communication_method",
            valid_value=list(CommunicationMethod.iris)[0],
            invalid_value="other",
            match_message="does not belong to",
        )

    def test_rights_type_validator(self):
        self.vocabulary_test(
            field_name="rights_type",
            valid_value=list(RightsType.iris)[0],
            invalid_value="free",
            match_message="does not belong to",
        )

    def test_standard_license_validator(self):
        self.vocabulary_test(
            field_name="license_id",
            valid_value=list(StandardLicense.iris)[0],
            invalid_value="invalid_license",
            match_message="does not belong to",
        )

    def test_application_layer_protocol_validator(self):
        self.vocabulary_test(
            field_name="application_layer_protocol",
            valid_value=list(ApplicationLayerProtocol.iris)[0],
            invalid_value="ftp",
            match_message="does not belong to",
        )

    def test_character_encoding_validator(self):
        self.vocabulary_test(
            field_name="character_encoding",
            valid_value=list(CharacterEncoding.labels)[0],
            invalid_value="utf-666",
            match_message="is not a valid character encoding",
        )

    def test_set_format_iri(self):
        organization = factories.Organization()
        dataset = create_dataset(organization)
        resource = create_resource(dataset["id"])

        resource["format"] = "ZIP"
        helpers.call_action("resource_update", **resource)

        updated_resource = helpers.call_action("resource_show", **resource)
        assert "format_iri" in updated_resource
        assert (
            updated_resource["format_iri"]
            == "http://publications.europa.eu/resource/authority/file-type/ZIP"
        )

        resource["format"] = "Invalid Format"
        with pytest.raises(ValidationError, match="Value does not belong to"):
            helpers.call_action("resource_update", **resource)
