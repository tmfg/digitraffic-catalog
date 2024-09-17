from __future__ import annotations
from rdflib import Dataset, URIRef, Literal
from rdflib.namespace import RDF, RDFS, DCAM, OWL
from typing import Tuple, Set
import os

from dcat_schema_transpiler.rdfs.rdfs_class import RDFSClass
from dcat_schema_transpiler.rdfs.rdfs_literal import RDFSLiteral
from dcat_schema_transpiler.rdfs.rdfs_property import RDFSProperty
from dcat_schema_transpiler.rdfs.rdfs_resource import RDFSResource


def rdfs_property_tuple(urirefs: Tuple[URIRef, ...], ds: Dataset) -> Tuple[RDFSProperty, ...]:
    return tuple(map(lambda p: RDFSProperty.from_ds(p, ds), urirefs))

def rdfs_class_tuple(urirefs: Tuple[URIRef, ...], ds: Dataset) -> Tuple[RDFSClass, ...]:
    return tuple(map(lambda c: RDFSClass.from_ds(c, ds), urirefs))

def rdfs_literal_tuple(literals: Tuple[Literal, ...]) -> Tuple[RDFSLiteral, ...]:
    return tuple(map(lambda l: RDFSLiteral(l), literals))

def rdfs_resource_tuple(urirefs: Tuple[URIRef, ...], ds: Dataset) -> Tuple[RDFSResource, ...]:
    return tuple(map(lambda r: RDFSResource.from_ds(r, ds), urirefs))

def get_rdf_object(resource: RDFSResource, iri: URIRef, ds: Dataset):
    if not isinstance(iri, URIRef):
        return None
    match iri:
        case RDF.type:
            return rdfs_class_tuple(resource.types, ds)
        case RDFS.label:
            return rdfs_literal_tuple(resource.label)
        case RDFS.comment:
            return rdfs_literal_tuple(resource.comment)
        case RDFS.member:
            if resource.member and isinstance(resource.member[0], URIRef):
                return rdfs_resource_tuple(resource.member, ds)
            elif resource.member and isinstance(resource.member[0], Literal):
                return rdfs_literal_tuple(resource.member)
            else:
                return ()
        case RDFS.seeAlso:
            if resource.see_also and isinstance(resource.see_also[0], URIRef):
                return rdfs_resource_tuple(resource.see_also, ds)
            elif resource.see_also and isinstance(resource.see_also[0], Literal):
                return rdfs_literal_tuple(resource.see_also)
            else:
                return ()
        case RDFS.isDefinedBy:
            if resource.is_defined_by and isinstance(resource.is_defined_by[0], URIRef):
                return rdfs_resource_tuple(resource.is_defined_by, ds)
            elif resource.is_defined_by and isinstance(resource.is_defined_by[0], Literal):
                return rdfs_literal_tuple(resource.is_defined_by)
            else:
                return ()
        case RDFS.subClassOf:
            return rdfs_class_tuple(resource.sub_class_of, ds)
        case RDFS.domain:
            return rdfs_class_tuple(resource.domain, ds)
        case RDFS.range:
            return rdfs_class_tuple(resource.range, ds)
        case RDFS.subPropertyOf:
            return rdfs_property_tuple(resource.sub_property_of, ds)
    additional_property = resource.additional_properties.get(iri)
    if additional_property is None:
        return None
    if not additional_property:
        return ()
    ap = tuple(map(lambda v: v[0], additional_property))
    if isinstance(ap[0], URIRef):
        return rdfs_resource_tuple(ap, ds)
    elif isinstance(ap[0], Literal):
        return rdfs_literal_tuple(ap)
    return None


class ClassPropertiesAggregator:
    def __init__(self, clazz: RDFSClass, properties: Set[RDFSProperty], properties_includes: Set[RDFSProperty]):
        self.clazz = clazz
        self.properties = properties
        self.properties_includes = properties_includes

    @classmethod
    def from_ds_with_graph(cls, clazz: RDFSClass, ds: Dataset, graph_namespace: URIRef) -> ClassPropertiesAggregator:
        properties: Set[RDFSProperty] = set()
        properties_includes: Set[RDFSProperty] = set()
        g = ds.get_graph(graph_namespace)
        for s, _, _ in g.triples((None, RDFS.domain, clazz.iri)):
            if (s, RDF.type, RDF.Property) in g:
                properties.add(RDFSProperty.from_ds(s, ds))
            elif (s, RDF.type, OWL.DatatypeProperty) in g:
                # Not exactly correct, ubt OWL.DatatypeProperty is a subclass of RDF Property
                properties.add(RDFSProperty.from_ds(s, ds))
            elif (s, RDF.type, OWL.ObjectProperty) in g:
                # Not exactly correct, ubt OWL.ObjectProperty is a subclass of RDF Property
                properties.add(RDFSProperty.from_ds(s, ds))
            else:
                raise ValueError('''
                Subject was not a Property. Instead;
                type={type}
                value={value}\
                '''.format(type=type(s), value=s))
        for s, _, _ in g.triples((None, DCAM.domainIncludes, clazz.iri)):
            if (s, RDF.type, RDF.Property) in g:
                properties_includes.add(RDFSProperty.from_ds(s, ds))
            elif (s, RDF.type, OWL.DatatypeProperty) in g:
                # Not exactly correct, ubt OWL.DatatypeProperty is a subclass of RDF Property
                properties_includes.add(RDFSProperty.from_ds(s, ds))
            elif (s, RDF.type, OWL.ObjectProperty) in g:
                # Not exactly correct, ubt OWL.ObjectProperty is a subclass of RDF Property
                properties_includes.add(RDFSProperty.from_ds(s, ds))
            else:
                raise ValueError('''
                Subject was not a Property. Instead;
                type={type}
                value={value}\
                '''.format(type=type(s), value=s))
        return cls(clazz, properties, properties_includes)

    def __str__(self):
        spaces = '    '
        return '''<{class_iri}>
{spaces}PROPERTIES:
{spaces}{spaces}{properties}
{spaces}PROPERTIES INCLUDES:
{spaces}{spaces}{properties_includes}'''.format(class_iri=self.clazz.iri,
                                                properties=(os.linesep + spaces*2).join(map(lambda p: "<" + str(p.iri) + ">", self.properties)),
                                                properties_includes=(os.linesep + spaces*2).join(map(lambda p: "<" + str(p.iri) + ">", self.properties_includes)),
                                                spaces=spaces)

    def get_property_objects(self):
        pass