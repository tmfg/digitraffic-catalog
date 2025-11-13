from __future__ import annotations

from typing import TypedDict, NotRequired

from rdflib import Literal, URIRef, FOAF, RDF

from ckanext.dcat.profiles import VCARD, LOCN
from ckanext.digitraffic_core.model.class_instance import ClassInstance


class VCARDAddressInput(TypedDict):
    # Optional properties
    country_name: NotRequired[Literal]
    locality: NotRequired[Literal]
    postal_code: NotRequired[Literal]
    region: NotRequired[Literal]
    street_address: NotRequired[Literal]


class LOCNAddressInput(TypedDict):
    # Optional properties
    admin_unit_L1: NotRequired[Literal]
    admin_unit_L2: NotRequired[Literal]
    post_name: NotRequired[Literal]
    post_code: NotRequired[Literal]
    thoroughfare: NotRequired[Literal]


class VCARDAddress(ClassInstance):

    def __init__(self, iri: str | None, input: VCARDAddressInput):
        super().__init__(iri, VCARD.Address)
        self.country_name = input.get("country_name")
        self.locality = input.get("locality")
        self.postal_code = input.get("postal_code")
        self.region = input.get("region")
        self.street_address = input.get("street_address")

    def predicate_objects(self):
        pos = [
            (RDF.type, self.type),
            (VCARD["country-name"], self.country_name) if self.country_name else None,
            (VCARD.locality, self.locality) if self.locality else None,
            (VCARD["postal-code"], self.postal_code) if self.postal_code else None,
            (VCARD.region, self.region) if self.region else None,
            (VCARD["street-address"], self.street_address) if self.street_address else None,
        ]
        return [po for po in pos if po is not None]


class LOCNAddress(ClassInstance):

    def __init__(self, iri: str | None, input: LOCNAddressInput):
        super().__init__(iri, LOCN.Address)
        self.admin_unit_L1 = input.get("admin_unit_L1")
        self.admin_unit_L2 = input.get("admin_unit_L2")
        self.post_name = input.get("post_name")
        self.post_code = input.get("post_code")
        self.thoroughfare = input.get("thoroughfare")

    def predicate_objects(self):
        pos = [
            (RDF.type, self.type),
            (LOCN.adminUnitL1, self.admin_unit_L1) if self.admin_unit_L1 else None,
            (LOCN.adminUnitL2, self.admin_unit_L2) if self.admin_unit_L2 else None,
            (LOCN.postName, self.post_name) if self.post_name else None,
            (LOCN.postCode, self.post_code) if self.post_code else None,
            (LOCN.thoroughfare, self.thoroughfare) if self.thoroughfare else None,
        ]
        return [po for po in pos if po is not None]
