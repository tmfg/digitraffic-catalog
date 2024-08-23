from rdflib import Graph, URIRef, BNode

from ckanext.digitraffic_theme.profiles.graph_modifiers.adder import Adder
from ckanext.digitraffic_theme.profiles.model.vocabulary import Vocabulary


class VocabularyAdder(Adder):
    @staticmethod
    def add_to_graph(g: Graph, subject: URIRef|BNode, predicate: URIRef, data: Vocabulary):
        g.add((subject, predicate, data.iri))