from datetime import datetime, timedelta, timezone

import pytest
import requests
from ckan import model
from ckanext.digitraffic_core.orm_model.vaco_validation import VacoValidation
from ckanext.digitraffic_core.tests.vaco.conftest import FakeVacoClient
from ckanext.digitraffic_core.vaco.client import VacoApiError
from ckanext.digitraffic_core.vaco.poll import FEED_UNCHANGED, poll_all


def sent(public_id, submitted_at=None, complete=False):
    validation = VacoValidation(
        f"resource-of-{public_id}",
        "package-id",
        submitted_at or datetime.now(timezone.utc),
        entry_public_id=public_id,
        status="received",
        complete=complete,
    )
    model.Session.add(validation)
    model.Session.commit()
    return validation.id


def entry(status, tasks, etag=None):
    return {
        "status": status,
        "etag": etag,
        "tasks": [
            {"name": name, "status": task_status} for name, task_status in tasks.items()
        ],
    }


def row(validation_id):
    model.Session.expire_all()
    return model.Session.get(VacoValidation, validation_id)


@pytest.mark.usefixtures("vaco_table")
class TestPoll:
    def test_a_finished_request_stores_the_validation_result_and_etag(self):
        validation_id = sent("entry-1")
        client = FakeVacoClient(
            entries={
                "entry-1": entry(
                    "warnings",
                    {"prepare.download": "success", "gtfs.canonical": "warnings"},
                    etag='"feed-etag"',
                )
            }
        )

        result = poll_all(client)

        assert (result.finished, result.unfinished, result.failed) == (1, 0, 0)
        validation = row(validation_id)
        assert validation.complete
        assert validation.status == "warnings"
        assert validation.validation_status == "warnings"
        assert validation.etag == '"feed-etag"'
        assert validation.polled_at is not None

    def test_a_request_still_in_progress_stays_unfinished(self):
        validation_id = sent("entry-1")
        client = FakeVacoClient(
            entries={
                "entry-1": entry(
                    "processing",
                    {"prepare.download": "success", "netex.entur": "processing"},
                    etag='"feed-etag"',
                )
            }
        )

        result = poll_all(client)

        assert (result.finished, result.unfinished) == (0, 1)
        validation = row(validation_id)
        assert not validation.complete
        assert validation.status == "processing"
        assert validation.validation_status == "processing"
        assert validation.etag is None

    def test_a_skipped_download_is_recorded_as_feed_unchanged(self):
        validation_id = sent("entry-1")
        client = FakeVacoClient(
            entries={
                "entry-1": entry(
                    "cancelled",
                    {"prepare.download": "cancelled", "gtfs.canonical": "cancelled"},
                    etag='"feed-etag"',
                )
            }
        )

        poll_all(client)

        validation = row(validation_id)
        assert validation.complete
        assert validation.status == FEED_UNCHANGED
        assert validation.etag == '"feed-etag"'

    @pytest.mark.parametrize(
        "error",
        [requests.ConnectionError("no route"), VacoApiError("GET returned 502: boom")],
    )
    def test_a_failed_poll_is_tried_again_on_the_next_run(self, error):
        validation_id = sent("entry-1")

        result = poll_all(FakeVacoClient(entries={"entry-1": error}))

        assert result.failed == 1
        validation = row(validation_id)
        assert not validation.complete
        assert validation.error

    def test_only_unfinished_requests_from_the_last_7_days_are_polled(self):
        sent("recent")
        sent("old", submitted_at=datetime.now(timezone.utc) - timedelta(days=8))
        sent("finished", complete=True)
        model.Session.add(
            VacoValidation(
                "resource-not-sent",
                "package-id",
                datetime.now(timezone.utc),
                status="send_failed",
                complete=False,
            )
        )
        model.Session.commit()
        client = FakeVacoClient(
            entries={"recent": entry("processing", {"gtfs.canonical": "processing"})}
        )

        poll_all(client)

        assert client.fetched == ["recent"]
