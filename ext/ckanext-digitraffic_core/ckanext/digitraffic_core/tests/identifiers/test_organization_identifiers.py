"""An organisation's identifiers as one aggregate: Finnish rules, stored form and restricted changes."""

import pytest

from ckanext.digitraffic_core.identifiers.exceptions import (
    IdentifierChangeNotAllowed,
    IdentifierMismatch,
    InvalidFinnishEuid,
    InvalidIdentifier,
    MissingIdentifier,
)
from ckanext.digitraffic_core.identifiers.organization_identifiers import (
    OrganizationIdentifiers,
)
from ckanext.digitraffic_core.tests.identifiers.rule_table import read_rule_cases


@pytest.mark.parametrize(
    ("kind", "value", "expected"),
    read_rule_cases("finnish-euid"),
    ids=lambda v: repr(v),
)
def test_rule_table_finnish_euid(kind, value, expected):
    if expected == "ERROR":
        with pytest.raises(InvalidIdentifier):
            OrganizationIdentifiers.parse(euid=value)
    else:
        assert OrganizationIdentifiers.parse(euid=value).to_extras() == {"euid": expected}


@pytest.mark.parametrize(
    "euid", ["FIFPRO.90000011", "FIFPRO.9000001-2", "FIFPRO.FI9000001-1", "FIFPRO.9000001/1"]
)
def test_finnish_euid_without_a_valid_ytunnus_is_an_invalid_finnish_euid(euid):
    with pytest.raises(InvalidFinnishEuid):
        OrganizationIdentifiers.parse(euid=euid)


@pytest.mark.parametrize("blank", [None, "", "   "])
def test_blank_identifiers_are_not_given(blank):
    identifiers = OrganizationIdentifiers.parse(ytunnus=blank, euid=blank, eudi=blank)

    assert identifiers.to_extras() == {}
    with pytest.raises(MissingIdentifier):
        identifiers.require_any()


def test_an_eudi_alone_is_enough():
    identifiers = OrganizationIdentifiers.parse(eudi="eudi-example-1")

    identifiers.require_any()


def test_identifiers_are_stored_trimmed():
    identifiers = OrganizationIdentifiers.parse(ytunnus=" 9000001-1 ", euid=" FIFPRO.9000001-1 ")

    assert identifiers.to_extras() == {"ytunnus": "9000001-1", "euid": "FIFPRO.9000001-1"}


def test_finnish_euid_of_another_company_is_a_mismatch():
    with pytest.raises(IdentifierMismatch):
        OrganizationIdentifiers.parse(ytunnus="9000001-1", euid="FIFPRO.9000003-8")


def test_invalid_finnish_euid_next_to_a_ytunnus_is_not_a_mismatch():
    with pytest.raises(InvalidFinnishEuid):
        OrganizationIdentifiers.parse(ytunnus="9000001-1", euid="FIFPRO.90000011")


def test_foreign_euid_next_to_a_ytunnus_is_accepted():
    identifiers = OrganizationIdentifiers.parse(ytunnus="9000001-1", euid="SEBOLREG.9000000001")

    assert identifiers.to_extras() == {"ytunnus": "9000001-1", "euid": "SEBOLREG.9000000001"}


def test_rebuilt_from_stored_extras_keeps_only_the_identifiers():
    extras = {"ytunnus": "9000001-1", "eudi": "eudi-example-1", "foo": "bar"}

    identifiers = OrganizationIdentifiers.from_extras(extras)

    assert identifiers.to_extras() == {"ytunnus": "9000001-1", "eudi": "eudi-example-1"}


@pytest.mark.parametrize("submitted", [None, "", "  ", " 9000001-1 ", "9000001-1"])
def test_blank_or_the_same_ytunnus_keeps_the_stored_one(submitted):
    stored = OrganizationIdentifiers.from_extras({"ytunnus": "9000001-1"})

    kept = stored.keep_stored("ytunnus", submitted)

    assert kept == "9000001-1"


@pytest.mark.parametrize("submitted", ["FI90000011", "9000003-8", "not-an-id"])
def test_another_ytunnus_is_not_allowed(submitted):
    stored = OrganizationIdentifiers.from_extras({"ytunnus": "9000001-1"})

    with pytest.raises(IdentifierChangeNotAllowed):
        stored.keep_stored("ytunnus", submitted)


def test_blank_identifier_without_a_stored_one_keeps_nothing():
    stored = OrganizationIdentifiers.from_extras({"ytunnus": "9000001-1"})

    kept = stored.keep_stored("euid", "")

    assert kept is None


def test_identifier_cannot_be_added_where_none_is_stored():
    stored = OrganizationIdentifiers.from_extras({"ytunnus": "9000001-1"})

    with pytest.raises(IdentifierChangeNotAllowed):
        stored.keep_stored("euid", "FIFPRO.9000001-1")


def test_finnish_euid_also_names_its_ytunnus():
    identifiers = OrganizationIdentifiers.parse(euid="FIFPRO.9000001-1")

    keys = identifiers.collect_entity_keys()

    assert keys == {("ytunnus", "9000001-1"), ("euid", "FIFPRO.9000001-1")}


def test_entity_keys_of_all_identifiers_are_collected():
    identifiers = OrganizationIdentifiers.parse(ytunnus="9000001-1", euid="SEBOLREG.9000000001")

    keys = identifiers.collect_entity_keys()

    assert keys == {
        ("ytunnus", "9000001-1"),
        ("euid", "FIFPRO.9000001-1"),
        ("euid", "SEBOLREG.9000000001"),
    }
