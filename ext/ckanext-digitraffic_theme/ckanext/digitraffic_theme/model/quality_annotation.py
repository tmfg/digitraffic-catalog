from __future__ import annotations

from typing import NotRequired, TypedDict

from ckanext.digitraffic_theme.model.class_instance import ClassInstance
from ckanext.digitraffic_theme.rdf.mobility_dcat_ap import MOBILITYDCATAP
from ckanext.digitraffic_theme.rdf.oa import OA
from ckanext.digitraffic_theme.rdf.dqv import DQV
from rdflib import DCAT, URIRef, Literal, RDF


class QualityAnnotationInput(TypedDict):
    # Optional properties
    quality_annotation_resource: NotRequired[URIRef]
    # dataset ref
    quality_annotation_target: NotRequired[Literal]


class QualityAnnotation(ClassInstance):

    def __init__(self, iri: str | None, input: QualityAnnotationInput):
        super().__init__(iri, DQV.QualityAnnotation)
        self.quality_annotation_resource = input.get("quality_annotation_resource")
        self.quality_annotation_target = input.get("quality_annotation_target")

    def predicate_objects(self):
        return [
            (RDF.type, self.type),
            (OA.hasBody, self.quality_annotation_resource),
            (DCAT.Dataset, self.quality_annotation_target),
        ]
