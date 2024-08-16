from typing import Any, List
from rdflib import URIRef

from ckanext.digitraffic_theme.profiles.model.distribution import Distribution
from ckanext.digitraffic_theme.profiles.rdf.mobility_dcat_ap import MOBILITYDCATAP


class MobilityData:
    author: str
    author_email: str

    # Dataset
    description: str
    distribution: List[Distribution]
    mobility_theme: MOBILITYDCATAP.mobilityTheme

    def __init__(self, dataset_dict: dict[str, Any]):
        self.author = dataset_dict["author"]
        self.description = dataset_dict["notes"]
        self.distribution = [Distribution(dist) for dist in dataset_dict["resources"]]
        self.mobility_theme = URIRef(dataset_dict["mobility_theme"])

