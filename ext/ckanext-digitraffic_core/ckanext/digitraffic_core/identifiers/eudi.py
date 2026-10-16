"""European Digital Identity identifier of an organisation (EUDI); no format is fixed yet."""

from __future__ import annotations

from dataclasses import dataclass
from typing import ClassVar, Optional

from ckanext.digitraffic_core.identifiers.exceptions import InvalidIdentifier


@dataclass(frozen=True)
class Eudi:
    """A non-blank, trimmed EUDI; `parse()` is the only way to create one."""

    KEY: ClassVar[str] = "eudi"

    _value: str

    @classmethod
    def parse(cls, raw: Optional[str]) -> Eudi:
        """Trim the EUDI; any non-blank text is accepted, blank raises `InvalidIdentifier`."""
        text = raw.strip() if isinstance(raw, str) else ""
        if not text:
            raise InvalidIdentifier("An EUDI must not be blank.")
        return cls(text)

    def entity_keys(self) -> frozenset[tuple[str, str]]:
        """The stored `(key, value)` pair of this EUDI; it names no other identifier."""
        return frozenset({(self.KEY, self._value)})

    def __str__(self) -> str:
        return self._value

    def __repr__(self) -> str:
        return f"Eudi('{self._value}')"
