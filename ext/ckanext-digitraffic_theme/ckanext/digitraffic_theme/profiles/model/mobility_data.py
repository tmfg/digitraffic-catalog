from typing import Any
from rdflib import URIRef, Literal

from ckan.common import request, config

from ckanext.dcat.utils import publisher_uri_organization_fallback, resource_uri
from ckanext.digitraffic_theme.profiles.model.agent import Agent
from ckanext.digitraffic_theme.profiles.model.catalog_record import CatalogRecord
from ckanext.digitraffic_theme.profiles.model.dataset import Dataset
from ckanext.digitraffic_theme.profiles.model.distribution import Distribution
from ckanext.digitraffic_theme.profiles.model.frequency import Frequency
from ckanext.digitraffic_theme.profiles.model.language import Language
from ckanext.digitraffic_theme.profiles.model.location import Location
from ckanext.digitraffic_theme.profiles.model.mobility_theme import MobilityTheme
from ckanext.digitraffic_theme.profiles.model.mobility_theme_sub import MobilityThemeSub


class MobilityData:
    catalog_record: CatalogRecord

    def __init__(self, dataset_dict: dict[str, Any], dataset_ref: URIRef):
        current_language = request.environ.get(
            "CKAN_LANG", config.get("ckan.locale_default")
        )

        organization_ref = dataset_dict.get(
            "publisher_uri", publisher_uri_organization_fallback(dataset_dict)
        )
        dataset = Dataset(
            dataset_ref,
            {
                "description": Literal(
                    dataset_dict.get("notes_translated", {}).get(current_language, "")
                ),
                "distribution": [
                    Distribution(resource_uri(dist), dist)
                    for dist in dataset_dict["resources"]
                ],
                "accrualPeriodicity": Frequency(dataset_dict["frequency"]),
                "mobility_theme": MobilityTheme(dataset_dict["mobility_theme"]),
                "mobility_theme_sub": MobilityThemeSub(
                    dataset_dict["mobility_theme_sub"]
                ),
                "spatial": Location(dataset_dict["spatial"]),
                "title": Literal(dataset_dict["name"]),
                "publisher": Agent(
                    organization_ref, dataset_dict["organization"]["name"]
                ),
            },
        )
        # Catalog Record
        self.catalog_record = CatalogRecord(
            None,
            {
                "created": Literal(dataset_dict["metadata_created"]),
                "language": Language(dataset_dict["metadata_language"]),
                "primary_topic": dataset,
                "modified": Literal(dataset_dict["metadata_modified"]),
            },
        )
