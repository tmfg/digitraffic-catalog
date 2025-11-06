from __future__ import annotations

from typing import NotRequired, TypedDict, cast

from ckanext.digitraffic_theme.model.class_instance import ClassInstance
from ckanext.digitraffic_theme.rdf.mobility_dcat_ap import MOBILITYDCATAP
from ckanext.digitraffic_theme.rdf.oa import OA
from rdflib import DCTERMS, RDF, Literal, URIRef, XSD


class AssessmentInput(TypedDict):
    # Optional properties
    assessment_date: NotRequired[Literal]
    assessment_result: NotRequired[URIRef]


class Assessment(ClassInstance):

    def __init__(self, iri: str | None, input: AssessmentInput):
        super().__init__(iri, MOBILITYDCATAP.Assessment)
        if input.get("assessment_date"):
            assessment_date = cast(Literal, input.get("assessment_date"))
            if assessment_date.datatype != XSD.date:
                raise ValueError("assessment_date must be of type xsd:date")
        self.assessment_date = input.get("assessment_date")
        self.assessment_result = input.get("assessment_result")

    def predicate_objects(self):
        pos = [
            (RDF.type, self.type),
            (DCTERMS.issued, self.assessment_date) if self.assessment_date else None,
            (OA.hasBody, self.assessment_result) if self.assessment_result else None,
        ]
        return [po for po in pos if po is not None]
