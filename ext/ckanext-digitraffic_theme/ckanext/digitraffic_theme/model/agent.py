from __future__ import annotations

from typing import TypedDict, NotRequired, List
from rdflib import Literal, URIRef
from rdflib.namespace import FOAF, RDF, ORG, DCTERMS
from ckanext.digitraffic_theme.rdf.locn import LOCN
from ckanext.digitraffic_theme.model.class_instance import ClassInstance
from ckanext.digitraffic_theme.model.agent_type import AgentType
from ckanext.digitraffic_theme.model.address import LOCNAddress


class AgentInput(TypedDict):
    # Mandatory properties
    name: Literal
    # Recommended properties
    agent_type: NotRequired[AgentType]
    # Optional properties
    address: NotRequired[LOCNAddress]
    mbox: NotRequired[URIRef]
    phone: NotRequired[URIRef]
    url: NotRequired[URIRef]


class Agent(ClassInstance):
    mandatory_properties = {
        FOAF.name,
    }

    def __init__(self, iri: str | None, input: AgentInput):
        super().__init__(iri, FOAF.Agent)
        self.name = input["name"]
        self.agent_type = input.get("agent_type")
        self.address = input.get("address")
        self.mbox = input.get("mbox")
        self.phone = input.get("phone")
        self.url = input.get("url")

    def predicate_objects(self):
        return self.filter_used_properties(
            [
                (RDF.type, self.type),
                (FOAF.name, self.name),
                (DCTERMS.type, self.agent_type),
                (LOCN.address, self.address),
                (FOAF.mbox, self.mbox),
                (FOAF.phone, self.phone),
                (FOAF.workplaceHomepage, self.url)
            ]
        )
