from typing import Any, List
from rdflib import URIRef, Literal

from ckanext.digitraffic_theme.profiles.model.agent import Agent
from ckanext.digitraffic_theme.profiles.model.distribution import Distribution
from ckanext.digitraffic_theme.profiles.model.mobility_theme import MobilityTheme
from ckanext.digitraffic_theme.profiles.model.mobility_theme_sub import MobilityThemeSub


class MobilityData:
    author: str
    author_email: str

    # Dataset
    description: Literal
    distribution: List[Distribution]
    accrualPeriodicity: Literal
    mobility_theme: MobilityTheme
    mobility_theme_sub: MobilityThemeSub
    #spatial: Location
    title: Literal
    publisher: Agent

    def __init__(self, dataset_dict: dict[str, Any], dataset_ref: URIRef):
        self.author = dataset_dict["author"]
        self.description = Literal(dataset_dict["notes"])
        self.distribution = [Distribution(dist) for dist in dataset_dict["resources"]]
        self.accrualPeriodicity = Literal(dataset_dict["frequency"])
        self.mobility_theme = MobilityTheme(dataset_dict["mobility_theme"])
        self.mobility_theme_sub = MobilityThemeSub(dataset_dict["mobility_theme_sub"])
        #self.spatial = Location(dataset_dict["gazetteer"], dataset_dict["geographic_identifier"])
        self.title = Literal(dataset_dict["name"])
        self.publisher = Agent(str(dataset_ref) + '/publisher', dataset_dict["publisher_name"])

