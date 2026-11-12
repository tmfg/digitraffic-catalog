import pytest
from ckan import model
from ckan.tests import factories
from ckanext.digitraffic_core.model.rights_type import RightsType
from ckanext.digitraffic_core.orm_model.vaco_entry import VacoEntry
from ckanext.digitraffic_core.tests.vaco.conftest import FakeVacoClient
from ckanext.digitraffic_core.tests.validators.test_dataset_validators import (
    CONTACT_POINT,
    create_dataset,
)
from ckanext.digitraffic_core.vaco.submit import SEND_FAILED, submit_all

STANDARD = "https://w3id.org/mobilitydcat-ap/mobility-data-standard/"


def resource(url, standard, format, **fields):
    return {
        "url": url,
        "format": format,
        "mobility_data_standard": STANDARD + standard,
        "rights_type": list(RightsType.get_iris())[0],
        **fields,
    }


def entries_of(resource_id):
    return (
        model.Session.query(VacoEntry)
        .filter(VacoEntry.resource_id == resource_id)
        .order_by(VacoEntry.submitted_at)
        .all()
    )


@pytest.mark.usefixtures("vaco_table", "clean_index", "with_plugins")
class TestSubmit:
    def test_sends_gtfs_netex_and_gbfs_resources(self):
        organization = factories.Organization(ytunnus="9000001-1")
        dataset = create_dataset(
            organization,
            resources=[
                resource(
                    "https://feed.example/gtfs.zip",
                    "gtfs",
                    "GTFS",
                    name_translated={"en": "Timetables", "fi": "Aikataulut"},
                ),
                resource("https://feed.example/netex.zip", "netex", "ZIP"),
                resource("https://feed.example/gbfs.json", "gbfs", "JSON"),
                resource("https://feed.example/data.csv", "other", "CSV"),
            ],
        )
        client = FakeVacoClient()

        result = submit_all(client)

        assert (result.sent, result.failed, result.skipped) == (3, 0, 0)
        gtfs, netex, gbfs, _ = dataset["resources"]
        metadata = {
            "caller": "FINAP",
            "operator-name": organization["title"],
        }
        assert client.payloads == [
            {
                "url": "https://feed.example/gtfs.zip",
                "format": "gtfs",
                "name": f"{dataset['id']} (English title) / {gtfs['id']} (Timetables) / GTFS",
                "businessId": "9000001-1",
                "validations": [{"name": "gtfs.canonical"}],
                "context": gtfs["id"],
                "metadata": metadata,
                "notifications": ["foo@example.com"],
            },
            {
                "url": "https://feed.example/netex.zip",
                "format": "netex",
                "name": f"{dataset['id']} (English title) / {netex['id']} / NeTEx",
                "businessId": "9000001-1",
                "validations": [{"name": "netex.entur"}],
                "context": netex["id"],
                "metadata": metadata,
                "notifications": ["foo@example.com"],
            },
            {
                "url": "https://feed.example/gbfs.json",
                "format": "gbfs",
                "name": f"{dataset['id']} (English title) / {gbfs['id']} / GBFS",
                "businessId": "9000001-1",
                "validations": [{"name": "gbfs.entur"}],
                "context": gbfs["id"],
                "metadata": metadata,
                "notifications": ["foo@example.com"],
            },
        ]
        [validation] = entries_of(gtfs["id"])
        assert validation.package_id == dataset["id"]
        assert validation.entry_public_id == "entry-1"
        assert validation.status == "received"
        assert validation.magic_link == "https://vaco.example/ui/entry-1"
        assert not validation.complete
        assert validation.error is None

    def test_sends_every_contact_points_email_once_as_notifications(self):
        organization = factories.Organization(ytunnus="9000001-1")
        create_dataset(
            organization,
            contact_point=[
                {**CONTACT_POINT, "has_email": "first@example.com"},
                {**CONTACT_POINT, "has_email": "second@example.com"},
                {**CONTACT_POINT, "has_email": "first@example.com"},
            ],
            resources=[resource("https://feed.example/gtfs.zip", "gtfs", "GTFS")],
        )
        client = FakeVacoClient()

        submit_all(client)

        assert client.payloads[0]["notifications"] == [
            "first@example.com",
            "second@example.com",
        ]

    def test_leaves_out_private_datasets(self):
        organization = factories.Organization(ytunnus="9000001-1")
        create_dataset(
            organization,
            private=True,
            resources=[resource("https://feed.example/gtfs.zip", "gtfs", "GTFS")],
        )
        client = FakeVacoClient()

        submit_all(client)

        assert client.payloads == []

    def test_skips_an_organization_without_ytunnus(self):
        organization = factories.Organization()
        dataset = create_dataset(
            organization,
            resources=[resource("https://feed.example/gtfs.zip", "gtfs", "GTFS")],
        )
        client = FakeVacoClient()

        result = submit_all(client)

        assert (result.sent, result.failed, result.skipped) == (0, 0, 1)
        assert client.payloads == []
        assert entries_of(dataset["resources"][0]["id"]) == []

    def test_a_failed_send_is_recorded_and_the_rest_are_sent(self):
        organization = factories.Organization(ytunnus="9000001-1")
        dataset = create_dataset(
            organization,
            resources=[
                resource("https://feed.example/broken.zip", "gtfs", "GTFS"),
                resource("https://feed.example/gtfs.zip", "gtfs", "GTFS"),
            ],
        )
        client = FakeVacoClient(failing_url="https://feed.example/broken.zip")

        result = submit_all(client)

        assert (result.sent, result.failed) == (1, 1)
        broken, working = dataset["resources"]
        [failed] = entries_of(broken["id"])
        assert failed.entry_public_id is None
        assert failed.status == SEND_FAILED
        assert failed.complete
        assert "boom" in failed.error
        [sent] = entries_of(working["id"])
        assert sent.entry_public_id == "entry-2"

    def test_does_not_send_the_etag_vaco_stored_last_time(self):
        organization = factories.Organization(ytunnus="9000001-1")
        dataset = create_dataset(
            organization,
            resources=[resource("https://feed.example/gtfs.zip", "gtfs", "GTFS")],
        )
        resource_id = dataset["resources"][0]["id"]
        submit_all(FakeVacoClient())
        [first] = entries_of(resource_id)
        first.etag = '"feed-etag"'
        model.Session.commit()
        client = FakeVacoClient()

        submit_all(client)

        assert "etag" not in client.payloads[0]
        assert client.payloads[0]["context"] == resource_id
