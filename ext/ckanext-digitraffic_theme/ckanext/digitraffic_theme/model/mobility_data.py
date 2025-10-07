import json
import re
from typing import Any, Dict, Optional
from rdflib import URIRef, Literal
from datetime import datetime

from ckanext.dcat.utils import (
    publisher_uri_organization_fallback,
    resource_uri,
    catalog_uri,
)
from ckanext.digitraffic_theme.model.address import VCARDAddress, LOCNAddress
from ckanext.digitraffic_theme.model.agent_type import AgentType
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
from ckanext.digitraffic_theme.helpers import helpers
from ckanext.digitraffic_theme.model.location import Location
from ckanext.digitraffic_theme.model.rights_statement import RightsStatement
from ckanext.digitraffic_theme.model.application_layer_protocol import (
    ApplicationLayerProtocol,
)
from ckanext.digitraffic_theme.model.format import Format
from ckanext.digitraffic_theme.model.license_document import LicenseDocument
from ckanext.digitraffic_theme.model.standard_license import StandardLicense
from ckanext.digitraffic_theme.model.mobility_theme import (
    MobilityTheme,
    MobilityThemeSub,
)
from ckanext.digitraffic_theme.model.mobility_data_standard import (
    MobilityDataStandard,
)
from ckanext.digitraffic_theme.model.theme import Theme
from ckanext.digitraffic_theme.model.transport_mode import TransportMode
from ckanext.digitraffic_theme.model.georeferencing_method import GeoreferencingMethod
from ckanext.digitraffic_theme.model.network_coverage import NetworkCoverage
from ckanext.digitraffic_theme.model.quality_annotation import QualityAnnotation
from ckanext.digitraffic_theme.model.communication_method import CommunicationMethod


from ckanext.digitraffic_theme.model.organization import Organization
from ckanext.digitraffic_theme.model.data_service import DataService

from ckanext.digitraffic_theme.model.person import Person
from ckanext.digitraffic_theme.model.period_of_time import PeriodOfTime

from ckanext.digitraffic_theme.helpers.helpers import url_from_dataset_id


class MobilityData:
    catalog_record: CatalogRecord

    def __init__(self, dataset_dict: dict[str, Any], dataset_ref: URIRef):
        organization_ref = dataset_dict.get(
            "publisher_uri", publisher_uri_organization_fallback(dataset_dict)
        )

        contact_points = (
            {
                "contact_points": [
                    ContactPoint(
                        None,
                        {
                            "email": Literal(contact_point["has_email"]),
                            "full_name": Literal(contact_point["fn"]),
                            "website": Literal(contact_point.get("has_url")),
                            "address": VCARDAddress(
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

        assessments = (
            {
                "assessments": [
                    Assessment(
                        None,
                        {
                            "assessment_date": Literal(
                                assessment.get("assessment_date")
                            ),
                            "assessment_result": URIRef(
                                assessment.get("assessment_result")
                            ),
                            # assessmment_target is not included in the schema - give it the required value here
                            "assessment_target": URIRef(dataset_ref),
                        },
                    )
                    for assessment in dataset_dict["assessment"]
                ]
            }
            if dataset_dict.get("assessment")
            else {}
        )

        # we have left out "quality annotation target" of class dqv:QualityAnnotation from the schema used with CKAN
        # here the property is added for each language version ("quality annotation resource" is a multilingual field)
        # for correct RDF representation
        quality_annotation = (
            {
                "quality_annotation": QualityAnnotation(
                    None,
                    {
                        "quality_annotation_resource": URIRef(
                            dataset_dict.get("quality_description", {})
                        ),
                        "quality_annotation_target": dataset_ref,
                    },
                )
            }
            if dataset_dict.get("quality_description")
            else {}
        )

        is_referenced_by = (
            {
                "is_referenced_by": [
                    URIRef(url_from_dataset_id(dataset_id))
                    for dataset_id in dataset_dict["is_referenced_by"]
                    if dataset_id and helpers.is_dataset_public(dataset_id)
                ]
            }
            if dataset_dict.get("is_referenced_by")
            else {}
        )

        related_resource = (
            {
                "related_resource": [
                    URIRef(url_from_dataset_id(dataset_id))
                    for dataset_id in dataset_dict["related_resource"]
                    if dataset_id and helpers.is_dataset_public(dataset_id)
                ]
            }
            if dataset_dict.get("related_resource")
            else {}
        )

        def optional_literal(value: Any) -> Optional[Literal]:
            return Literal(value) if value else None

        def create_agent(ref: URIRef | None, agent_data: Dict[str, Any]):
            agent_type = (
                AgentType(agent_data["type"]) if agent_data.get("type") else None
            )
            address_input = {
                "admin_unit_L1": optional_literal(agent_data.get("admin_unit_l1")),
                "admin_unit_L2": optional_literal(agent_data.get("admin_unit_l2")),
                "post_name": optional_literal(agent_data.get("post_name")),
                "post_code": optional_literal(agent_data.get("post_code")),
                "thoroughfare": optional_literal(agent_data.get("thoroughfare")),
            }
            is_address_info_given = any(address_input.values())
            address = LOCNAddress(
                None,
                address_input,
            ) if is_address_info_given else None
            mbox = optional_literal(agent_data.get("mbox"))
            phone = optional_literal(agent_data.get("phone"))
            organizations = optional_literal(agent_data.get("member_of"))
            common_input = {
                "agent_type": agent_type,
                "address": address,
                "mbox": mbox,
                "phone": phone,
                **({"member_of": organizations} if organizations else {}),
            }
            if (
                agent_type
                and agent_type.iri == AgentType.namespace["PrivateIndividual(s)"]
            ):
                first_name = optional_literal(agent_data.get("first_name"))
                surname = optional_literal(agent_data.get("surname"))
                workplace_homepage = optional_literal(agent_data.get("workplace_homepage"))
                return Person(
                    ref,
                    common_input
                    | {
                        "name": (first_name if first_name else Literal("")) + ((" " + surname) if surname else ""),
                        "first_name": first_name,
                        "surname": surname,
                        "workplace_homepage": workplace_homepage,
                    },
                )
            else:
                return Organization(
                    ref, common_input | {"name": Literal(agent_data.get("organization_name"))}
                )

        rights_holder = (
            {
                "rights_holders": [
                    create_agent(None, rights_holder)
                    for rights_holder in dataset_dict["rights_holder"]
                ]
            }
            if dataset_dict.get("rights_holder")
            else {}
        )
        start_timestamp_str = (
            dataset_dict.get("start_timestamp") + "Z"
            if dataset_dict.get("start_timestamp")
            else None
        )
        end_timestamp_str = (
            dataset_dict.get("end_timestamp") + "Z"
            if dataset_dict.get("end_timestamp")
            else None
        )

        def create_distribution(dist: dict) -> Distribution:
            start_timestamp_str = (
                dist["start_timestamp"] + "Z" if dist.get("start_timestamp") else None
            )
            end_timestamp_str = (
                dist["end_timestamp"] + "Z" if dist.get("end_timestamp") else None
            )

            def data_service_ref(service_endpoint_url: str) -> URIRef:
                ref_base = catalog_uri().rstrip("/") + "/"
                unique_service_name = re.sub(
                    r"-+",
                    "-",
                    re.sub(
                        r"[^a-zA-Z0-9]",
                        "-",
                        service_endpoint_url.split("?")[0].rstrip("/"),
                    ),
                )
                return URIRef(f"{ref_base}data-service/{unique_service_name}")

            temporal = (
                {
                    "temporal": PeriodOfTime(
                        None,
                        {
                            **(
                                {
                                    "start_timestamp": Literal(
                                        datetime.fromisoformat(start_timestamp_str)
                                    )
                                }
                                if start_timestamp_str
                                else {}
                            ),
                            **(
                                {
                                    "end_timestamp": Literal(
                                        datetime.fromisoformat(end_timestamp_str)
                                    )
                                }
                                if end_timestamp_str
                                else {}
                            ),
                        },
                    )
                }
                if dist.get("start_timestamp") or dist.get("end_timestamp")
                else {}
            )
            access_service = (
                {
                    "access_service": DataService(
                        data_service_ref(
                            dist["data_service"][0]["data_service_endpoint_url"]
                        ),
                        {
                            **(dist["data_service"][0]),
                            "access_rights": RightsStatement(None, dist["rights_type"]),
                            "dataset_ref": dataset_ref,
                        },  # type: ignore
                    )
                }
                if dist.get("data_service")
                else {}
            )
            print(access_service)

            return Distribution(
                resource_uri(dist),
                {
                    "access_url": Literal(dist["url"]),
                    "format": Format(dist["format_iri"]),
                    "description": [
                        Literal(
                            dist.get("description_translated", {}).get(key, ""),
                            lang=key,
                        )
                        for key in (dist.get("description_translated") or {}).keys()
                    ],
                    "mobility_data_standard": MobilityDataStandard(
                        dist["mobility_data_standard"],
                    ),
                    "rights": RightsStatement(None, dist["rights_type"]),
                    **(
                        {
                            "application_layer_protocol": ApplicationLayerProtocol(
                                dist.get("application_layer_protocol")
                            )
                        }
                        if dist.get("application_layer_protocol")
                        else {}
                    ),
                    **(
                        {
                            "license": LicenseDocument(
                                None,
                                {
                                    **(
                                        {
                                            "identifier": StandardLicense(
                                                dist.get("license_id")
                                            )
                                        }
                                        if dist.get("license_id")
                                        else {}
                                    ),
                                    **(
                                        {"label": Literal(dist.get("license_text"))}
                                        if dist.get("license_text")
                                        else {}
                                    ),
                                },
                            )
                        }
                        if dist.get("license_id") or dist.get("license_text")
                        else {}
                    ),
                    "data_format_notes": [
                        Literal(
                            dist.get("data_format_notes_translated", {}).get(key, ""),
                            lang=key,
                        )
                        for key in (
                            dist.get("data_format_notes_translated") or {}
                        ).keys()
                    ],
                    "communication_method": (
                        CommunicationMethod(dist["communication_method"])
                        if dist.get("communication_method")
                        else None
                    ),
                    "character_encoding": (
                        Literal(dist["character_encoding"])
                        if dist.get("character_encoding")
                        else None
                    ),
                    "download_url": (
                        URIRef(dist["download_url"])
                        if dist.get("download_url")
                        else None
                    ),
                    "data_grammar": (
                        URIRef(dist["data_grammar"])
                        if dist.get("data_grammar")
                        else None
                    ),
                    "sample": URIRef(dist["sample"]) if dist.get("sample") else None,
                    **temporal,
                    **access_service,
                },
            )

        distribution = [create_distribution(dist) for dist in dataset_dict["resources"]]

        temporal = (
            {
                "temporal": PeriodOfTime(
                    None,
                    {
                        **(
                            {
                                "start_timestamp": Literal(
                                    datetime.fromisoformat(start_timestamp_str)
                                )
                            }
                            if start_timestamp_str
                            else {}
                        ),
                        **(
                            {
                                "end_timestamp": Literal(
                                    datetime.fromisoformat(end_timestamp_str)
                                )
                            }
                            if end_timestamp_str
                            else {}
                        ),
                    },
                )
            }
            if dataset_dict.get("start_timestamp") or dataset_dict.get("end_timestamp")
            else {}
        )
        theme = (
            {"theme": Theme(dataset_dict["theme"])} if dataset_dict.get("theme") else {}
        )
        transport_mode = (
            {
                "transport_mode": [
                    TransportMode(entry) for entry in dataset_dict["transport_mode"]
                ]
            }
            if dataset_dict.get("transport_mode")
            else {}
        )

        spatial = {"spatial": [Location(entry) for entry in dataset_dict["spatial"]]}

        def maybe_many(value, model):
            if isinstance(value, list):
                return [model(v) for v in value]
            return model(value)

        dataset = Dataset(
            dataset_ref,
            {
                "description": [
                    Literal(
                        dataset_dict.get("notes_translated", {}).get(key, ""), lang=key
                    )
                    for key in (dataset_dict.get("notes_translated") or {}).keys()
                ],
                "distribution": distribution,
                "accrualPeriodicity": maybe_many(dataset_dict["frequency"], Frequency),
                "mobility_theme": MobilityTheme(dataset_dict["mobility_theme"]),
                "title": [
                    Literal(
                        dataset_dict.get("title_translated", {}).get(key, ""), lang=key
                    )
                    for key in (dataset_dict.get("title_translated") or {}).keys()
                ],
                "publisher": create_agent(
                    organization_ref,
                    {"organization_name": dataset_dict["organization"]["name"]},
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
                **(
                    {
                        "network_coverage": NetworkCoverage(
                            dataset_dict["network_coverage"]
                        )
                    }
                    if dataset_dict.get("network_coverage")
                    else {}
                ),
                **contact_points,
                **rights_holder,
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
                    {"language": URIRef(dataset_dict["language"])}
                    if dataset_dict.get("language")
                    else {}
                ),
                **quality_annotation,
                **assessments,
                **related_resource,
                **is_referenced_by,
                **temporal,
                **theme,
                **transport_mode,
                **spatial,
            },
        )

        # Catalog Record
        self.catalog_record = CatalogRecord(
            None,
            {
                "created": Literal(dataset_dict["metadata_created"]),
                "primary_topic": dataset,
                "modified": Literal(dataset_dict["metadata_modified"]),
            },
        )
