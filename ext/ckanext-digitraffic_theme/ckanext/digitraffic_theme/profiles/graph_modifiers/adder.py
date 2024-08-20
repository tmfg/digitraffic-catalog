from abc import ABC, abstractmethod

from rdflib import Graph, URIRef
from typing import Any


class Adder(ABC):

    @staticmethod
    @abstractmethod
    def add_to_graph(g: Graph, subject: URIRef, predicate: URIRef, obj: Any):
        pass
