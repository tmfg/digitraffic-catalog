from __future__ import annotations

from typing import TypedDict, NotRequired
from rdflib import Literal
from rdflib.namespace import FOAF, ORG
from ckanext.digitraffic_theme.model.agent import Agent, AgentInput
from ckanext.digitraffic_theme.model.organization import Organization


class PersonInput(TypedDict, AgentInput):
    first_name: NotRequired[Literal]
    surname: NotRequired[Literal]
    workplace_homepage: NotRequired[Literal]
    member_of: NotRequired[Organization]


class Person(Agent):

    mandatory_properties = set()

    def __init__(self, iri: str | None, input: PersonInput):
        super().__init__(iri, input)
        self.type = FOAF.Person
        self.first_name = input.get("first_name")
        self.surname = input.get("surname")
        self.workplace_homepage = input.get("workplace_homepage")
        self.member_of = input.get("member_of")

    def predicate_objects(self):
        agent_pos = super().predicate_objects()
        return self.filter_used_properties(
            agent_pos
            + [
                (FOAF.firstName, self.first_name),
                (FOAF.surname, self.surname),
                (FOAF.workplaceHomepage, self.workplace_homepage),
                (ORG.memberOf, self.member_of),
            ]
        )
