import pytest

from ckanext.digitraffic_core.vaco.resources import feed_url, vaco_format

STANDARD = "https://w3id.org/mobilitydcat-ap/mobility-data-standard/"


class TestVacoFormat:
    @pytest.mark.parametrize(
        "standard, expected",
        [("gtfs", "gtfs"), ("netex", "netex"), ("gbfs", "gbfs"), ("datex-II", None)],
    )
    def test_by_mobility_data_standard(self, standard, expected):
        assert vaco_format({"mobility_data_standard": STANDARD + standard}) == expected

    def test_gtfs_file_type_with_another_standard(self):
        resource = {
            "mobility_data_standard": STANDARD + "other",
            "format": "GTFS",
            "format_iri": "http://publications.europa.eu/resource/authority/file-type/GTFS",
        }

        assert vaco_format(resource) == "gtfs"

    def test_converted_resource_is_sent_for_validation(self):
        resource = {
            "mobility_data_standard": STANDARD + "netex",
            "converted_from": "source-resource-id",
        }

        assert vaco_format(resource) == "netex"


class TestFeedUrl:
    def test_download_url_comes_first(self):
        resource = {"url": "https://example.com/page", "download_url": "https://example.com/feed.zip"}

        assert feed_url(resource) == "https://example.com/feed.zip"

    def test_url_when_no_download_url(self):
        assert feed_url({"url": "https://example.com/feed.zip", "download_url": ""}) == (
            "https://example.com/feed.zip"
        )
