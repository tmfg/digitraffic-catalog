from typing import Any
from rdflib import URIRef, Literal

from ckanext.digitraffic_theme.profiles.model.agent import Agent
from ckanext.digitraffic_theme.profiles.model.catalog_record import CatalogRecord
from ckanext.digitraffic_theme.profiles.model.dataset import Dataset
from ckanext.digitraffic_theme.profiles.model.distribution import Distribution
from ckanext.digitraffic_theme.profiles.model.language import Language
from ckanext.digitraffic_theme.profiles.model.location import Location
from ckanext.digitraffic_theme.profiles.model.mobility_theme import MobilityTheme
from ckanext.digitraffic_theme.profiles.model.mobility_theme_sub import MobilityThemeSub


class MobilityData:
    catalog_record: CatalogRecord

    def __init__(self, dataset_dict: dict[str, Any], dataset_ref: URIRef):
        dataset = Dataset(dataset_ref, {
            "description": Literal(dataset_dict["notes"]),
            "distribution": [Distribution(str(dataset_ref) + '/resource/' + dist['id'], dist) for dist in dataset_dict["resources"]],
            "accrualPeriodicity": URIRef(dataset_dict["frequency"]),
            "mobility_theme": MobilityTheme(dataset_dict["mobility_theme"]),
            "mobility_theme_sub": MobilityThemeSub(dataset_dict["mobility_theme_sub"]),
            "spatial": Location(dataset_dict["spatial"]),
            "title": Literal(dataset_dict["name"]),
            "publisher": Agent(str(dataset_ref) + '/publisher', dataset_dict["publisher_name"])
        })
        # Catalog Record
        self.catalog_record = CatalogRecord(str(dataset_ref).replace("/dataset/", "/catalog-record/"), {
            "created": Literal(dataset_dict["metadata_created"]),
            "language": Language(dataset_dict["metadata_language"]),
            "primary_topic": dataset,
            "modified": Literal(dataset_dict["metadata_modified"]),
        })
