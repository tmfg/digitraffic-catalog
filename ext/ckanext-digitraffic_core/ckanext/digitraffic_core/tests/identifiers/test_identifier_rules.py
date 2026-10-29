"""Y-tunnus, EUID and EUDI value objects, driven by the rule table shared with the FINAP migration."""

import pytest

from ckanext.digitraffic_core.identifiers.eudi import Eudi
from ckanext.digitraffic_core.identifiers.euid import Euid
from ckanext.digitraffic_core.identifiers.exceptions import (
    InvalidFinnishEuid,
    InvalidIdentifier,
)
from ckanext.digitraffic_core.identifiers.ytunnus import Ytunnus
from ckanext.digitraffic_core.tests.identifiers.rule_table import read_rule_cases

IDENTIFIER_CLASSES = {"ytunnus": Ytunnus, "euid": Euid, "eudi": Eudi}


@pytest.mark.parametrize(
    ("kind", "value", "expected"),
    read_rule_cases(*IDENTIFIER_CLASSES),
    ids=lambda v: repr(v),
)
def test_rule_table(kind, value, expected):
    identifier_class = IDENTIFIER_CLASSES[kind]

    if expected == "ERROR":
        with pytest.raises(InvalidIdentifier):
            identifier_class.parse(value)
    else:
        assert str(identifier_class.parse(value)) == expected


@pytest.mark.parametrize("identifier_class", [Ytunnus, Euid, Eudi])
def test_nothing_given_is_not_an_identifier(identifier_class):
    with pytest.raises(InvalidIdentifier):
        identifier_class.parse(None)


@pytest.mark.parametrize("value", ["９０００００１-１", "900000١-1"])
def test_only_ascii_digits_count_as_ytunnus_digits(value):
    with pytest.raises(InvalidIdentifier):
        Ytunnus.parse(value)


def test_ytunnus_has_a_finnish_euid():
    ytunnus = Ytunnus.parse("9000001-1")

    euid = ytunnus.as_finnish_euid()

    assert euid == Euid.parse("FIFPRO.9000001-1")


def test_finnish_euid_names_its_ytunnus():
    euid = Euid.parse("FIFPRO.9000001-1")

    ytunnus = Ytunnus.from_finnish_euid(euid)

    assert ytunnus == Ytunnus.parse("9000001-1")


def test_euid_of_another_register_names_no_ytunnus():
    euid = Euid.parse("SEBOLREG.9000000001")

    ytunnus = Ytunnus.from_finnish_euid(euid)

    assert ytunnus is None


@pytest.mark.parametrize(
    "value", ["FIFPRO.90000011", "FIFPRO.9000001-2", "FIFPRO.FI9000001-1", "FIFPRO.900000١-1"]
)
def test_finnish_euid_without_a_stored_form_ytunnus_is_invalid(value):
    euid = Euid.parse(value)

    with pytest.raises(InvalidFinnishEuid):
        Ytunnus.from_finnish_euid(euid)


def test_ytunnus_names_the_same_entity_as_its_finnish_euid():
    ytunnus = Ytunnus.parse("9000001-1")

    keys = ytunnus.entity_keys()

    assert keys == {("ytunnus", "9000001-1"), ("euid", "FIFPRO.9000001-1")}


@pytest.mark.parametrize(
    ("identifier_class", "value"),
    [
        (Euid, "FIFPRO.9000001-1"),
        (Euid, "SEBOLREG.9000000001"),
        (Eudi, "eudi-example-1"),
    ],
)
def test_euid_and_eudi_are_only_their_own_entity_key(identifier_class, value):
    identifier = identifier_class.parse(value)

    keys = identifier.entity_keys()

    assert keys == {(identifier_class.KEY, value)}


def test_same_identifier_with_surrounding_whitespace_is_equal():
    padded = Ytunnus.parse(" 9000003-8 ")
    stored = Ytunnus.parse("9000003-8")

    assert padded == stored
    assert hash(padded) == hash(stored)


@pytest.mark.parametrize(
    ("identifier_class", "value"),
    [(Ytunnus, "9000001-1"), (Euid, "FIFPRO.9000001-1"), (Eudi, "eudi-example-1")],
)
def test_identifier_cannot_be_changed(identifier_class, value):
    identifier = identifier_class.parse(value)

    with pytest.raises(AttributeError):
        identifier.value = "9000003-8"
