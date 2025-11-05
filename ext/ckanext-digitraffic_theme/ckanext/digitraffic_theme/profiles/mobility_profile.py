from datetime import timezone, datetime
from typing import TypedDict

import ckan.plugins.toolkit as toolkit

from ckanext.dcat.profiles import RDFProfile

from ckanext.digitraffic_theme.model.language import Language
from ckanext.digitraffic_theme.model.organization import Organization
from ckanext.digitraffic_theme.model.standard_license import StandardLicense
from ckanext.digitraffic_theme.model.theme import Theme

from ckanext.digitraffic_theme.rdf.oa import OA
from ckanext.digitraffic_theme.rdf.cnt import CNT
from ckanext.digitraffic_theme.rdf.dqv import DQV
from ckanext.digitraffic_theme.profiles.graph_modifiers.adder import (
    add_class_instance_values,
    add_class_instance_with_children,
    add_literal_to_graph,
    add_vocabulary_to_graph,
    add_uriref_to_graph,
)
from ckanext.digitraffic_theme.model.location import Location
from ckanext.digitraffic_theme.model.mobility_data import MobilityData
from ckanext.digitraffic_theme.rdf.mobility_dcat_ap import MOBILITYDCATAP
from rdflib import BNode, Graph, Literal, URIRef
from rdflib.namespace import DCAT, DCTERMS, RDF, XSD, FOAF

class Translations(TypedDict):
    fi: str
    en: str
    sv: str

class CatalogMetadata(TypedDict):
    description: Translations
    homepage: str
    publisher: Organization
    spatial: Location
    title: Translations
    language: list[Language]
    license: StandardLicense
    release_date: datetime
    theme: list[Theme]

class MobilityDCATAPProfile(RDFProfile):

    def parse_dataset(self, dataset_dict, dataset_ref):
        return super().parse_dataset(dataset_dict, dataset_ref)

    def graph_from_dataset(self, dataset_dict, dataset_ref):
        mobility_data: MobilityData = MobilityData(dataset_dict, dataset_ref)
        g: Graph = self.g

        # Namespace prefix mappings
        g.bind("mobilitydcatap", MOBILITYDCATAP)
        g.bind("oa", OA)
        g.bind("dqv", DQV)
        g.bind("cnt", CNT)

        #self._remove_existing_self_managed_graph_data(dataset_ref)
        self._update_existing_graph_data(dataset_ref, mobility_data)

        # dct:identifier should contain the value of rdf:about (the subject URI)
        # dataset_ref contains this value
        add_literal_to_graph(g, dataset_ref, DCTERMS.identifier, Literal(dataset_ref))

        # We'll end up adding Dataset metadata when injecting record
        self._inject_record(mobility_data, dataset_ref)
        self._remove_empty_values(g)

    def graph_from_catalog(self, catalog_dict, catalog_ref):
        g: Graph = self.g

        catalog_metadata = {
            'description': {
                'fi': 'Tämä kansallinen yhteyspiste toteuttaa EU:n ITS-direktiivin ja komission delegoitujen asetusten 2022/670 (nk. RTTI-asetus), 886/2013 (nk. SRTI-asetus) sekä vaihtoehtoisten polttoaineiden infrastruktuuria koskevan asetuksen 2023/1804 (nk. AFIR-asetus) mukaisen kansallisen yhteyspisteen.',
                'en': 'This national access point implements the EU ITS Directive and the Commission\'s delegated regulations 2022/670 (known as the RTTI regulation), 886/2013 (known as the SRTI regulation), and the regulation on alternative fuel infrastructure 2023/1804 (known as the AFIR regulation).',
                'sv': 'Denna nationella kontaktpunkt implementerar EU:s ITS-direktiv och kommissionens delegerade förordningar 2022/670 (s.k. RTTI-förordningen), 886/2013 (s.k. SRTI-förordningen) samt förordningen om infrastruktur för alternativa bränslen 2023/1804 (s.k. AFIR-förordningen).'
            },
            'homepage': toolkit.config.get('ckan.site_url'),
            'publisher': Organization(
                None,
                {
                    "name": Literal("Fintraffic"),
                    "url": URIRef("https://www.fintraffic.fi/")
                }
            ),
            'spatial': Location("http://data.europa.eu/nuts/code/FI"),
            'title': {
                'fi': 'Liikennedatakatalogi',
                'en': 'Traffic Data Catalog',
                'sv': 'Trafikdatakatalog'
            },
            'language': [
                Language("http://publications.europa.eu/resource/authority/language/FIN"),
                Language("http://publications.europa.eu/resource/authority/language/ENG"),
                Language("http://publications.europa.eu/resource/authority/language/SWE")
            ],
            'license': StandardLicense("http://publications.europa.eu/resource/authority/licence/CC_BY_4_0"),
            'release_date': None,
            'theme': [Theme("http://publications.europa.eu/resource/authority/data-theme/TRAN")],
        }
        self._catalog_metadata(g, catalog_ref, catalog_metadata)


        # Special handling for dcat:DataService
        # The database might have multiple identical values for dcat:DataService properties. Remove the dublicates.
        for service in g.objects(catalog_ref, DCAT.dataService):
            for p in (DCTERMS.title, DCAT.endpointDescription, DCTERMS.accessRights, DCTERMS.description, DCTERMS.license):
                for o in g.objects(service, p):
                    same_triples = g.triples((service, p, o))
                    if len(same_triples) > 1:
                        g.remove((service, p, o))
                        g.add((service, p, o))

    def _remove_empty_values(self, g:Graph):
        """CKAN saves empty strings to the database. Remove those from the graph."""
        for s, p, o in g:
            if isinstance(o, Literal) and o.value == "":
                g.remove((s, p, o))

    def _add_translation(self, g: Graph, subject: URIRef, predicate: URIRef, translation: Translations):
        for lang, text in translation.items():
            add_literal_to_graph(g, subject, predicate, Literal(text, lang=lang))

    def _catalog_metadata(self, g: Graph, catalog_ref: URIRef, catalog_metadata: CatalogMetadata):
        # Mandatory properties
        add_uriref_to_graph(g, catalog_ref, RDF.type, DCAT.Catalog)
        last_catalog_modified = self._last_catalog_modification()
        if last_catalog_modified:
            self._add_date_triple(catalog_ref, DCTERMS.modified, last_catalog_modified)

        self._add_translation(g, catalog_ref, DCTERMS.description, catalog_metadata['description'])
        add_uriref_to_graph(g, catalog_ref, FOAF.homepage, URIRef(catalog_metadata['homepage']))
        add_class_instance_with_children(
            g,
            catalog_ref,
            DCTERMS.publisher,
            catalog_metadata['publisher'],
        )
        add_vocabulary_to_graph(
            g,
            catalog_ref,
            DCTERMS.spatial,
            catalog_metadata['spatial'],
        )
        self._add_translation(g, catalog_ref, DCTERMS.title, catalog_metadata['title'])

        # Recommended properties
        for lang in catalog_metadata['language']:
            add_vocabulary_to_graph(g, catalog_ref, DCTERMS.language, lang)
        add_vocabulary_to_graph(g, catalog_ref, DCTERMS.license, catalog_metadata['license'])
        if catalog_metadata['release_date']:
            add_literal_to_graph(
                g,
                catalog_ref,
                DCTERMS.issued,
                Literal(
                    catalog_metadata['release_date'].astimezone(tz=timezone.utc),
                    datatype=XSD.dateTime,
                ),
            )
        for theme in catalog_metadata['theme']:
            add_vocabulary_to_graph(g, catalog_ref, DCAT.themeTaxonomy, theme)

        # Optional properties

        # dct:identifier should contain the value of rdf:about (the subject URI)
        # catalog_ref contains this value
        add_literal_to_graph(g, catalog_ref, DCTERMS.identifier, Literal(catalog_ref))

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
        for obj in g.objects(dataset_ref, DCTERMS.identifier):
            g.remove((dataset_ref, DCTERMS.identifier, obj))
        for obj in g.objects(dataset_ref, DCTERMS.description):
            g.remove((dataset_ref, DCTERMS.description, obj))
        for obj in g.objects(dataset_ref, DCTERMS.relation):
            g.remove((dataset_ref, DCTERMS.relation, obj))
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
