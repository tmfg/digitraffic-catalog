from rdflib import Graph, URIRef, FOAF, Literal

from ckanext.digitraffic_theme.profiles.graph_modifiers.literal_adder import LiteralAdder


def test_literal_adder_adds_literal():
    g = Graph()
    foo_name = "bar"
    subject = URIRef('example.com/foo')

    LiteralAdder.add_to_graph(g, subject, FOAF.name, Literal(foo_name))

    assert (subject, FOAF.name, Literal(foo_name)) in g

