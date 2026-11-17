import pytest
import requests
from ckanext.digitraffic_core.tests.vaco.test_client import FakeResponse
from ckanext.digitraffic_core.vaco import login as login_module
from ckanext.digitraffic_core.vaco.login import TrivoreLogin, TrivoreLoginError

TOKEN_URL = "https://id.example/openid/token"


@pytest.fixture
def token_requests(monkeypatch):
    calls = []
    answers = []
    now = [1000.0]

    def fake_post(url, **kwargs):
        calls.append({"url": url, **kwargs})
        answer = answers.pop(0)
        if isinstance(answer, Exception):
            raise answer
        return answer

    monkeypatch.setattr(login_module.requests, "post", fake_post)
    monkeypatch.setattr(login_module.time, "monotonic", lambda: now[0])
    return calls, answers, now


def token_answer(token, expires_in=604799):
    return FakeResponse(
        200, {"access_token": token, "token_type": "Bearer", "expires_in": expires_in}
    )


class TestTrivoreLogin:
    def test_asks_for_a_token_with_the_client_credentials(self, token_requests):
        calls, answers, _ = token_requests
        answers.append(token_answer("token-1"))

        header = TrivoreLogin(TOKEN_URL, "client", "secret").auth_header()

        assert header == {"Authorization": "Bearer token-1"}
        assert calls[0]["url"] == TOKEN_URL
        assert calls[0]["data"] == {
            "grant_type": "client_credentials",
            "client_id": "client",
            "client_secret": "secret",
            "scope": "openid",
        }

    def test_reuses_the_token_until_shortly_before_it_runs_out(self, token_requests):
        calls, answers, now = token_requests
        answers.extend(
            [token_answer("token-1", expires_in=3600), token_answer("token-2")]
        )
        login = TrivoreLogin(TOKEN_URL, "client", "secret")

        login.auth_header()
        now[0] += 3600 - login_module.EXPIRY_MARGIN_SECONDS - 1
        assert login.auth_header() == {"Authorization": "Bearer token-1"}
        now[0] += 1
        assert login.auth_header() == {"Authorization": "Bearer token-2"}
        assert len(calls) == 2

    @pytest.mark.parametrize(
        "answer",
        [
            FakeResponse(401, {"error": "invalid_client"}),
            FakeResponse(200, {"token_type": "Bearer"}),
            FakeResponse(502, None),
            requests.ConnectionError("no route"),
        ],
    )
    def test_a_failed_token_request_raises_without_the_secret(
        self, token_requests, answer
    ):
        _, answers, _ = token_requests
        answers.append(answer)

        with pytest.raises(TrivoreLoginError) as error:
            TrivoreLogin(TOKEN_URL, "client", "secret-value").auth_header()

        assert "secret-value" not in str(error.value)
