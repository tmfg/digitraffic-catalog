"""The identifiers of one organisation and the rules that need them together."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any, ClassVar, Mapping, Optional, Union

from ckanext.digitraffic_core.identifiers.eudi import Eudi
from ckanext.digitraffic_core.identifiers.euid import Euid
from ckanext.digitraffic_core.identifiers.exceptions import (
    IdentifierChangeNotAllowed,
    IdentifierMismatch,
    InvalidIdentifier,
    MissingIdentifier,
)
from ckanext.digitraffic_core.identifiers.ytunnus import Ytunnus

Identifier = Union[Ytunnus, Euid, Eudi]


def _is_blank(value: Any) -> bool:
    return value is None or (isinstance(value, str) and not value.strip())


@dataclass(frozen=True)
class OrganizationIdentifiers:
    """An organisation's Y-tunnus, EUID and EUDI, each optional; build it with `parse()` or `from_extras()`.

    A built aggregate is consistent: a Finnish trade register EUID names a valid Y-tunnus, and the
    Y-tunnus next to it is that one."""

    KEYS: ClassVar[tuple[str, ...]] = (Ytunnus.KEY, Euid.KEY, Eudi.KEY)

    _ytunnus: Optional[Ytunnus] = None
    _euid: Optional[Euid] = None
    _eudi: Optional[Eudi] = None

    def __post_init__(self) -> None:
        named = self._ytunnus_of_euid()
        if named is not None and self._ytunnus is not None and named != self._ytunnus:
            raise IdentifierMismatch(
                f"The Finnish EUID '{self._euid}' does not match the Y-tunnus '{self._ytunnus}'."
            )

    @classmethod
    def parse(
        cls, ytunnus: Optional[str] = None, euid: Optional[str] = None, eudi: Optional[str] = None
    ) -> OrganizationIdentifiers:
        """Normalise raw values; a blank value counts as not given.

        Raises `InvalidIdentifier` for a malformed value, `InvalidFinnishEuid` for a Finnish trade register
        EUID without a valid Y-tunnus and `IdentifierMismatch` for one of another company than the Y-tunnus. Having no identifier at all is allowed here; see `require_any()`."""
        return cls(
            None if _is_blank(ytunnus) else Ytunnus.parse(ytunnus),
            None if _is_blank(euid) else Euid.parse(euid),
            None if _is_blank(eudi) else Eudi.parse(eudi),
        )

    @classmethod
    def from_extras(cls, extras: Mapping[str, Any]) -> OrganizationIdentifiers:
        """Rebuild the identifiers from an organisation's stored extras; other keys are ignored."""
        return cls.parse(*(extras.get(key) for key in cls.KEYS))

    def require_any(self) -> None:
        """Raise `MissingIdentifier` unless at least one identifier is given."""
        if not self._identifiers():
            raise MissingIdentifier("An organisation needs a Y-tunnus, an EUID or an EUDI.")

    def collect_entity_keys(self) -> frozenset[tuple[str, str]]:
        """The stored `(key, value)` pairs naming the same legal entity as any of these identifiers;
        a Finnish trade register EUID also names its Y-tunnus."""
        named = self._ytunnus_of_euid()
        identifiers = self._identifiers() + ([named] if named is not None else [])
        return frozenset().union(*(identifier.entity_keys() for identifier in identifiers))

    def keep_stored(self, key: str, submitted: Optional[str]) -> Optional[str]:
        """The value to store for someone who may not set or change identifiers.

        A blank submission or the stored identifier in another accepted form keeps the stored value
        (`None` when nothing is stored); anything else raises `IdentifierChangeNotAllowed`."""
        stored = self._identifier(key)
        if _is_blank(submitted):
            return None if stored is None else str(stored)
        if stored is None or not self._is_same(stored, submitted):
            raise IdentifierChangeNotAllowed(f"The {key} cannot be set or changed here.")
        return str(stored)

    def to_extras(self) -> dict[str, str]:
        """The given identifiers in their stored form, keyed by their `group_extra` key."""
        return {identifier.KEY: str(identifier) for identifier in self._identifiers()}

    def _identifier(self, key: str) -> Optional[Identifier]:
        if key not in self.KEYS:
            raise KeyError(f"Not an organisation identifier key: {key!r}")
        return {Ytunnus.KEY: self._ytunnus, Euid.KEY: self._euid, Eudi.KEY: self._eudi}[key]

    def _ytunnus_of_euid(self) -> Optional[Ytunnus]:
        return None if self._euid is None else Ytunnus.from_finnish_euid(self._euid)

    def _identifiers(self) -> list[Identifier]:
        return [identifier for identifier in (self._ytunnus, self._euid, self._eudi) if identifier is not None]

    @staticmethod
    def _is_same(stored: Identifier, submitted: Any) -> bool:
        try:
            return type(stored).parse(submitted) == stored
        except InvalidIdentifier:
            return False
