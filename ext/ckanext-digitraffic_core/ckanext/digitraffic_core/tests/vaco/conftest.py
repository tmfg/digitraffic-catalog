from typing import Any, Optional

import pytest
from ckanext.digitraffic_core.vaco.client import VacoApiError


@pytest.fixture
def vaco_table(clean_db, with_plugins, migrate_db_for):
    migrate_db_for("digitraffic_core")


class FakeVacoClient:
    """Answers validation requests the way VACO does, without calling it."""

    queue_url = "https://vaco.example/api/queue"

    def __init__(
        self,
        failing_url: Optional[str] = None,
        entries: Optional[dict[str, Any]] = None,
    ):
        self.payloads: list[dict[str, Any]] = []
        self.fetched: list[str] = []
        self._failing_url = failing_url
        # Entry public id -> the entry VACO returns, or an exception to raise
        self._entries = entries or {}

    def queue_create(self, payload: dict[str, Any]) -> dict[str, Any]:
        self.payloads.append(payload)
        if payload["url"] == self._failing_url:
            raise VacoApiError("POST /api/queue returned 500: boom")
        public_id = f"entry-{len(self.payloads)}"
        return {
            "data": {"publicId": public_id, "status": "received"},
            "error": None,
            "links": {
                "refs": {"magic": {"href": f"https://vaco.example/ui/{public_id}"}}
            },
        }

    def queue_fetch(self, public_id: str) -> dict[str, Any]:
        self.fetched.append(public_id)
        entry = self._entries[public_id]
        if isinstance(entry, Exception):
            raise entry
        return {"data": entry, "error": None, "links": {}}
