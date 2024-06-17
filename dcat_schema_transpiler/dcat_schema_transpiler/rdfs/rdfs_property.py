from __future__ import annotations

from rdfs.iri_resource import iri_resource_factory
from rdflib import Dataset, Namespace, URIRef, Literal
from rdflib.namespace import RDF, RDFS
from typing import List, Dict, Tuple

from rdfs.rdfs_resource import RDFSResource


class RDFSProperty(RDFSResource):
    def __init__(self, namespace: Namespace, iri: URIRef, types: Tuple[URIRef, ...],
                 additional_properties: Dict[URIRef, List[Tuple[URIRef|Literal, Namespace]]] = None,
                 label: Tuple[Literal, ...] = None, comment: Tuple[Literal, ...] = None,
                 see_also: Tuple[URIRef|Literal, ...] = None, is_defined_by: Tuple[URIRef|Literal, ...] = None,
                 member: Tuple[URIRef|Literal, ...] = None,
                 domain: Tuple[URIRef, ...] = None, range: Tuple[URIRef, ...] = None,
                 sub_property_of: Tuple[URIRef, ...] = None):
        super().__init__(namespace, iri, types, additional_properties=additional_properties,
                         label=label, comment=comment, see_also=see_also, is_defined_by=is_defined_by,
                         member=member)
        if RDF.Property not in types:
            pass
            # raise ValueError(f'Trying to create an RDFSProperty without specifying it as a Property type')
        self.domain = domain
        self.range = range
        self.sub_property_of = sub_property_of

    def __str__(self):
        return self.turtle_format((
            (RDFS.label, self.label),
            (RDFS.comment, self.comment),
            (RDFS.seeAlso, self.see_also),
            (RDFS.isDefinedBy, self.is_defined_by),
            (RDFS.member, self.member),
            (RDFS.domain, self.domain),
            (RDFS.range, self.range),
            (RDFS.subPropertyOf, self.sub_property_of)
        ))

    @classmethod
    def from_ds(cls, iri, ds: Dataset) -> RDFSProperty:
        return iri_resource_factory(cls, iri, ds,
                                    label=RDFS.label,
                                    comment=RDFS.comment,
                                    see_also=RDFS.seeAlso,
                                    is_defined_by=RDFS.isDefinedBy,
                                    member=RDFS.member,
                                    domain=RDFS.domain,
                                    range=RDFS.range,
                                    sub_property_of=RDFS.subPropertyOf)