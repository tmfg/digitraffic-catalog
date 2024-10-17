from __future__ import annotations
from ckanext.digitraffic_theme.profiles.model.class_instance import ClassInstance
from ckanext.digitraffic_theme.profiles.model.vocabulary import Vocabulary

from rdflib import Graph, URIRef, BNode, Literal
from typing import Any, Callable, overload

def add_class_instance_to_graph(g: Graph, subject: URIRef | BNode, predicate: URIRef, data: ClassInstance):
    instance_iri = data.iri
    g.add((subject, predicate, instance_iri))


def add_literal_to_graph(g: Graph, subject: URIRef | BNode, predicate: URIRef, data: Literal):
    g.add((subject, predicate, data))


def add_uriref_to_graph(g: Graph, subject: URIRef | BNode, predicate: URIRef, data: URIRef):
    g.add((subject, predicate, data))


def add_vocabulary_to_graph(g: Graph, subject: URIRef | BNode, predicate: URIRef, data: Vocabulary):
    g.add((subject, predicate, data.iri))


@overload
def get_adder_fn(resource: Vocabulary) -> Callable[[Graph, URIRef | BNode, URIRef, Vocabulary], None]: ...


@overload
def get_adder_fn(resource: ClassInstance) -> Callable[[Graph, URIRef | BNode, URIRef, ClassInstance], None]: ...


@overload
def get_adder_fn(resource: Literal) -> Callable[[Graph, URIRef | BNode, URIRef, Literal], None]: ...


@overload
def get_adder_fn(resource: URIRef) -> Callable[[Graph, URIRef | BNode, URIRef, URIRef], None]: ...


def get_adder_fn(resource: Vocabulary | ClassInstance | Literal | URIRef) -> Callable[
    [Graph, URIRef | BNode, URIRef, Any], None]:
    if isinstance(resource, Vocabulary):
        return add_vocabulary_to_graph
    elif isinstance(resource, ClassInstance):
        return add_class_instance_to_graph
    elif isinstance(resource, Literal):
        return add_literal_to_graph
    elif isinstance(resource, URIRef):
        return add_uriref_to_graph
    raise ValueError(f'There is no adder for type {type(resource)}')


def add_class_instance_values(g: Graph, resource: ClassInstance):
    instance_iri = resource.iri

    for p, o in resource.predicate_objects():
        o_adder = get_adder_fn(o)
        o_adder(g, instance_iri, p, o)
        if isinstance(o, ClassInstance):
            add_class_instance_values(g, o)


def add_class_instance_with_children(g: Graph, subject: URIRef, predicate: URIRef, obj: ClassInstance):
    adder = get_adder_fn(obj)
    adder(g, subject, predicate, obj)

    add_class_instance_values(g, obj)
