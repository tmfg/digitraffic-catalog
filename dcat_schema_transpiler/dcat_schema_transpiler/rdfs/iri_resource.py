from __future__ import annotations
from rdflib import Dataset, Namespace, URIRef, Literal
from typing import List, Dict, Tuple

from rdfs.rdf_iri_resource import IRIResource


def iri_resource_factory(cls, iri, ds: Dataset, **kwargs):
    """
    TODO: Kato tälle funkkarille parempi paikka
    """
    namespace, iri, types = IRIResource.resource_args_from_ds(iri, ds)
    g = ds.get_graph(URIRef(namespace))

    defined_constructor_arguments: Dict[str, Tuple[URIRef|Literal, ...]] = {}
    additional_properties: Dict[URIRef, List[Tuple[URIRef|Literal, Namespace]]] = {}

    for arument_label, predicate in kwargs.items():
        defined_constructor_arguments[arument_label] = tuple(v for v in g.objects(iri, predicate))

    for _, p, o, g_identifier in ds.quads((iri, None, None, None)):
        if isinstance(p, URIRef):
            is_in_defined_constructor_arguments = (str(g_identifier) == str(namespace) and
                                                   p in kwargs.values())
            if not is_in_defined_constructor_arguments:
                existing_property = additional_properties.get(p)
                new_object = (o, Namespace(g_identifier) if g_identifier is not None else None)
                if existing_property is not None:
                    existing_property.append(new_object)
                else:
                    additional_properties[p] = [new_object]
        else:
            raise ValueError('''
                Predicate was not a URIRef. Instead;
                type={type}
                value={value}\
                '''.format(type=type(p), value=p))

    return cls(namespace, iri, types, additional_properties=(None if not additional_properties else {k: tuple(v) for k, v in additional_properties.items()}), **defined_constructor_arguments)