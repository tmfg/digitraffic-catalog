from datetime import datetime, timezone

from rdflib import Graph, URIRef, Literal, BNode
from rdflib.namespace import DCTERMS, DCAT, RDF, XSD

from ckanext.dcat.profiles import RDFProfile
from ckanext.digitraffic_theme.profiles.graph_modifiers.adder import (
    add_class_instance_with_children,
    add_class_instance_values,
    add_literal_to_graph,
    add_vocabulary_to_graph,
)
from ckanext.digitraffic_theme.model.agent import Agent
from ckanext.digitraffic_theme.model.location import Location
from ckanext.digitraffic_theme.model.mobility_data import MobilityData
from ckanext.digitraffic_theme.rdf.mobility_dcat_ap import MOBILITYDCATAP


class MobilityDCATAPProfile(RDFProfile):

    def parse_dataset(self, dataset_dict, dataset_ref):
        return super().parse_dataset(dataset_dict, dataset_ref)

    def graph_from_dataset(self, dataset_dict, dataset_ref):
        mobility_data: MobilityData = MobilityData(dataset_dict, dataset_ref)
        g: Graph = self.g
        g.bind("mobilitydcatap", MOBILITYDCATAP)

        self._remove_existing_self_managed_graph_data(dataset_ref)
        self._update_existing_graph_data(dataset_ref, mobility_data)

        # We'll end up adding Dataset metadata when injecting record
        self._inject_record(mobility_data, dataset_ref)

    def graph_from_catalog(self, catalog_dict, catalog_ref):
        g: Graph = self.g
        # Remove data that we are going to add ourselves
        for obj in g.objects(catalog_ref, DCTERMS.title):
            g.remove((catalog_ref, DCTERMS.title, obj))
        for obj in g.objects(catalog_ref, DCTERMS.language):
            g.remove((catalog_ref, DCTERMS.language, obj))

        # Add the metadata
        add_literal_to_graph(
            g,
            catalog_ref,
            DCTERMS.description,
            Literal("Digitraffic Catalog description"),
        )
        add_class_instance_with_children(
            g, catalog_ref, DCTERMS.publisher, Agent(None, "Digitraffic")
        )
        add_vocabulary_to_graph(
            g,
            catalog_ref,
            DCTERMS.spatial,
            Location("http://data.europa.eu/nuts/code/FI"),
        )
        add_literal_to_graph(
            g, catalog_ref, DCTERMS.title, Literal("Digitraffic Catalog")
        )

        # Add all languages supported by the catalog
        add_literal_to_graph(
            g,
            catalog_ref,
            DCTERMS.language,
            URIRef("http://publications.europa.eu/resource/authority/language/ENG"),
        )
        add_literal_to_graph(
            g,
            catalog_ref,
            DCTERMS.language,
            URIRef("http://publications.europa.eu/resource/authority/language/FIN"),
        )
        add_literal_to_graph(
            g,
            catalog_ref,
            DCTERMS.language,
            URIRef("http://publications.europa.eu/resource/authority/language/SWE"),
        )

    def _remove_existing_self_managed_graph_data(self, dataset_ref):
        g: Graph = self.g
        ## Remove some values that we are going to put in ourselves
        for obj in g.objects(dataset_ref, DCTERMS.publisher):
            g.remove((dataset_ref, DCTERMS.publisher, obj))
        for obj in g.objects(dataset_ref, DCTERMS.spatial):
            g.remove((dataset_ref, DCTERMS.spatial, obj))
        for obj in g.objects(dataset_ref, DCTERMS.accrualPeriodicity):
            g.remove((dataset_ref, DCTERMS.accrualPeriodicity, obj))
        for obj in g.objects(dataset_ref, DCTERMS.title):
            g.remove((dataset_ref, DCTERMS.title, obj))
        for obj in g.objects(dataset_ref, DCTERMS.description):
            g.remove((dataset_ref, DCTERMS.description, obj))
        for dist in g.objects(dataset_ref, DCAT.distribution):
            for p, o in g.predicate_objects(dist):
                if (
                    p == DCTERMS.format
                    or p == RDF.type
                    or p == DCAT.accessURL
                    or p == DCTERMS.description
                ):
                    g.remove((dist, p, o))
        # Remove leftovers
        for s, p, o in g:
            if isinstance(s, BNode) and (None, None, s) not in g:
                g.remove((s, p, o))

    def _update_existing_graph_data(self, dataset_ref, mobility_data: MobilityData):
        g: Graph = self.g
        for s, p, o in g:
            # Add timezones to datetimes.
            # Internally, CKAN saves all times in UTC.
            # https://docs.ckan.org/en/2.10/maintaining/configuration.html?highlight=utc#ckan-display-timezone
            if isinstance(o, Literal) and o.datatype == XSD.dateTime:
                g.remove((s, p, o))
                g.add((s, p, Literal(o.toPython().replace(tzinfo=timezone.utc))))

    def _inject_record(self, mobility_data: MobilityData, dataset_ref: URIRef):
        """DCAT extension does not have a support for Catalog Records which are required for MobilityDCAT-AP.
        Inject the metadata here."""

        g: Graph = self.g
        try:
            catalog_ref: URIRef = self._get_root_catalog_ref()
            add_class_instance_with_children(
                g, catalog_ref, DCAT.record, mobility_data.catalog_record
            )
        # We end up with an exception when metadata is asked only for a Dataset. In that situation, there is no catalog_ref
        except Exception:
            add_class_instance_values(g, mobility_data.catalog_record.primary_topic)
