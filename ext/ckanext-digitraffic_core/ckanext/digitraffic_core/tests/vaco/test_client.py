from typing import Any, Optional

import pytest
from ckanext.digitraffic_core.vaco import client as client_module
from ckanext.digitraffic_core.vaco.client import VacoApiError, VacoClient


class FakeResponse:
    def __init__(
        self, status_code: int, body: Optional[Any], headers: Optional[dict] = None
    ):
        self.status_code = status_code
        self.ok = 200 <= status_code < 400
        self._body = body
        self.text = "not json" if body is None else str(body)
        self.headers = headers or {}

    def json(self):
        if self._body is None:
            raise ValueError("not json")
        return self._body


def fixed_token():
    return {"Authorization": "Bearer test-token"}


@pytest.fixture
def requests_made(monkeypatch):
    calls = []
    answers = []

    def fake_request(method, url, **kwargs):
        calls.append({"method": method, "url": url, **kwargs})
        return answers.pop(0)

    monkeypatch.setattr(client_module.requests, "request", fake_request)
    return calls, answers


class TestVacoClient:
    def test_queue_create_posts_the_payload_with_the_login_header(self, requests_made):
        calls, answers = requests_made
        answer = {"data": {"publicId": "abc"}, "error": None, "links": {}}
        answers.append(FakeResponse(200, answer))
        client = VacoClient(
            "https://vaco.example/", fixed_token, seconds_between_calls=0
        )

        assert client.queue_create({"url": "https://feed.example/gtfs.zip"}) == answer
        assert calls[0]["method"] == "POST"
        assert calls[0]["url"] == "https://vaco.example/api/queue"
        assert calls[0]["json"] == {"url": "https://feed.example/gtfs.zip"}
        assert calls[0]["headers"] == {"Authorization": "Bearer test-token"}

    def test_queue_fetch_gets_the_entry(self, requests_made):
        calls, answers = requests_made
        answer = {
            "data": {"publicId": "abc", "status": "success"},
            "error": None,
            "links": {},
        }
        answers.append(FakeResponse(200, answer))
        client = VacoClient(
            "https://vaco.example", fixed_token, seconds_between_calls=0
        )

        assert client.queue_fetch("abc") == answer
        assert calls[0]["method"] == "GET"
        assert calls[0]["url"] == "https://vaco.example/api/queue/abc"
        assert calls[0]["headers"] == {"Authorization": "Bearer test-token"}

    @pytest.mark.parametrize(
        "response",
        [
            FakeResponse(
                400, {"data": None, "error": "businessId missing", "links": {}}
            ),
            FakeResponse(
                200, {"data": None, "error": "something went wrong", "links": {}}
            ),
            FakeResponse(502, None),
        ],
    )
    def test_an_error_answer_raises(self, requests_made, response):
        _, answers = requests_made
        answers.append(response)
        client = VacoClient(
            "https://vaco.example", fixed_token, seconds_between_calls=0
        )

        with pytest.raises(VacoApiError):
            client.queue_create({})

    def test_a_rejected_token_raises_with_the_reason(self, requests_made):
        _, answers = requests_made
        reason = (
            'Bearer error="invalid_token", error_description="Client is not allowed"'
        )
        answers.append(FakeResponse(401, None, {"WWW-Authenticate": reason}))
        client = VacoClient(
            "https://vaco.example", fixed_token, seconds_between_calls=0
        )

        with pytest.raises(VacoApiError, match="Client is not allowed"):
            client.queue_create({})

    def test_calls_are_spaced_apart(self, requests_made, monkeypatch):
        _, answers = requests_made
        answers.extend(FakeResponse(200, {"data": {}, "links": {}}) for _ in range(2))
        now = [100.0]
        sleeps = []
        monkeypatch.setattr(client_module.time, "monotonic", lambda: now[0])
        monkeypatch.setattr(client_module.time, "sleep", sleeps.append)
        client = VacoClient(
            "https://vaco.example", fixed_token, seconds_between_calls=7.2
        )

        client.queue_create({})
        now[0] += 2.0
        client.queue_create({})

        assert sleeps == [pytest.approx(5.2)]
