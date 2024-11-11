from typing import TypedDict, List, NotRequired, Optional

from rdflib import Literal, DCAT, DCTERMS, RDF, URIRef

from ckanext.digitraffic_theme.model.agent import Agent
from ckanext.digitraffic_theme.model.class_instance import ClassInstance
from ckanext.digitraffic_theme.model.distribution import Distribution
from ckanext.digitraffic_theme.model.frequency import Frequency
from ckanext.digitraffic_theme.model.location import Location
from ckanext.digitraffic_theme.model.mobility_theme import MobilityTheme
from ckanext.digitraffic_theme.model.mobility_theme_sub import MobilityThemeSub
from ckanext.digitraffic_theme.rdf.mobility_dcat_ap import MOBILITYDCATAP


class DatasetInput(TypedDict):
    description: List[Literal]
    distribution: List[Distribution]
    accrualPeriodicity: Frequency
    mobility_theme: MobilityTheme
    mobility_theme_sub: NotRequired[MobilityThemeSub]
    spatial: Location
    title: Literal
    publisher: Agent


class Dataset(ClassInstance):
    description: List[Literal]
    distribution: List[Distribution]
    accrualPeriodicity: Frequency
    mobility_theme: MobilityTheme
    mobility_theme_sub: Optional[MobilityThemeSub]
    spatial: Location
    title: Literal
    publisher: Agent

    def __init__(self, iri: str, input: DatasetInput):
        super().__init__(iri, DCAT.Dataset)
        self.description = input["description"]
        self.distribution = input["distribution"]
        self.accrualPeriodicity = input["accrualPeriodicity"]
        self.mobility_theme = input["mobility_theme"]
        self.mobility_theme_sub = input.get("mobility_theme_sub")
        self.spatial = input["spatial"]
        self.title = input["title"]
        self.publisher = input["publisher"]

    def predicate_objects(self):
        pos = [
            (RDF.type, self.type),
            # multilingual field
            *[(DCTERMS.description, entry) for entry in self.description],
            (DCTERMS.accrualPeriodicity, self.accrualPeriodicity),
            (MOBILITYDCATAP.mobilityTheme, self.mobility_theme),
            (MOBILITYDCATAP.mobilityTheme, self.mobility_theme_sub) if self.mobility_theme_sub else None,
            (DCTERMS.spatial, self.spatial),
            (DCTERMS.title, self.title),
            (DCTERMS.publisher, self.publisher),
            *[(DCAT.distribution, dist) for dist in self.distribution]
        ]
        return [po for po in pos if po is not None]
