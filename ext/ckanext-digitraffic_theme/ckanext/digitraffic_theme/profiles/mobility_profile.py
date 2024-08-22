import pprint
from rdflib import Graph, DCTERMS, URIRef, Literal, DCAT, RDF, FOAF

from ckanext.dcat.profiles import RDFProfile
from ckanext.digitraffic_theme.profiles.graph_modifiers.adder_util import add_class_instance_with_children, get_adder
from ckanext.digitraffic_theme.profiles.graph_modifiers.class_instance_adder import ClassInstanceAdder
from ckanext.digitraffic_theme.profiles.graph_modifiers.literal_adder import LiteralAdder
from ckanext.digitraffic_theme.profiles.graph_modifiers.uriref_adder import URIRefAdder
from ckanext.digitraffic_theme.profiles.graph_modifiers.vocabulary_adder import VocabularyAdder
from ckanext.digitraffic_theme.profiles.model.agent import Agent
from ckanext.digitraffic_theme.profiles.model.catalog_record import CatalogRecord
from ckanext.digitraffic_theme.profiles.model.class_instance import ClassInstance
from ckanext.digitraffic_theme.profiles.model.distribution import Distribution
from ckanext.digitraffic_theme.profiles.model.location import Location
from ckanext.digitraffic_theme.profiles.model.mobility_data import MobilityData
from ckanext.digitraffic_theme.profiles.model.vocabulary import Vocabulary
from ckanext.digitraffic_theme.profiles.rdf.mobility_dcat_ap import MOBILITYDCATAP


class MobilityDCATAPProfile(RDFProfile):

    def parse_dataset(self, dataset_dict, dataset_ref):
        return super().parse_dataset(dataset_dict, dataset_ref)

    def graph_from_dataset(self, dataset_dict, dataset_ref):
        pprint.pprint(dataset_dict)
        mobility_data: MobilityData = MobilityData(dataset_dict, dataset_ref)
        g: Graph = self.g
        g.bind("mobilitydcatap", MOBILITYDCATAP)

        ## Remove some values that we are going to put in ourselves
        for obj in g.objects(dataset_ref, DCTERMS.publisher):
            g.remove((dataset_ref, DCTERMS.publisher, obj))
        for obj in g.objects(dataset_ref, DCTERMS.spatial):
            g.remove((dataset_ref, DCTERMS.spatial, obj))
        for dist in g.objects(dataset_ref, DCAT.distribution):
            for p, o in g.predicate_objects(dist):
                if (p == DCTERMS.format or
                        p == RDF.type or
                        p == DCAT.accessURL):
                    g.remove((dist, p, o))

        # DATASET
        ## required
        # g.add((dataset_ref, DCTERMS.description, mobility_data.description))

        # g.add((dataset_ref, MOBILITYDCATAP.mobilityTheme, mobility_data.mobility_theme.iri))
        # g.add((dataset_ref, MOBILITYDCATAP.mobilityThemeSub, mobility_data.mobility_theme_sub.iri))
        # super().graph_from_dataset(dataset_dict, dataset_ref)

        MobilityDCATAPProfile.add_literal(g, dataset_ref, DCTERMS.description, mobility_data.description)
        MobilityDCATAPProfile.add_vocabulary(g, dataset_ref, MOBILITYDCATAP.mobilityTheme, mobility_data.mobility_theme)
        MobilityDCATAPProfile.add_vocabulary(g, dataset_ref, MOBILITYDCATAP.mobilityTheme, mobility_data.mobility_theme_sub)
        MobilityDCATAPProfile.add_vocabulary(g, dataset_ref, DCTERMS.spatial, mobility_data.spatial)
        MobilityDCATAPProfile.add_literal(g, dataset_ref, DCTERMS.title, mobility_data.title)
        MobilityDCATAPProfile.add_class_instance_with_children(g, dataset_ref, DCTERMS.publisher, mobility_data.publisher)

        # Dist
        for dist in mobility_data.distribution:
            MobilityDCATAPProfile.add_class_instance_with_children(g, dataset_ref, DCAT.distribution, dist)

        # Remove leftovers
        for s, p, o in g:
            if not isinstance(s, URIRef):
                g.remove((s, p, o))

        self.inject_record(mobility_data, dataset_ref)

    def graph_from_catalog(self, catalog_dict, catalog_ref):

        print("graph_from_catalog")
        pprint.pprint(catalog_dict)
        g: Graph = self.g
        # Remove data that we are going to add ourselves
        for obj in g.objects(catalog_ref, DCTERMS.title):
            g.remove((catalog_ref, DCTERMS.title, obj))

        # Add the metadata
        MobilityDCATAPProfile.add_literal(g, catalog_ref, DCTERMS.description, Literal("Digitraffic Catalog description"))
        MobilityDCATAPProfile.add_class_instance_with_children(g, catalog_ref, DCTERMS.publisher, Agent(catalog_ref + "/publisher", "Digitraffic"))
        MobilityDCATAPProfile.add_vocabulary(g, catalog_ref, DCTERMS.spatial, Location('http://data.europa.eu/nuts/code/FI'))
        MobilityDCATAPProfile.add_literal(g, catalog_ref, DCTERMS.title, Literal("Digitraffic Catalog"))

    def inject_record(self, mobility_data: MobilityData, dataset_ref: URIRef):
        """DCAT extension does not have a support for Catalog Records which are required for MobilityDCAT-AP.
           Inject the metadata here."""

        g: Graph = self.g
        catalog_ref: URIRef = self._get_root_catalog_ref()
        # Catalog_ref points directly to datasets. We do not want that as it should poit to catalog records
        print("FOOOOOO")

        # CATALOG RECORD
        catalog_record_ref = mobility_data.catalog_record.iri

        for p, o in mobility_data.catalog_record.predicate_objects():
            if isinstance(o, Distribution):
                MobilityDCATAPProfile.add_class_instance(g, catalog_record_ref, FOAF.primaryTopic, o)
                continue
            adder = get_adder(o)
            adder.add_to_graph(g, catalog_record_ref, p, o)

        # CATALOG

        MobilityDCATAPProfile.add_class_instance(g, catalog_ref, DCAT.record, mobility_data.catalog_record)

        g.remove((catalog_ref, DCAT.dataset, dataset_ref))

        #    MobilityDCATAPProfile.add_uriref(g, dataset_ref, DCAT.record, dataset_ref)



    @staticmethod
    def add_vocabulary(g: Graph, subject: URIRef, predicate: URIRef, obj: Vocabulary):
        VocabularyAdder.add_to_graph(g, subject, predicate, obj)

    @staticmethod
    def add_literal(g: Graph, subject: URIRef, predicate: URIRef, obj: Literal):
        LiteralAdder.add_to_graph(g, subject, predicate, obj)

    @staticmethod
    def add_uriref(g: Graph, subject: URIRef, predicate: URIRef, obj: URIRef):
        URIRefAdder.add_to_graph(g, subject, predicate, obj)

    @staticmethod
    def add_class_instance_with_children(g: Graph, subject: URIRef, predicate: URIRef, obj: ClassInstance):
        add_class_instance_with_children(g, subject, predicate, obj)

    @staticmethod
    def add_class_instance(g: Graph, subject: URIRef, predicate: URIRef, obj: ClassInstance):
        ClassInstanceAdder.add_to_graph(g, subject, predicate, obj)