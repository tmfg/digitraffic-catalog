from __future__ import annotations

from typing import TypedDict, NotRequired

from rdflib import Literal, URIRef, FOAF, RDF

from ckanext.dcat.profiles import VCARD
from ckanext.digitraffic_theme.model.class_instance import ClassInstance


class AddressInput(TypedDict):
    # Optional properties
    country_name: Literal
    locality: Literal
    postal_code: Literal
    region: Literal
    street_address: Literal


class Address(ClassInstance):

    def __init__(self, iri: str | None, input: AddressInput):
        super().__init__(iri, VCARD.Address)
        self.country_name = input.get("country_name")
        self.locality = input.get("locality")
        self.postal_code = input.get("postal_code")
        self.region = input.get("region")
        self.street_address = input.get("street_address")

    def predicate_objects(self):
        return [
            (RDF.type, self.type),
            (VCARD["country-name"], self.country_name),
            (VCARD.locality, self.locality),
            (VCARD["postal-code"], self.postal_code),
            (VCARD.region, self.region),
            (VCARD["street-address"], self.street_address)
        ]
