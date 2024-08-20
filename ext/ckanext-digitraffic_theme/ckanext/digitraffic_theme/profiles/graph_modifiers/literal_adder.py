from rdflib import Graph, URIRef, Literal

from ckanext.digitraffic_theme.profiles.graph_modifiers.adder import Adder


class LiteralAdder(Adder):
    @staticmethod
    def add_to_graph(g: Graph, subject: URIRef, predicate: URIRef, data: Literal):
        g.add((subject, predicate, data))