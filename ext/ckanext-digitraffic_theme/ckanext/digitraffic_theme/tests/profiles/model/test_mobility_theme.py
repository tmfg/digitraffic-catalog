import pytest

from ckanext.digitraffic_theme.model.mobility_theme import MobilityTheme


def test_create_valid_mobility_theme():
    space_travel = 'https://w3id.org/mobilitydcat-ap/mobility-theme/air-and-space-travel'
    mobility_theme = MobilityTheme.create(space_travel)

    assert str(mobility_theme.iri) == space_travel


def test_invalid_mobility_theme_throws():
    with pytest.raises(Exception) as e:
        MobilityTheme.create('foo')
    assert e.match(r'is not a valid iri of the class')
