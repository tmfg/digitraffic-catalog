from __future__ import annotations

from dcat_schema_transpiler.rdfs.iri_resource import iri_resource_factory
from dcat_schema_transpiler.rdfs.rdf_iri_resource import IRIResource
from rdflib import Dataset, Namespace, URIRef, Literal
from rdflib.namespace import RDFS
from typing import List, Dict, Tuple


class RDFSResource(IRIResource):
    def __init__(
        self,
        namespace: Namespace,
        iri: URIRef,
        types: Tuple[URIRef, ...],
        additional_properties: Dict[
            URIRef, List[Tuple[URIRef | Literal, Namespace]]
        ] = None,
        label: Tuple[Literal, ...] = None,
        comment: Tuple[Literal, ...] = None,
        see_also: Tuple[URIRef | Literal, ...] = None,
        is_defined_by: Tuple[URIRef | Literal, ...] = None,
        member: Tuple[URIRef | Literal, ...] = None,
    ):
        super().__init__(
            namespace, iri, types, additional_properties=additional_properties
        )
        self.label = label
        self.comment = comment
        self.see_also = see_also
        self.is_defined_by = is_defined_by
        self.member = member

    def __str__(self):
        return self.turtle_format(
            (
                (RDFS.label, self.label),
                (RDFS.comment, self.comment),
                (RDFS.seeAlso, self.see_also),
                (RDFS.isDefinedBy, self.is_defined_by),
                (RDFS.member, self.member),
            )
        )

    def get_rdf_object_ns(self, resource: RDFSResource) -> Namespace | None:
        iri = resource.iri
        additional_property = self.additional_properties.get(iri)
        if additional_property is not None:
            resource_value = resource.value()
            return [
                namespace
                for v, namespace in additional_property
                if (v.value if isinstance(v, Literal) else v) == resource_value
            ][0]
        for v in self.__dict__.values():
            if isinstance(v, tuple) and iri in v:
                return self.namespace
        return None

    @classmethod
    def from_ds(cls, iri, ds: Dataset) -> RDFSResource:
        return iri_resource_factory(
            cls,
            iri,
            ds,
            label=RDFS.label,
            comment=RDFS.comment,
            see_also=RDFS.seeAlso,
            is_defined_by=RDFS.isDefinedBy,
            member=RDFS.member,
        )
