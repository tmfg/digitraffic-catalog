from __future__ import annotations

from typing import TypedDict, NotRequired
from rdflib import RDF, DCTERMS, DCAT, Literal
from ckanext.digitraffic_theme.model.class_instance import ClassInstance


class PeriodOfTimeInput(TypedDict):
    start_timestamp: NotRequired[Literal]
    end_timestamp: NotRequired[Literal]


class PeriodOfTime(ClassInstance):

    def __init__(self, iri: str | None, input: PeriodOfTimeInput):
        super().__init__(iri, DCTERMS.PeriodOfTime)
        start_timestamp = input.get("start_timestamp")
        end_timestamp = input.get("end_timestamp")
        if start_timestamp is None and end_timestamp is None:
            raise ValueError("Both, start time and end time, cannot be None")
        self.start_timestamp = start_timestamp
        self.end_timestamp = end_timestamp

    def predicate_objects(self):
        pos = [
            (RDF.type, self.type),
            (DCAT.startDate, self.start_timestamp) if self.start_timestamp else None,
            (DCAT.endDate, self.end_timestamp) if self.end_timestamp else None,
        ]
        return [po for po in pos if po is not None]
