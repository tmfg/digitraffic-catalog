from __future__ import annotations

from typing import TypedDict, NotRequired, List

from rdflib import Literal, URIRef, FOAF, RDF

from ckanext.dcat.profiles import VCARD
from ckanext.digitraffic_core.model.address import VCARDAddress
from ckanext.digitraffic_core.model.class_instance import ClassInstance


class ContactPointInput(TypedDict):
    # Mandatory properties
    email: URIRef
    full_name: Literal
    # Recommended properties
    website: NotRequired[URIRef]
    # Optional properties
    address: NotRequired[VCARDAddress]
    affiliation: NotRequired[Literal]
    telephone: NotRequired[URIRef]


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
        pos = [
            (RDF.type, self.type),
            (VCARD.hasEmail, self.email),
            (VCARD.fn, self.full_name) if self.full_name else None,
            (VCARD.hasURL, self.website) if self.website else None,
            (VCARD.hasAddress, self.address) if self.address else None,
            (VCARD["organization-name"], self.affiliation) if self.affiliation else None,
            (VCARD.hasTelephone, self.telephone) if self.telephone else None,
        ]
        return [po for po in pos if po is not None]

    def validate(self, input: ContactPointInput):
        mandatory_properties = ["email", "full_name"]
        for mp in mandatory_properties:
            property = input.get(mp)
            match property:
                case URIRef():
                    if str(property).strip() == "":
                        raise ValueError(f"{mp} property cannot be empty")
                case Literal():
                    if property.value is None:
                        raise ValueError(f"{mp} property cannot be None")
                case _:
                    raise ValueError(f"{mp} property is not valid type: {type(property)}")
