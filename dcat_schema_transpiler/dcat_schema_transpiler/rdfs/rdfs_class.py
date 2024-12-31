from __future__ import annotations

from dcat_schema_transpiler.rdfs.iri_resource import iri_resource_factory
from rdflib import Dataset, Namespace, URIRef, Literal
from rdflib.namespace import RDFS, OWL
from typing import List, Dict, Tuple

from dcat_schema_transpiler.rdfs.rdfs_resource import RDFSResource


class RDFSClass(RDFSResource):
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
        sub_class_of: Tuple[URIRef, ...] = None,
    ):
        super().__init__(
            namespace,
            iri,
            types,
            additional_properties=additional_properties,
            label=label,
            comment=comment,
            see_also=see_also,
            is_defined_by=is_defined_by,
            member=member,
        )
        # OWL.Class and RDFS.Datatype are both subclass of RDFS.Class
        if (
            RDFS.Class not in types
            and OWL.Class not in types
            and RDFS.Datatype not in types
        ):
            raise ValueError(
                f"Trying to create an RDFSClass without specifying it as a Class type"
            )
        self.sub_class_of = sub_class_of

    def __str__(self):
        return self.turtle_format(
            (
                (RDFS.label, self.label),
                (RDFS.comment, self.comment),
                (RDFS.seeAlso, self.see_also),
                (RDFS.isDefinedBy, self.is_defined_by),
                (RDFS.member, self.member),
                (RDFS.subClassOf, self.sub_class_of),
            )
        )

    @classmethod
    def from_ds(cls, iri, ds: Dataset) -> RDFSClass:
        return iri_resource_factory(
            cls,
            iri,
            ds,
            label=RDFS.label,
            comment=RDFS.comment,
            see_also=RDFS.seeAlso,
            is_defined_by=RDFS.isDefinedBy,
            member=RDFS.member,
            sub_class_of=RDFS.subClassOf,
        )
