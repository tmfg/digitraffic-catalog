from rdflib import Graph, URIRef, Literal, BNode

from ckanext.digitraffic_theme.profiles.graph_modifiers.adder import Adder


class LiteralAdder(Adder):
    @staticmethod
    def add_to_graph(g: Graph, subject: URIRef|BNode, predicate: URIRef, data: Literal):
        g.add((subject, predicate, data))