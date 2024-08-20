import pprint
from rdflib import Graph, DCTERMS, URIRef, Literal

from ckanext.dcat.profiles import RDFProfile
from ckanext.digitraffic_theme.profiles.graph_modifiers.class_instance_adder import ClassInstanceAdder
from ckanext.digitraffic_theme.profiles.graph_modifiers.literal_adder import LiteralAdder
from ckanext.digitraffic_theme.profiles.graph_modifiers.vocabulary_adder import VocabularyAdder
from ckanext.digitraffic_theme.profiles.model.class_instance import ClassInstance
from ckanext.digitraffic_theme.profiles.model.mobility_data import MobilityData
from ckanext.digitraffic_theme.profiles.model.vocabulary import Vocabulary
from ckanext.digitraffic_theme.profiles.rdf.mobility_dcat_ap import MOBILITYDCATAP


class MobilityDCATAPProfile(RDFProfile):

    def parse_dataset(self, dataset_dict, dataset_ref):
        return super().parse_dataset(dataset_dict, dataset_ref)

    def graph_from_dataset(self, dataset_dict, dataset_ref):
        pprint.pprint(dataset_dict)
        mobility_data: MobilityData = MobilityData(dataset_dict)
        g: Graph = self.g
        g.bind("mobilitydcatap", MOBILITYDCATAP)

        # DATASET
        ## required
        #g.add((dataset_ref, DCTERMS.description, mobility_data.description))

        #g.add((dataset_ref, MOBILITYDCATAP.mobilityTheme, mobility_data.mobility_theme.iri))
        #g.add((dataset_ref, MOBILITYDCATAP.mobilityThemeSub, mobility_data.mobility_theme_sub.iri))
        #super().graph_from_dataset(dataset_dict, dataset_ref)

        self.add_literal(g, dataset_ref, DCTERMS.description, mobility_data.description)
        self.add_vocabulary(g, dataset_ref, MOBILITYDCATAP.mobilityTheme, mobility_data.mobility_theme)
        self.add_vocabulary(g, dataset_ref, MOBILITYDCATAP.mobilityThemeSub, mobility_data.mobility_theme_sub)
        self.add_literal(g, dataset_ref, DCTERMS.title, mobility_data.title)
        self.add_class_instance(g, dataset_ref, DCTERMS.publisher, mobility_data.publisher)

    @staticmethod
    def add_vocabulary(g: Graph, subject: URIRef, predicate: URIRef, obj: Vocabulary):
        VocabularyAdder.add_to_graph(g, subject, predicate, obj)

    @staticmethod
    def add_literal(g: Graph, subject: URIRef, predicate: URIRef, obj: Literal):
        LiteralAdder.add_to_graph(g, subject, predicate, obj)

    @staticmethod
    def add_class_instance(g: Graph, subject: URIRef, predicate: URIRef, obj: ClassInstance):
        ClassInstanceAdder.add_to_graph(g, subject, predicate, obj)
