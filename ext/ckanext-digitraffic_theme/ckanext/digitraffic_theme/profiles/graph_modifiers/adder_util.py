from __future__ import annotations

from rdflib import Literal, Graph, URIRef, BNode

from ckanext.digitraffic_theme.profiles.graph_modifiers.adder import Adder
from ckanext.digitraffic_theme.profiles.graph_modifiers.class_instance_adder import ClassInstanceAdder
from ckanext.digitraffic_theme.profiles.graph_modifiers.literal_adder import LiteralAdder
from ckanext.digitraffic_theme.profiles.graph_modifiers.uriref_adder import URIRefAdder
from ckanext.digitraffic_theme.profiles.graph_modifiers.vocabulary_adder import VocabularyAdder
from ckanext.digitraffic_theme.profiles.model.class_instance import ClassInstance
from ckanext.digitraffic_theme.profiles.model.vocabulary import Vocabulary


def get_adder(resource: Vocabulary | ClassInstance | Literal | URIRef) -> type[Adder]:
    if isinstance(resource, Vocabulary):
        return VocabularyAdder
    elif isinstance(resource, ClassInstance):
        return ClassInstanceAdder
    elif isinstance(resource, Literal):
        return LiteralAdder
    elif isinstance(resource, URIRef):
        return URIRefAdder
    raise ValueError(f'There is no adder for type {type(resource)}')


def add_class_instance_values(g: Graph, resource: ClassInstance):
    instance_iri = resource.iri

    for p, o in resource.predicate_objects():
        o_adder = get_adder(o)
        o_adder.add_to_graph(g, instance_iri, p, o)
        if isinstance(instance_iri, BNode):
            print("ADD BNODE VALUES")
            print(p)
            print(o)
            for pp, oo in g.predicate_objects(instance_iri):
                print("ÅÅÅ")
                print(pp)
                print(oo)
        if isinstance(o, ClassInstance):
            add_class_instance_values(g, o)


def add_class_instance_with_children(g: Graph, subject: URIRef, predicate: URIRef, obj: ClassInstance):
    adder = get_adder(obj)
    adder.add_to_graph(g, subject, predicate, obj)

    add_class_instance_values(g, obj)
