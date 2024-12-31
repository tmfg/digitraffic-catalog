from __future__ import annotations

from typing import TypedDict, NotRequired

from rdflib import Literal, URIRef, FOAF, RDF

from ckanext.dcat.profiles import VCARD, LOCN
from ckanext.digitraffic_theme.model.class_instance import ClassInstance


class VCARDAddressInput(TypedDict):
    # Optional properties
    country_name: Literal
    locality: Literal
    postal_code: Literal
    region: Literal
    street_address: Literal

class LOCNAddressInput(TypedDict):
    # Optional properties
    admin_unit_L1: Literal
    admin_unit_L2: Literal
    post_name: Literal
    post_code: Literal
    thoroughfare: Literal


class VCARDAddress(ClassInstance):

    def __init__(self, iri: str | None, input: VCARDAddressInput):
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

class LOCNAddress(ClassInstance):

    def __init__(self, iri: str | None, input: LOCNAddressInput):
        super().__init__(iri, LOCN.Address)
        self.admin_unit_L1 = input.get("admin_unit_L1")
        self.admin_unit_L2 = input.get("admin_unit_L2")
        self.post_name = input.get("post_name")
        self.post_code = input.get("post_code")
        self.thoroughfare = input.get("thoroughfare")

    def predicate_objects(self):
        return [
            (RDF.type, self.type),
            (LOCN.adminUnitL1, self.admin_unit_L1),
            (LOCN.adminUnitL2, self.admin_unit_L2),
            (LOCN.postName, self.post_name),
            (LOCN.postCode, self.post_code),
            (LOCN.thoroughfare, self.thoroughfare)
        ]