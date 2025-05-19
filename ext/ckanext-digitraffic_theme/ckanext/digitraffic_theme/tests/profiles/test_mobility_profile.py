from rdflib import URIRef, RDF, DCAT, FOAF, DCTERMS

import pytest

from ckanext.dcat.processors import RDFSerializer

import ckan.tests.factories as factories


from ckanext.digitraffic_theme.model.format import Format
from ckanext.digitraffic_theme.model.frequency import Frequency
from ckanext.digitraffic_theme.model.location import Location
from ckanext.digitraffic_theme.model.mobility_data_standard import (
    MobilityDataStandard,
)
from ckanext.digitraffic_theme.model.mobility_theme import (
    MobilityTheme,
    MobilityThemeSub,
    MOBILITY_THEME_TREE,
)
from ckanext.digitraffic_theme.model.rights_type import RightsType
from ckanext.digitraffic_theme.rdf.mobility_dcat_ap import MOBILITYDCATAP


# @pytest.mark.ckan_config('ckan.plugins', 'digitraffic_theme')
@pytest.mark.usefixtures("clean_db", "with_plugins")
class TestProfile:
    def test_graph_from_dataset(self):
        user = factories.User()
        owner_org = factories.Organization(
            users=[{"name": user["id"], "capacity": "admin"}]
        )
        dataset_name = "foo"
        notes = {
            "en": "English description",
            "fi": "Suomenkielinen kuvaus",
            "sv": "Svensk beskrivning",
        }
        titles = {
            "en": "English title",
            "fi": "Suomenkielinen nimi",
            "sv": "Svensk titel",
        }
        dataset_frequency = Frequency.iris[:1]
        dataset_mobility_theme = str(
            [
                main_theme
                for main_theme, sub_themes in MOBILITY_THEME_TREE.items()
                if len(sub_themes) > 0
            ][0]
        )
        dataset_mobility_theme_sub = str(
            list(MOBILITY_THEME_TREE[URIRef(dataset_mobility_theme)])[0]
        )
        dataset_spatial = list(Location.iris)[0]
        dataset = factories.Dataset(
            owner_org=owner_org["id"],
            name=dataset_name,
            type="dataset",
            frequency=dataset_frequency,
            mobility_theme=dataset_mobility_theme,
            mobility_theme_sub=dataset_mobility_theme_sub,
            spatial=dataset_spatial,
            resources=[
                {
                    "url": "http://localhost:8080/foo",
                    "format": list(Format.labels)[0],
                    "mobility_data_standard_version": "3",
                    "mobility_data_standard": list(MobilityDataStandard.iris)[0],
                    "rights_type": list(RightsType.iris)[0],
                }
            ],
            notes_translated=notes,
            title_translated=titles,
            is_referenced_by=[],
        )
        serializer = RDFSerializer()
        dataset_ref = serializer.graph_from_dataset(dataset)
        print(dataset_ref)
        g = serializer.g

        # CORRECT TYPES

        assert (dataset_ref, RDF.type, DCAT.Dataset) in g
        distribution_ref = g.value(dataset_ref, DCAT.distribution, None)
        assert distribution_ref is not None
        assert (distribution_ref, RDF.type, DCAT.Distribution) in g

        # DATASET VALUE

        # description values for all languages exist
        descriptions = list(g.objects(dataset_ref, DCTERMS.description))

        for description in descriptions:
            assert (description.toPython()) in notes.values()

        assert (len(descriptions)) == len(notes.keys())

        assert (
            dataset_ref,
            DCTERMS.accrualPeriodicity,
            Frequency(dataset_frequency[0]).iri,
        ) in g
        assert (
            dataset_ref,
            MOBILITYDCATAP.mobilityTheme,
            MobilityTheme(dataset_mobility_theme).iri,
        ) in g
        assert (
            dataset_ref,
            MOBILITYDCATAP.mobilityTheme,
            MobilityThemeSub(dataset_mobility_theme_sub).iri,
        ) in g
        assert (dataset_ref, DCTERMS.spatial, Location(dataset_spatial).iri) in g
        assert str(g.value(dataset_ref, DCTERMS.title, None)) != dataset_name
        assert dataset["id"] == dataset["name"]
        publisher_ref = g.value(dataset_ref, DCTERMS.publisher, None)
        assert owner_org["display_name"] in [
            str(name) for name in list(g.objects(publisher_ref, FOAF.name))
        ]
