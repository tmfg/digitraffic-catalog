from __future__ import annotations

from typing import TypedDict, NotRequired
from rdflib import Literal
from rdflib.namespace import FOAF, RDF, SKOS, ORG

from ckanext.digitraffic_core.model.agent import Agent, AgentInput


class OrganizationInput(TypedDict, AgentInput):
    pass


class Organization(Agent):

    def __init__(self, iri: str | None, input: OrganizationInput):
        super().__init__(iri, input)
        self.type = ORG.Organization

    def predicate_objects(self):
        return self.filter_used_properties(super().predicate_objects())
