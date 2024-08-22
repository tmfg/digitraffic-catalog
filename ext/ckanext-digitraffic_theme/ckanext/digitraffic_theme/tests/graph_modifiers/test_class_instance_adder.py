import pytest
from rdflib import Graph, URIRef, DCTERMS

from ckanext.digitraffic_theme.profiles.graph_modifiers.class_instance_adder import ClassInstanceAdder
from ckanext.digitraffic_theme.profiles.model.agent import Agent


def test_literal_adder_adds_literal():
    g = Graph()
    subject = URIRef('example.com/foo')
    agent_iri = URIRef('example.com/agent')
    agent = Agent(agent_iri, "foo")

    ClassInstanceAdder.add_to_graph(g, subject, DCTERMS.publisher, agent)

    assert (subject, DCTERMS.publisher, agent_iri) in g

