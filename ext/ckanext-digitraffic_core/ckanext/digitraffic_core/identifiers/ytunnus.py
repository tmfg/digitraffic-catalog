"""Finnish business identifier (Y-tunnus), stored as `1234567-8`, and its EUID in the Finnish trade register."""

from __future__ import annotations

import re
from dataclasses import dataclass
from typing import ClassVar, Optional

from ckanext.digitraffic_core.identifiers.euid import Euid
from ckanext.digitraffic_core.identifiers.exceptions import (
    InvalidFinnishEuid,
    InvalidIdentifier,
)


@dataclass(frozen=True)
class Ytunnus:
    """A checksum-valid Y-tunnus; `parse()` is the only way to create one from a raw string."""

    KEY: ClassVar[str] = "ytunnus"
    FINNISH_REGISTER: ClassVar[str] = "FIFPRO"

    _WEIGHTS: ClassVar[tuple[int, ...]] = (7, 9, 10, 5, 8, 4, 2)
    _STORED_FORM: ClassVar[re.Pattern[str]] = re.compile(r"([0-9]{7})-([0-9])")

    _value: str

    @classmethod
    def parse(cls, raw: Optional[str]) -> Ytunnus:
        """Accept exactly the stored form `1234567-8`, surrounding whitespace trimmed.

        Raises `InvalidIdentifier` for anything else, including a check digit that does not match."""
        text = raw.strip() if isinstance(raw, str) else ""
        match = cls._STORED_FORM.fullmatch(text)
        if match is None:
            raise InvalidIdentifier(f"'{raw}' is not a Y-tunnus; expected the form 1234567-8.")
        body, check = match.groups()
        if cls._check_digit(body) != int(check):
            raise InvalidIdentifier(
                f"'{raw}' is not a valid Y-tunnus: the check digit does not match."
            )
        return cls(text)

    @classmethod
    def from_finnish_euid(cls, euid: Euid) -> Optional[Ytunnus]:
        """The Y-tunnus a Finnish trade register EUID (`FIFPRO.1234567-8`) names; `None` for another register.

        Raises `InvalidFinnishEuid` when the registration number is not a valid Y-tunnus in the stored form."""
        register, _, number = str(euid).partition(".")
        if register != cls.FINNISH_REGISTER:
            return None
        try:
            return cls.parse(number)
        except InvalidIdentifier:
            raise InvalidFinnishEuid(
                f"'{euid}' is not a valid Finnish EUID: the registration number must be a valid Y-tunnus."
            ) from None

    @classmethod
    def _check_digit(cls, body: str) -> Optional[int]:
        """The mod-11 check digit of a seven-digit body, or `None` when no digit is valid."""
        remainder = sum(int(digit) * weight for digit, weight in zip(body, cls._WEIGHTS)) % 11
        if remainder == 0:
            return 0
        if remainder == 1:
            return None
        return 11 - remainder

    def as_finnish_euid(self) -> Euid:
        """The company's EUID in the Finnish trade register, `FIFPRO.{y-tunnus}`."""
        return Euid.parse(f"{self.FINNISH_REGISTER}.{self._value}")

    def entity_keys(self) -> frozenset[tuple[str, str]]:
        """The stored `(key, value)` pairs that name this company: the Y-tunnus and its Finnish EUID."""
        euid = self.as_finnish_euid()
        return frozenset({(self.KEY, self._value), (euid.KEY, str(euid))})

    def __str__(self) -> str:
        return self._value

    def __repr__(self) -> str:
        return f"Ytunnus('{self._value}')"
