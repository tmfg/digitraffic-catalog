from rdflib import Graph, URIRef, Literal
from rdflib.namespace import FOAF, DCTERMS

from ckanext.digitraffic_core.model.organization import Organization
from ckanext.digitraffic_core.profiles.graph_modifiers.adder import (
    add_class_instance_with_children,
    add_class_instance_to_graph,
    add_literal_to_graph,
    add_vocabulary_to_graph,
)
from ckanext.digitraffic_core.model.mobility_theme import MobilityTheme
from ckanext.digitraffic_core.rdf.mobility_dcat_ap import MOBILITYDCATAP


def test_add_class_instance_with_children_adds_correctly():
    g = Graph()
    subject = URIRef("example.com/foo")
    agent_iri = URIRef("example.com/agent")
    agent = Organization(agent_iri, {"name": Literal("foo")})

    add_class_instance_with_children(g, subject, DCTERMS.publisher, agent)

    assert (subject, DCTERMS.publisher, agent_iri) in g
    for p, o in agent.predicate_objects():
        assert (agent_iri, p, o) in g


def test_add_class_instance_to_graph_adds_correctly():
    g = Graph()
    subject = URIRef("example.com/foo")
    agent_iri = URIRef("example.com/agent")
    agent = Organization(agent_iri, {"name": Literal("foo")})

    add_class_instance_to_graph(g, subject, DCTERMS.publisher, agent)

    assert (subject, DCTERMS.publisher, agent_iri) in g


def test_add_literal_to_graph_adds_correctly():
    g = Graph()
    foo_name = "bar"
    subject = URIRef("example.com/foo")

    add_literal_to_graph(g, subject, FOAF.name, Literal(foo_name))

    assert (subject, FOAF.name, Literal(foo_name)) in g


def test_add_vocabulary_to_graph_adds_correctly():
    g = Graph()
    subject = URIRef("example.com/foo")
    mobility_theme = MobilityTheme(
        "https://w3id.org/mobilitydcat-ap/mobility-theme/waterways-and-water-bodies"
    )

    add_vocabulary_to_graph(g, subject, MOBILITYDCATAP.mobilityTheme, mobility_theme)

    assert (subject, MOBILITYDCATAP.mobilityTheme, mobility_theme.iri) in g
