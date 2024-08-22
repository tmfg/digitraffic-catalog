from rdflib import Graph, URIRef

from ckanext.digitraffic_theme.profiles.graph_modifiers.adder import Adder


class URIRefAdder(Adder):
    @staticmethod
    def add_to_graph(g: Graph, subject: URIRef, predicate: URIRef, data: URIRef):
        g.add((subject, predicate, data))
