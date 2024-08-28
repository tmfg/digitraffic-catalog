from rdflib import Graph, URIRef, DCTERMS

from ckanext.digitraffic_theme.profiles.graph_modifiers.adder_util import add_class_instance_with_children
from ckanext.digitraffic_theme.profiles.model.agent import Agent


def test_literal_adder_adds_literal():
    g = Graph()
    subject = URIRef('example.com/foo')
    agent_iri = URIRef('example.com/agent')
    agent = Agent(agent_iri, "foo")

    add_class_instance_with_children(g, subject, DCTERMS.publisher, agent)

    assert (subject, DCTERMS.publisher, agent_iri) in g
    for p, o in agent.predicate_objects():
        assert (agent_iri, p, o) in g

