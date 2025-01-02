from __future__ import annotations
from dataclasses import dataclass
from rdflib import Dataset, Graph, URIRef, Literal, Namespace
from rdflib.namespace import RDF, RDFS, DCAM, OWL
from typing import Tuple, Set
from dcat_schema_transpiler.rdflib_util import get_namespace

from dcat_schema_transpiler.rdfs.rdfs_class import RDFSClass
from dcat_schema_transpiler.rdfs.rdfs_literal import RDFSLiteral
from dcat_schema_transpiler.rdfs.rdfs_property import RDFSProperty
from dcat_schema_transpiler.rdfs.rdfs_resource import RDFSResource


def rdfs_property_tuple(
    urirefs: Tuple[URIRef, ...], ds: Dataset
) -> Tuple[RDFSProperty, ...]:
    return tuple(map(lambda p: RDFSProperty.from_ds(p, ds), urirefs))


def rdfs_class_tuple(urirefs: Tuple[URIRef, ...], ds: Dataset) -> Tuple[RDFSClass, ...]:
    return tuple(map(lambda c: RDFSClass.from_ds(c, ds), urirefs))


def rdfs_literal_tuple(literals: Tuple[Literal, ...]) -> Tuple[RDFSLiteral, ...]:
    return tuple(map(lambda l: RDFSLiteral(l), literals))


def rdfs_resource_tuple(
    urirefs: Tuple[URIRef, ...], ds: Dataset
) -> Tuple[RDFSResource, ...]:
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
            elif resource.is_defined_by and isinstance(
                resource.is_defined_by[0], Literal
            ):
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


@dataclass(frozen=True)
class ClassProperties:
    clazz: RDFSClass
    properties: Set[RDFSProperty]
    properties_includes: set[RDFSProperty]


class ClassPropertiesAggregator:
    def __init__(self, ds: Dataset):
        self.ds = ds

    def class_properties(
        self, clazz: URIRef, namespace: URIRef = None
    ) -> ClassProperties:
        if namespace is None:
            namespace = URIRef(get_namespace(self.ds, clazz))
        g: Graph = self.ds.get_graph(namespace)
        return ClassProperties(
            RDFSClass.from_ds(clazz, self.ds),
            self._get_clazz_properties(clazz, g),
            self._get_clazz_included_properties(clazz, g),
        )

    def _get_clazz_properties(self, clazz: URIRef, g: Graph) -> Set[RDFSProperty]:
        return {
            RDFSProperty.from_ds(URIRef(str(subject)), self.ds)
            for subject in g.subjects(RDFS.domain, clazz)
            if self._validate_property(URIRef(str(subject)), g)
        }

    def _get_clazz_included_properties(
        self, clazz: URIRef, g: Graph
    ) -> Set[RDFSProperty]:
        return {
            RDFSProperty.from_ds(URIRef(str(subject)), self.ds)
            for subject in g.subjects(DCAM.domainIncludes, clazz)
            if self._validate_property(URIRef(str(subject)), g)
        }

    def _validate_property(self, subject: URIRef, g: Graph):
        print("subject ", subject)

        subject_types = [URIRef(str(t)) for t in g.objects(subject, RDF.type)]
        property_types = (
            RDF.Property,
            OWL.DatatypeProperty,
            OWL.AnnotationProperty,
            OWL.ObjectProperty,
        )

        if not any(t in subject_types for t in property_types):
            raise ValueError(
                """
                Subject was not a Property. Instead;
                type={type}
                value={value}\
                """.format(
                    type=type(subject), value=subject
                )
            )
        return True
