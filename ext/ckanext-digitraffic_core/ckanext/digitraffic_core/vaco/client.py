import logging
import time
from typing import Any, Callable, Optional

import requests

log = logging.getLogger(__name__)

# FINAP's limit: at most 500 calls to VACO per hour
SECONDS_BETWEEN_CALLS = 3600 / 500


class VacoApiError(Exception):
    pass


class VacoClient:
    def __init__(
        self,
        api_base_url: str,
        auth_header: Callable[[], dict[str, str]],
        seconds_between_calls: float = SECONDS_BETWEEN_CALLS,
        timeout: float = 60,
    ):
        self._api_base_url = api_base_url.rstrip("/")
        self._auth_header = auth_header
        self._seconds_between_calls = seconds_between_calls
        self._timeout = timeout
        self._last_call: Optional[float] = None

    @property
    def queue_url(self) -> str:
        return self._api_base_url + "/api/queue"

    def queue_create(self, payload: dict[str, Any]) -> dict[str, Any]:
        """Send a validation request ("entry" on the VACO side). Returns `{data, error, links}`."""
        return self._request("POST", self.queue_url, json=payload)

    def _request(self, method: str, url: str, **kwargs: Any) -> dict[str, Any]:
        self._wait_for_turn()
        log.debug("%s %s request body: %s", method, url, kwargs.get("json"))
        response = requests.request(
            method,
            url,
            headers=self._auth_header(),
            timeout=self._timeout,
            **kwargs,
        )
        try:
            body = response.json()
        except ValueError:
            body = None
        log.info("%s %s returned %s", method, url, response.status_code)
        log.debug(
            "%s %s answer: %s", method, url, body if body is not None else response.text
        )
        if not response.ok or not isinstance(body, dict) or body.get("error"):
            error = body.get("error") if isinstance(body, dict) else response.text
            # VACO gives the reason for a rejected token only in this header, the body is empty
            rejection = response.headers.get("WWW-Authenticate")
            if rejection:
                error = f"{error} (WWW-Authenticate: {rejection})"
            raise VacoApiError(
                f"{method} {url} returned {response.status_code}: {error}"
            )
        return body

    def _wait_for_turn(self) -> None:
        if self._last_call is not None:
            wait = self._last_call + self._seconds_between_calls - time.monotonic()
            if wait > 0:
                time.sleep(wait)
        self._last_call = time.monotonic()
