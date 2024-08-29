from __future__ import annotations
from rdflib import Graph, URIRef, BNode

from ckanext.digitraffic_theme.profiles.graph_modifiers.adder import Adder
from ckanext.digitraffic_theme.profiles.model.class_instance import ClassInstance


class ClassInstanceAdder(Adder):
    @staticmethod
    def add_to_graph(g: Graph, subject: URIRef|BNode, predicate: URIRef, data: ClassInstance):
        instance_iri = data.iri
        g.add((subject, predicate, instance_iri))