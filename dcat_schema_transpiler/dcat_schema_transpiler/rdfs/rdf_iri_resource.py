from __future__ import annotations
from rdflib import Dataset, Namespace, URIRef, Graph
from rdflib.namespace import RDF
from typing import Any, Dict, Tuple
import os

from rdfs.resource import Resource


class IRIResource(Resource):
    def __init__(self, namespace: Namespace, iri: URIRef, types: Tuple[URIRef, ...],
                 additional_properties: Dict[URIRef, Tuple[Tuple[str, Namespace]]] = None) -> None:
        if (namespace is None or
                iri is None):
            raise ValueError('Cannot create a resource without namespace or iri')
        if not types:
            raise ValueError('Minimum of one type must be provided for ' + iri)
        self.namespace = namespace
        self.iri = iri
        self.types = types
        self.additional_properties = additional_properties

    def __eq__(self, other):
        if other is None:
            return False
        if not isinstance(other, IRIResource):
            return False
        if self.is_iri(other.iri):
            return True
        else:
            return False

    def __hash__(self):
        return hash(str(self.iri))

    def value(self):
        return self.iri

    def is_iri(self, iri: URIRef) -> bool:
        return str(self.iri) == str(iri)

    @property
    def type(self):
        return self.types

    @classmethod
    def from_ds(cls, iri, ds: Dataset) -> IRIResource:
        namespace, iri, types = IRIResource.resource_args_from_ds(iri, ds)
        return IRIResource(namespace, iri, types)

    @staticmethod
    def resource_args_from_ds(iri: URIRef, ds: Dataset) -> (Namespace, URIRef, Tuple[URIRef]):
        namespace = Resource.ns_from_iri(iri)
        g = ds.get_graph(URIRef(namespace))
        return namespace, iri, tuple(URIRef(node) for node in g.objects(iri, RDF.type))

    @staticmethod
    def resource_args_from_graph(iri: URIRef, g: Graph) -> (Namespace, URIRef, Tuple[URIRef]):
        namespace = Resource.ns_from_iri(iri)
        return namespace, iri, tuple(URIRef(node) for node in g.objects(iri, RDF.type))

    def turtle_format(self, p_o_tuples: Tuple[(URIRef, Tuple[Any, ...]), ...]):
        spaces_s = "   " + " " * len(str(self.iri))
        linesep = ";" + os.linesep + spaces_s
        types_str = ("," + os.linesep + spaces_s + "  ").join(self.types) + linesep

        def objects_list_as_string(predicate: URIRef, objects: Tuple[str, ...]) -> str:
            spaces_p = "   " + " " * len(str(predicate))
            return ("," + os.linesep + spaces_s + spaces_p).join(
                map(lambda o: ("<" + o + ">") if isinstance(o, IRIResource) else str(o),
                    objects))

        def additional_objects_list_as_string(predicate: URIRef, objects: Tuple[Tuple[str, Namespace], ...]) -> str:
            spaces_p = "   " + " " * len(str(predicate))
            return ("," + os.linesep + spaces_s + spaces_p).join(
                map(lambda o: ("<" + o[0].iri + ">") if isinstance(o[0], IRIResource) else str(o[0]) + ' (' + str(o[1]) + ')',
                    objects))

        given_properties = map(
            lambda p_o: '''<{predicate}> {objects}'''.format(predicate=p_o[0], objects=objects_list_as_string(*p_o)),
            filter(
                lambda p_o: p_o[1],
                p_o_tuples))
        additional_properties = map(
            lambda p_o: '''<{predicate}> {objects}'''.format(predicate=p_o[0], objects=additional_objects_list_as_string(*p_o)),
            self.additional_properties.items())
        return '''<{subject}> a {types}{properties}{additional_properties} .\
        '''.format(subject=self.iri,
                   types=types_str,
                   properties=linesep.join(given_properties),
                   additional_properties=linesep.join(additional_properties))