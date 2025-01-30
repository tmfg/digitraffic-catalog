from __future__ import annotations
from rdflib import Dataset, Namespace, URIRef, Literal
from typing import List, Dict, Tuple

from dcat_schema_transpiler.mobility_dcat_ap.namespace import MOBILITYDCATAP_NS_URL
from dcat_schema_transpiler.rdfs.rdf_iri_resource import IRIResource


def iri_resource_factory(
    cls, iri, ds: Dataset, properties_from_graph=URIRef(MOBILITYDCATAP_NS_URL), **kwargs
):
    namespace, iri, types = IRIResource.resource_args_from_ds(iri, ds)
    g = ds.get_graph(URIRef(namespace))

    defined_constructor_arguments: Dict[str, Tuple[URIRef | Literal, ...]] = {}
    additional_properties: Dict[URIRef, List[Tuple[URIRef | Literal, Namespace]]] = {}

    for argument_label, predicate in kwargs.items():
        defined_constructor_arguments[argument_label] = tuple(
            v for v in g.objects(iri, predicate)
        )

    if properties_from_graph:
        g_from_graph = ds.get_graph(properties_from_graph)
        _, _, types_g = IRIResource.resource_args_from_graph(iri, g_from_graph)

        types = types + types_g

        for argument_label, predicate in kwargs.items():
            defined_constructor_arguments[argument_label] = (
                defined_constructor_arguments.get(argument_label, {})
                + tuple(v for v in g_from_graph.objects(iri, predicate))
            )

    for _, p, o, g_identifier in ds.quads((iri, None, None, None)):
        if isinstance(p, URIRef):
            is_in_defined_constructor_arguments = (
                str(g_identifier) == str(namespace)
                or str(g_identifier) == str(properties_from_graph)
            ) and p in kwargs.values()
            if not is_in_defined_constructor_arguments:
                existing_property = additional_properties.get(p)
                new_object = (
                    o,
                    Namespace(g_identifier) if g_identifier is not None else None,
                )
                if existing_property is not None:
                    existing_property.append(new_object)
                else:
                    additional_properties[p] = [new_object]
        else:
            raise ValueError(
                """
                Predicate was not a URIRef. Instead;
                type={type}
                value={value}\
                """.format(
                    type=type(p), value=p
                )
            )

    return cls(
        namespace,
        iri,
        types,
        additional_properties=(
            None
            if not additional_properties
            else {k: tuple(v) for k, v in additional_properties.items()}
        ),
        **defined_constructor_arguments,
    )
