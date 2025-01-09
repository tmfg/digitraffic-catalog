from typing import Any, Dict
from rdflib import URIRef, Literal
from datetime import datetime

from ckanext.dcat.utils import publisher_uri_organization_fallback, resource_uri
from ckanext.digitraffic_theme.model.address import VCARDAddress, LOCNAddress
from ckanext.digitraffic_theme.model.agent_type import AgentType
from ckanext.digitraffic_theme.model.catalog_record import CatalogRecord
from ckanext.digitraffic_theme.model.contact_point import ContactPoint
from ckanext.digitraffic_theme.model.dataset import Dataset
from ckanext.digitraffic_theme.model.distribution import Distribution
from ckanext.digitraffic_theme.model.frequency import Frequency
from ckanext.digitraffic_theme.model.location import Location
from ckanext.digitraffic_theme.model.rights_statement import RightsStatement
from ckanext.digitraffic_theme.model.application_layer_protocol import ApplicationLayerProtocol
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


from ckanext.digitraffic_theme.model.organization import Organization
from ckanext.digitraffic_theme.model.person import Person
from ckanext.digitraffic_theme.model.period_of_time import PeriodOfTime


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

        def create_agent(ref: URIRef | None, agent_data: Dict[str, Any]):
            agent_type = (
                AgentType(agent_data["type"]) if agent_data.get("type") else None
            )
            address = LOCNAddress(
                None,
                {
                    "admin_unit_L1": Literal(agent_data.get("admin_unit_l1")),
                    "admin_unit_L2": Literal(agent_data.get("admin_unit_l2")),
                    "post_name": Literal(agent_data.get("post_name")),
                    "post_code": Literal(agent_data.get("post_code")),
                    "thoroughfare": Literal(agent_data.get("thoroughfare")),
                },
            )
            mbox = Literal(agent_data.get("mbox"))
            phone = Literal(agent_data.get("phone"))
            organizations = (
                [
                    Organization(None, {"name": Literal(org.get("name"))})
                    for org in agent_data.get("member_of")
                ]
                if agent_data.get("member_of")
                else None
            )
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
                first_name = Literal(agent_data.get("first_name", ""))
                surname = Literal(agent_data.get("surname"))
                workplace_homepage = Literal(agent_data.get("workplace_homepage"))
                return Person(
                    ref,
                    common_input
                    | {
                        "name": first_name + ((" " + surname) if surname else ""),
                        "first_name": first_name,
                        "surname": surname,
                        "workplace_homepage": workplace_homepage,
                    },
                )
            else:
                return Organization(
                    ref, common_input | {"name": Literal(agent_data.get("name"))}
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
        start_timestamp_str = dataset_dict.get("start_timestamp") + "Z" if dataset_dict.get("start_timestamp") else None
        end_timestamp_str = dataset_dict.get("end_timestamp") + "Z" if dataset_dict.get("end_timestamp") else None
        distribution = [
            Distribution(resource_uri(dist), {
                "access_url": Literal(dist["url"]),
                "format": Format(dist["format_iri"]),
                "description": [
                    Literal(dist.get("description_translated", {}).get(key, ""), lang=key)
                    for key in dist.get("description_translated", {}).keys()
                ],
                "mobility_data_standard": MobilityDataStandard(
                    dist["mobility_data_standard"],
                ),
                "rights": RightsStatement(None, dist["rights_type"]),
                **({"application_layer_protocol": ApplicationLayerProtocol(dist.get('application_layer_protocol'))}
                   if dist.get('application_layer_protocol')
                   else {}),
                **({"license": LicenseDocument(None, {
                    **({"identifier": StandardLicense(dist.get("license_id"))} if dist.get('license_id') else {}),
                    **({"label": Literal(dist.get("license_text"))} if dist.get('license_text') else {})
                   })}
                   if dist.get("license_id") or dist.get("license_text")
                   else {})
            })
            for dist in dataset_dict["resources"]
        ]
        temporal = (
            {
                "temporal": PeriodOfTime(None,{
                    **({"start_timestamp": Literal(datetime.fromisoformat(start_timestamp_str))} if start_timestamp_str else {}),
                    **({"end_timestamp": Literal(datetime.fromisoformat(end_timestamp_str))} if end_timestamp_str else {}),
                })
            }
            if dataset_dict.get("start_timestamp") or dataset_dict.get("end_timestamp")
            else {}
        )
        theme = (
            {
                "theme": Theme(dataset_dict["theme"])
            }
            if dataset_dict.get("theme")
            else {}
        )
        transport_mode = (
            {
                "transport_mode": TransportMode(dataset_dict["transport_mode"])
            }
            if dataset_dict.get("transport_mode")
            else {}
        )

        dataset = Dataset(
            dataset_ref,
            {
                "description": [
                    Literal(
                        dataset_dict.get("notes_translated", {}).get(key, ""), lang=key
                    )
                    for key in dataset_dict.get("notes_translated", {}).keys()
                ],
                "distribution": distribution,
                "accrualPeriodicity": Frequency(dataset_dict["frequency"]),
                "mobility_theme": MobilityTheme(dataset_dict["mobility_theme"]),
                "spatial": Location(dataset_dict["spatial"]),
                "title": Literal(dataset_dict["name"]),
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
                **temporal,
                **theme,
                **transport_mode
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
