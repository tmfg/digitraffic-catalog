from __future__ import annotations

from typing import NotRequired, TypedDict

from ckanext.digitraffic_theme.model.class_instance import ClassInstance
from ckanext.digitraffic_theme.rdf.mobility_dcat_ap import MOBILITYDCATAP
from ckanext.digitraffic_theme.model.rights_statement import RightsStatement
from ckanext.digitraffic_theme.rdf.oa import OA
from rdflib import DCTERMS, RDF, Literal, URIRef, DCAT


class DataServiceInput(TypedDict):
    # Mandatory properties
    data_service_endpoint_url: str
    data_service_title_translated: NotRequired[dict]
    # Recommended properties
    data_service_endpoint_description: NotRequired[str]
    # Optional properties
    data_service_description_translated: NotRequired[dict]

    # DataService inherits the rights of its related Distribution, where the field is required
    access_rights: RightsStatement

    # used for serves_dataset, which is not included in the schema, so this value is given in a separate field
    dataset_ref: str


class DataService(ClassInstance):

    def __init__(self, iri: str | None, input: DataServiceInput):
        super().__init__(iri, DCAT.DataService)
        self.titles = [
            Literal(
                input.get("data_service_title_translated", {}).get(key, ""), lang=key
            )
            for key in (input.get("data_service_title_translated") or {}).keys()
        ]
        self.endpoint_url = (
            URIRef(input.get("data_service_endpoint_url", ""))
            if input.get("data_service_endpoint_url")
            else None
        )
        self.endpoint_description = (
            URIRef(input.get("data_service_endpoint_description", ""))
            if input.get("data_service_endpoint_description")
            else None
        )
        self.serves_dataset = input.get("dataset_ref")
        self.descriptions = [
            Literal(
                input.get("data_service_description_translated", {}).get(key, ""),
                lang=key,
            )
            for key in (input.get("data_service_description_translated") or {}).keys()
        ]
        self.access_rights = input.get("access_rights")

    def predicate_objects(self):
        pos = [
            (RDF.type, self.type),
            (DCAT.endpointURL, self.endpoint_url) if self.endpoint_url else None,
            (
                (DCAT.endpointDescription, self.endpoint_description)
                if self.endpoint_description
                else None
            ),
            # multilingual field
            *[(DCTERMS.title, title) for title in self.titles],
            # multilingual field
            *[(DCTERMS.description, description) for description in self.descriptions],
            (
                (DCAT.endpointDescription, self.endpoint_description)
                if self.endpoint_description
                else None
            ),
            (DCAT.servesDataset, self.serves_dataset),
            (DCTERMS.accessRights, self.access_rights),
        ]
        return [po for po in pos if po is not None]
