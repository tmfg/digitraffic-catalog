import pprint

from rdflib import Graph, URIRef, RDF, DCAT

import pytest

from ckanext.dcat.processors import RDFSerializer

import ckan.tests.factories as factories
#from ckan.logic.schema import
import ckan.tests.helpers as helpers
from ckan.plugins.toolkit import NotAuthorized, ObjectNotFound

from ckanext.digitraffic_theme.profiles.model.frequency import Frequency
from ckanext.digitraffic_theme.profiles.model.location import Location
from ckanext.digitraffic_theme.profiles.model.mobility_theme import MobilityTheme
from ckanext.digitraffic_theme.profiles.model.mobility_theme_sub import MobilityThemeSub


#@pytest.mark.ckan_config('ckan.plugins', 'digitraffic_theme')
@pytest.mark.usefixtures('clean_db', 'with_plugins', 'with_request_context')
class TestProfile(object):
    def test_graph_from_dataset(self, app):
        print("FOO")
        #g = Graph()
        #profile = MobilityDCATAPProfile(g)
        #dataset_ref = URIRef('http://example.com/dataset')
        dataset_dict = {
            'author': None,
            'author_email': None,
            'creator_user_id': '9ff893c7-b102-4fbb-acac-2b8e0327a448',
            'frequency': 'http://publications.europa.eu/resource/authority/frequency/DAILY',
            'groups': [],
            'id': '9b6b65ad-6201-4f56-9b85-b3b2d6dae534',
            'isopen': False,
            'license_id': None,
            'license_title': None,
            'maintainer': None,
            'maintainer_email': None,
            'metadata_created': '2024-08-15T11:40:24.126777',
            'metadata_language': 'http://publications.europa.eu/resource/authority/language/ENG',
            'metadata_modified': '2024-08-22T10:48:31.224586',
            'mobility_theme': 'https://w3id.org/mobilitydcat-ap/mobility-theme/air-and-space-travel',
            'mobility_theme_sub': 'https://w3id.org/mobilitydcat-ap/mobility-theme/bike-sharing-locations-and-stations',
            'name': 'Test data',
            'notes': 'Test Description',
            'num_resources': 1,
            'num_tags': 0,
            'organization': {'approval_status': 'approved',
                             'created': '2024-08-15T11:40:07.988747',
                             'description': '',
                             'id': '573d8e0b-cc67-43c0-a6b2-b4a4e27ab9b9',
                             'image_url': '',
                             'is_organization': True,
                             'name': 'test',
                             'state': 'active',
                             'title': 'test',
                             'type': 'organization'},
            'owner_org': '573d8e0b-cc67-43c0-a6b2-b4a4e27ab9b9',
            'private': False,
            'publisher_name': 'Test name',
            'relationships_as_object': [],
            'relationships_as_subject': [],
            'resources': [{'cache_last_updated': None,
                           'cache_url': None,
                           'created': '2024-08-15T11:40:42.221121',
                           'datastore_active': False,
                           'description': None,
                           'format': 'http://publications.europa.eu/resource/authority/file-type/TAR',
                           'hash': '',
                           'id': 'cbd2112f-d4b1-4aca-aa88-6fae4e08a952',
                           'last_modified': None,
                           'metadata_modified': '2024-08-15T11:40:42.297402',
                           'mimetype': None,
                           'mimetype_inner': None,
                           'mobility_data_standard_schema': 'https://w3id.org/mobilitydcat-ap/mobility-data-standard/c-its',
                           'mobility_data_standard_version': '3.2',
                           'name': None,
                           'package_id': '9b6b65ad-6201-4f56-9b85-b3b2d6dae534',
                           'position': 0,
                           'resource_type': None,
                           'rights_type': 'https://w3id.org/mobilitydcat-ap/conditions-for-access-and-usage/contractual-arrangement',
                           'size': None,
                           'state': 'active',
                           'url': 'http://localhost:8080/foo',
                           'url_type': None}],
            'spatial': 'https://w3id.org/stirdata/resource/lau/item/FI_889',
            'state': 'active',
            'tags': [],
            'title': 'Test data',
            'type': 'dataset',
            'url': None,
            'version': None
        }
        user = factories.User()
        owner_org = factories.Organization(users=[{
            'name': user['id'],
            'capacity': 'admin'
        }])
        print(f'freq: {Frequency.iris[0]}')
        dataset = factories.Dataset(owner_org=owner_org['id'],
                                    name='foo',
                                    type='dataset',
                                    frequency=Frequency.iris[0],
                                    mobility_theme=MobilityTheme.iris[0],
                                    mobility_theme_sub=MobilityThemeSub.iris[0],
                                    spatial=Location.iris[0],
                                    publisher_name="")
        #resource = factories.Resource(package_id=dataset['id'])

        print("DATASET")
        pprint.pprint(dataset)
        print("---- FETCHED DATASET ----")
        print(dataset.get('frequency'))

        serializer = RDFSerializer()
        dataset_ref = serializer.graph_from_dataset(dataset)
        print(dataset_ref)
        g = serializer.g

        for s, p, o in g:
            print(f'{s} {p} {o}')

        #MobilityDCATAPProfile.graph_from_dataset({g: g},dataset_dict, dataset_ref)

        assert((dataset_ref, RDF.type, DCAT.Dataset) in g)


