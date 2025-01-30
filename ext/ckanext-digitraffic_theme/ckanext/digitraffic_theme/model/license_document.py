from typing import TypedDict, NotRequired

from rdflib import Literal, DCTERMS, RDF, RDFS

from ckanext.digitraffic_theme.model.class_instance import ClassInstance

from ckanext.digitraffic_theme.model.standard_license import StandardLicense


class LicenseInput(TypedDict):
    identifier: NotRequired[StandardLicense]
    label: NotRequired[Literal]


class LicenseDocument(ClassInstance):

    def __init__(self, iri: str, data: LicenseInput):
        super().__init__(iri, DCTERMS.LicenseDocument)
        if ((data.get("identifier") is None and
             data.get("label") is None) or
            (data.get("identifier") is not None and
             data.get("label") is not None)):
            raise ValueError("Identifier xor label must be provided. Both cannot be None, nor can both be provided")
        self.identifier = data.get("identifier")
        self.label = data.get("label")

    def predicate_objects(self):
        pos = [
            (RDF.type, self.type),
            (DCTERMS.identifier, self.identifier) if self.identifier else None,
            (RDFS.label, self.label) if self.label else None,
        ]
        return [po for po in pos if po is not None]
