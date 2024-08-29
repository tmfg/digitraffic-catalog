from __future__ import annotations
from abc import ABC, abstractmethod

from rdflib import Graph, URIRef, BNode
from typing import Any


class Adder(ABC):

    @staticmethod
    @abstractmethod
    def add_to_graph(g: Graph, subject: URIRef | BNode, predicate: URIRef, obj: Any):
        pass
