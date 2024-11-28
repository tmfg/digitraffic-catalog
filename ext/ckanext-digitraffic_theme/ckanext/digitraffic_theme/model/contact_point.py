from __future__ import annotations

from typing import TypedDict, NotRequired, List

from rdflib import Literal, URIRef, FOAF, RDF

from ckanext.dcat.profiles import VCARD
from ckanext.digitraffic_theme.model.address import Address
from ckanext.digitraffic_theme.model.class_instance import ClassInstance

class ContactPointInput(TypedDict):
    # Mandatory properties
    email: Literal
    full_name: Literal
    # Recommended properties
    website: NotRequired[Literal]
    # Optional properties
    address: NotRequired[Address]
    affiliation: NotRequired[Literal]
    telephone: NotRequired[Literal]

class ContactPoint(ClassInstance):

    def __init__(self, iri: str | None, input: ContactPointInput):
        super().__init__(iri, VCARD.Kind)
        self.validate(input)
        self.email = input["email"]
        self.full_name = input["full_name"]
        self.website = input.get("website")
        self.address = input.get("address")
        self.affiliation = input.get("affiliation")
        self.telephone = input.get("telephone")

    def predicate_objects(self):
        return [
            (RDF.type, self.type),
            (VCARD.hasEmail, self.email),
            (VCARD.fn, self.full_name),
            (VCARD.hasURL, self.website),
            (VCARD.hasAddress, self.address),
            (VCARD["organization-name"], self.affiliation),
            (VCARD.hasTelephone, self.telephone)
        ]

    def validate(self, input: ContactPointInput):
        mandatory_properties = ["email", "full_name"]
        for mp in mandatory_properties:
            if input.get(mp).value is None:
                raise ValueError(f'{mp} property cannot be None')
