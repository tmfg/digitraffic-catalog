from rdflib import Graph, URIRef, BNode

from ckanext.digitraffic_theme.profiles.graph_modifiers.adder import Adder


class URIRefAdder(Adder):
    @staticmethod
    def add_to_graph(g: Graph, subject: URIRef|BNode, predicate: URIRef, data: URIRef):
        g.add((subject, predicate, data))
