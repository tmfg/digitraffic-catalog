"""European Unique Identifier (EUID) of a company in an EU business register."""

from __future__ import annotations

import re
from dataclasses import dataclass
from typing import ClassVar, Optional

from ckanext.digitraffic_core.identifiers.exceptions import InvalidIdentifier


@dataclass(frozen=True)
class Euid:
    """A well-formed EUID, stored as entered; `parse()` is the only way to create one.

    Follows the BRIS EUID structure (country code, register identifier, registration number,
    optional verification digit): `{country}{register}.{registration number}`, e.g. `EEARIREG.12345678`.
    National rules for the registration number are not checked here."""

    KEY: ClassVar[str] = "euid"

    _SHAPE: ClassVar[re.Pattern[str]] = re.compile(r"[A-Z]{2}[A-Z0-9]+\.\S+")

    _value: str

    @classmethod
    def parse(cls, raw: Optional[str]) -> Euid:
        """Accept an EUID with surrounding whitespace trimmed; raise `InvalidIdentifier` for anything else."""
        text = raw.strip() if isinstance(raw, str) else ""
        if cls._SHAPE.fullmatch(text) is None:
            raise InvalidIdentifier(
                f"'{raw}' is not an EUID; expected a country code, a register code, a dot "
                "and a registration number, e.g. FIFPRO.1234567-8."
            )
        return cls(text)

    def entity_keys(self) -> frozenset[tuple[str, str]]:
        """The stored `(key, value)` pair of this EUID."""
        return frozenset({(self.KEY, self._value)})

    def __str__(self) -> str:
        return self._value

    def __repr__(self) -> str:
        return f"Euid('{self._value}')"
