import logging
import time
from typing import Optional

import requests

log = logging.getLogger(__name__)

# A new token is fetched this long before the old one runs out
EXPIRY_MARGIN_SECONDS = 60
SCOPE = "openid"


class TrivoreLoginError(Exception):
    pass


class TrivoreLogin:
    """Logs the catalog in to VACO through Trivore ID with the catalog's client id and secret."""

    def __init__(
        self,
        token_url: str,
        client_id: str,
        client_secret: str,
        timeout: float = 30,
    ):
        self._token_url = token_url
        self._client_id = client_id
        self._client_secret = client_secret
        self._timeout = timeout
        self._token: Optional[str] = None
        self._expires_at = 0.0

    def auth_header(self) -> dict[str, str]:
        """The `Authorization` header for calls to VACO. The token is reused until shortly before it runs out."""
        if self._token is None or time.monotonic() >= self._expires_at:
            self._fetch_token()
        return {"Authorization": f"Bearer {self._token}"}

    def _fetch_token(self) -> None:
        form = {
            "grant_type": "client_credentials",
            "client_id": self._client_id,
            "client_secret": self._client_secret,
            "scope": SCOPE,
        }
        requested_at = time.monotonic()
        log.info(
            "Getting a VACO access token from %s for client %s",
            self._token_url,
            self._client_id,
        )
        try:
            response = requests.post(self._token_url, data=form, timeout=self._timeout)
        except requests.RequestException as e:
            raise TrivoreLoginError(f"Trivore token request failed: {e}") from e
        try:
            body = response.json()
        except ValueError:
            body = None
        token = body.get("access_token") if isinstance(body, dict) else None
        if not response.ok or not token:
            answer = body if isinstance(body, dict) else {}
            raise TrivoreLoginError(
                f"Trivore token request returned {response.status_code}: "
                f"error={answer.get('error')}, error_description={answer.get('error_description')}"
            )
        self._token = token
        expires_in = body.get("expires_in")
        log.info(
            "Got a VACO access token of type %s, valid for %s seconds",
            body.get("token_type"),
            expires_in,
        )
        self._expires_at = (
            requested_at + float(expires_in) - EXPIRY_MARGIN_SECONDS
            if expires_in
            else requested_at
        )
