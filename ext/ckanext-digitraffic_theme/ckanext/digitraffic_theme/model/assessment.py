from __future__ import annotations

from typing import NotRequired, TypedDict

from ckanext.digitraffic_theme.model.class_instance import ClassInstance
from ckanext.digitraffic_theme.rdf.mobility_dcat_ap import MOBILITYDCATAP
from ckanext.digitraffic_theme.rdf.oa import OA
from rdflib import DCTERMS, RDF, Literal, URIRef


class AssessmentInput(TypedDict):
    # Optional properties
    assessment_date: NotRequired[Literal]
    assessment_result: NotRequired[URIRef]


class Assessment(ClassInstance):

    def __init__(self, iri: str | None, input: AssessmentInput):
        super().__init__(iri, MOBILITYDCATAP.assessmentResult)
        self.assessment_date = input.get("assessment_date")
        self.assessment_result = input.get("assessment_result")

    def predicate_objects(self):
        return [
            (RDF.type, self.type),
            (DCTERMS.issued, self.assessment_date),
            (OA.hasBody, self.assessment_result),
        ]
