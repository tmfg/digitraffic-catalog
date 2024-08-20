import pytest
from rdflib import Graph, URIRef

from ckanext.digitraffic_theme.profiles.graph_modifiers.vocabulary_adder import VocabularyAdder
from ckanext.digitraffic_theme.profiles.model.mobility_theme import MobilityTheme
from ckanext.digitraffic_theme.profiles.rdf.mobility_dcat_ap import MOBILITYDCATAP


def test_literal_adder_adds_literal():
    g = Graph()
    subject = URIRef('example.com/foo')
    mobility_theme = MobilityTheme("https://w3id.org/mobilitydcat-ap/mobility-theme/waterways-and-water-bodies")

    VocabularyAdder.add_to_graph(g, subject, MOBILITYDCATAP.mobilityTheme, mobility_theme)

    assert (subject, MOBILITYDCATAP.mobilityTheme, mobility_theme.iri) in g

