from typing import TypedDict, List

from rdflib import Literal, DCAT, DCTERMS, RDF, URIRef

from ckanext.digitraffic_theme.profiles.model.agent import Agent
from ckanext.digitraffic_theme.profiles.model.class_instance import ClassInstance
from ckanext.digitraffic_theme.profiles.model.distribution import Distribution
from ckanext.digitraffic_theme.profiles.model.frequency import Frequency
from ckanext.digitraffic_theme.profiles.model.location import Location
from ckanext.digitraffic_theme.profiles.model.mobility_theme import MobilityTheme
from ckanext.digitraffic_theme.profiles.model.mobility_theme_sub import MobilityThemeSub
from ckanext.digitraffic_theme.profiles.rdf.mobility_dcat_ap import MOBILITYDCATAP


class DatasetInput(TypedDict):
    description: Literal
    distribution: List[Distribution]
    accrualPeriodicity: Frequency
    mobility_theme: MobilityTheme
    mobility_theme_sub: MobilityThemeSub
    spatial: Location
    title: Literal
    publisher: Agent


class Dataset(ClassInstance):
    description: Literal
    distribution: List[Distribution]
    accrualPeriodicity: Frequency
    mobility_theme: MobilityTheme
    mobility_theme_sub: MobilityThemeSub
    spatial: Location
    title: Literal
    publisher: Agent

    def __init__(self, iri: str, input: DatasetInput):
        super().__init__(iri, DCAT.Dataset)
        self.description = input["description"]
        self.distribution = input["distribution"]
        self.accrualPeriodicity = input["accrualPeriodicity"]
        self.mobility_theme = input["mobility_theme"]
        self.mobility_theme_sub = input["mobility_theme_sub"]
        self.spatial = input["spatial"]
        self.title = input["title"]
        self.publisher = input["publisher"]

    def predicate_objects(self):
        return [
            (RDF.type, self.type),
            (DCTERMS.description, self.description),
            (DCTERMS.accrualPeriodicity, self.accrualPeriodicity),
            (MOBILITYDCATAP.mobilityTheme, self.mobility_theme),
            (MOBILITYDCATAP.mobilityTheme, self.mobility_theme_sub),
            (DCTERMS.spatial, self.spatial),
            (DCTERMS.title, self.title),
            (DCTERMS.publisher, self.publisher)
        ] + [(DCAT.distribution, dist) for dist in self.distribution]
