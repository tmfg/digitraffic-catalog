from typing import Any
from rdflib import URIRef, Literal

from ckan.common import request, config

from ckanext.dcat.utils import publisher_uri_organization_fallback, resource_uri
from ckanext.digitraffic_theme.model.address import Address
from ckanext.digitraffic_theme.model.agent import Agent
from ckanext.digitraffic_theme.model.assessment import Assessment
from ckanext.digitraffic_theme.model.catalog_record import CatalogRecord
from ckanext.digitraffic_theme.model.contact_point import ContactPoint
from ckanext.digitraffic_theme.model.dataset import Dataset
from ckanext.digitraffic_theme.model.distribution import Distribution
from ckanext.digitraffic_theme.model.frequency import Frequency
from ckanext.digitraffic_theme.model.intended_information_service import (
    IntendedInformationService,
)

from ckanext.digitraffic_theme.model.location import Location
from ckanext.digitraffic_theme.model.mobility_theme import (
    MobilityTheme,
    MobilityThemeSub,
)
from ckanext.digitraffic_theme.model.georeferencing_method import GeoreferencingMethod
from ckanext.digitraffic_theme.model.network_coverage import NetworkCoverage


class MobilityData:
    catalog_record: CatalogRecord

    def __init__(self, dataset_dict: dict[str, Any], dataset_ref: URIRef):
        organization_ref = dataset_dict.get(
            "publisher_uri", publisher_uri_organization_fallback(dataset_dict)
        )

        # Publisher is the same for both Dataset and Catalogue Record
        publisher = Agent(organization_ref, dataset_dict["organization"]["name"])
        contact_points = (
            {
                "contact_points": [
                    ContactPoint(
                        None,
                        {
                            "email": Literal(contact_point["has_email"]),
                            "full_name": Literal(contact_point["fn"]),
                            "website": Literal(contact_point.get("has_url")),
                            "address": Address(
                                None,
                                {
                                    "country_name": Literal(
                                        contact_point.get("country_name")
                                    ),
                                    "locality": Literal(contact_point.get("locality")),
                                    "postal_code": Literal(
                                        contact_point.get("postal_code")
                                    ),
                                    "region": Literal(contact_point.get("region")),
                                    "street_address": Literal(
                                        contact_point.get("street_address")
                                    ),
                                },
                            ),
                            "affiliation": Literal(
                                contact_point.get("organization_name")
                            ),
                            "telephone": Literal(contact_point.get("has_telephone")),
                        },
                    )
                    for contact_point in dataset_dict["contact_point"]
                ]
            }
            if dataset_dict.get("contact_point")
            else {}
        )

        assessments = {
            "assessments": [
                Assessment(
                    None,
                    {
                        "assessment_date": Literal(assessment.get("assessment_date")),
                        "assessment_result": URIRef(
                            assessment.get("assessment_result")
                        ),
                    },
                )
                for assessment in dataset_dict["assessment"]
            ]
        }

        dataset = Dataset(
            dataset_ref,
            {
                "description": [
                    Literal(
                        dataset_dict.get("notes_translated", {}).get(key, ""), lang=key
                    )
                    for key in dataset_dict.get("notes_translated", {}).keys()
                ],
                "distribution": [
                    Distribution(resource_uri(dist), dist)
                    for dist in dataset_dict["resources"]
                ],
                "accrualPeriodicity": Frequency(dataset_dict["frequency"]),
                "mobility_theme": MobilityTheme(dataset_dict["mobility_theme"]),
                "spatial": Location(dataset_dict["spatial"]),
                "title": Literal(dataset_dict["name"]),
                "publisher": publisher,
                **(
                    {
                        "mobility_theme_sub": MobilityThemeSub(
                            dataset_dict["mobility_theme_sub"]
                        )
                    }
                    if dataset_dict.get("mobility_theme_sub")
                    else {}
                ),
                **(
                    {
                        "georeferencing_method": GeoreferencingMethod(
                            dataset_dict["georeferencing_method"]
                        )
                    }
                    if dataset_dict.get("georeferencing_method")
                    else {}
                ),
                **(
                    {
                        "network_coverage": NetworkCoverage(
                            dataset_dict["network_coverage"]
                        )
                    }
                    if dataset_dict.get("network_coverage")
                    else {}
                ),
                **(
                    {
                        "intended_information_service": IntendedInformationService(
                            dataset_dict["intended_information_service"]
                        )
                    }
                    if dataset_dict.get("intended_information_service")
                    else {}
                ),
                **(
                    {
                        "mobility_theme_sub": MobilityThemeSub(
                            dataset_dict["mobility_theme_sub"]
                        )
                    }
                    if dataset_dict.get("mobility_theme_sub")
                    else {}
                ),
                **(
                    {
                        "georeferencing_method": GeoreferencingMethod(
                            dataset_dict["georeferencing_method"]
                        )
                    }
                    if dataset_dict.get("georeferencing_method")
                    else {}
                ),
                **contact_points,
                **assessments,
            },
        )
        # Catalog Record
        self.catalog_record = CatalogRecord(
            None,
            {
                "created": Literal(dataset_dict["metadata_created"]),
                "primary_topic": dataset,
                "modified": Literal(dataset_dict["metadata_modified"]),
                "publisher": publisher,
            },
        )
