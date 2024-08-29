import pprint

from rdflib import Graph, URIRef, RDF, DCAT, FOAF, DCTERMS

import pytest

from ckanext.dcat.processors import RDFSerializer

import ckan.tests.factories as factories
# from ckan.logic.schema import
import ckan.tests.helpers as helpers
from ckan.plugins.toolkit import NotAuthorized, ObjectNotFound

from ckanext.digitraffic_theme.profiles.model.format import Format
from ckanext.digitraffic_theme.profiles.model.frequency import Frequency
from ckanext.digitraffic_theme.profiles.model.language import Language
from ckanext.digitraffic_theme.profiles.model.location import Location
from ckanext.digitraffic_theme.profiles.model.mobility_data_standard_schema import MobilityDataStandardSchema
from ckanext.digitraffic_theme.profiles.model.mobility_theme import MobilityTheme
from ckanext.digitraffic_theme.profiles.model.mobility_theme_sub import MobilityThemeSub
from ckanext.digitraffic_theme.profiles.model.rights_type import RightsType
from ckanext.digitraffic_theme.profiles.rdf.mobility_dcat_ap import MOBILITYDCATAP


# @pytest.mark.ckan_config('ckan.plugins', 'digitraffic_theme')
@pytest.mark.usefixtures('clean_db', 'with_plugins', 'with_request_context')
class TestProfile(object):
    def test_graph_from_dataset(self, app):
        user = factories.User()
        owner_org = factories.Organization(users=[{
            'name': user['id'],
            'capacity': 'admin'
        }])
        dataset_name = 'foo'
        description = 'Stuff about foo'
        dataset_frequency = Frequency.iris[0]
        dataset_mobility_theme = MobilityTheme.iris[0]
        dataset_mobility_theme_sub = MobilityThemeSub.iris[0]
        dataset_spatial = Location.iris[0]
        dataset_metadata_language = Language.iris[0]
        dataset = factories.Dataset(owner_org=owner_org['id'],
                                    name=dataset_name,
                                    type='dataset',
                                    notes=description,
                                    frequency=dataset_frequency,
                                    mobility_theme=dataset_mobility_theme,
                                    mobility_theme_sub=dataset_mobility_theme_sub,
                                    spatial=dataset_spatial,
                                    metadata_language=dataset_metadata_language,
                                    resources=[
                                        {
                                            "url": 'http://localhost:8080/foo',
                                            "format": Format.iris[0],
                                            "mobility_data_standard_version": '3',
                                            "mobility_data_standard_schema": MobilityDataStandardSchema.iris[0],
                                            "rights_type": RightsType.iris[0]}
                                    ])
        serializer = RDFSerializer()
        dataset_ref = serializer.graph_from_dataset(dataset)
        print(dataset_ref)
        g = serializer.g

        # CORRECT TYPES

        assert ((dataset_ref, RDF.type, DCAT.Dataset) in g)
        distribution_ref = g.value(dataset_ref, DCAT.distribution, None)
        assert (distribution_ref is not None)
        assert ((distribution_ref, RDF.type, DCAT.Distribution) in g)

        # DATASET VALUES

        assert (str(g.value(dataset_ref, DCTERMS.description, None)) == description)
        assert ((dataset_ref, DCTERMS.accrualPeriodicity, Frequency(dataset_frequency).iri) in g)
        assert ((dataset_ref, MOBILITYDCATAP.mobilityTheme, MobilityTheme(dataset_mobility_theme).iri) in g)
        assert ((dataset_ref, MOBILITYDCATAP.mobilityTheme, MobilityThemeSub(dataset_mobility_theme_sub).iri) in g)
        assert ((dataset_ref, DCTERMS.spatial, Location(dataset_spatial).iri) in g)
        assert (str(g.value(dataset_ref, DCTERMS.title, None)) == dataset_name)
        publisher_ref = g.value(dataset_ref, DCTERMS.publisher, None)
        assert (str(g.value(publisher_ref, FOAF.name, None)) == owner_org['name'])
