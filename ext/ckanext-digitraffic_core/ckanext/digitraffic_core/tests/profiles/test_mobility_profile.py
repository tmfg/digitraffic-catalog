import ckan.tests.factories as factories
import pytest
from ckanext.dcat.processors import RDFSerializer
from ckanext.digitraffic_core.model.format import Format
from ckanext.digitraffic_core.model.frequency import Frequency
from ckanext.digitraffic_core.model.location import Location
from ckanext.digitraffic_core.model.mobility_data_standard import MobilityDataStandard
from ckanext.digitraffic_core.model.mobility_theme import (
    MOBILITY_THEME_TREE,
    MobilityTheme,
    MobilityThemeSub,
)
from ckanext.digitraffic_core.model.rights_type import RightsType
from ckanext.digitraffic_core.rdf.mobility_dcat_ap import MOBILITYDCATAP
from ckanext.digitraffic_core.rdf.oa import OA
from rdflib import DCAT, DCTERMS, FOAF, RDF, URIRef, XSD


# @pytest.mark.ckan_config('ckan.plugins', 'digitraffic_core')
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
        dataset_frequency = list(Frequency.get_iris())[0]
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
        dataset_spatial = list(Location.get_iris())[0]
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
                    "format": Format(list(Format.get_iris())[0]).get_label("en"),
                    "mobility_data_standard_version": "3",
                    "mobility_data_standard": list(MobilityDataStandard.get_iris())[0],
                    "rights_type": list(RightsType.get_iris())[0],
                }
            ],
            notes_translated=notes,
            title_translated=titles,
            is_referenced_by=[],
            contact_point=[
                {
                    "contact_point_type": "http://www.w3.org/2006/vcard/ns#Organization",
                    "fn": "Foo Bar",
                    "has_email": "foo@example.com",
                }
            ],
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
            Frequency(dataset_frequency).iri,
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
        # the publisher is named once, by the organisation's title — not by its slug
        assert owner_org["title"] != owner_org["name"]
        assert [str(name) for name in g.objects(publisher_ref, FOAF.name)] == [
            owner_org["title"]
        ]

    def _create_base_dataset(self):
        """Helper to create minimal dataset for assessment testing."""
        user = factories.User()
        owner_org = factories.Organization(
            users=[{"name": user["id"], "capacity": "admin"}]
        )
        dataset_frequency = list(Frequency.get_iris())[0]
        dataset_spatial = list(Location.get_iris())[0]
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
        return owner_org, {
            "owner_org": owner_org["id"],
            "type": "dataset",
            "frequency": dataset_frequency,
            "mobility_theme": dataset_mobility_theme,
            "mobility_theme_sub": dataset_mobility_theme_sub,
            "spatial": dataset_spatial,
            "title_translated": {"en": "English title"},
            "notes_translated": {"en": "English description"},
            "resources": [
                {
                    "url": "http://localhost:8080/foo",
                    "format": Format(list(Format.get_iris())[0]).get_label("en"),
                    "mobility_data_standard": list(MobilityDataStandard.get_iris())[0],
                    "rights_type": list(RightsType.get_iris())[0],
                }
            ],
            "contact_point": [
                {
                    "contact_point_type": "http://www.w3.org/2006/vcard/ns#Organization",
                    "fn": "Test Contact",
                    "has_email": "test@example.com",
                }
            ],
        }

    def test_assessment_absent(self):
        """Test RDF generation when assessment fields are absent."""
        owner_org, dataset_dict = self._create_base_dataset()
        dataset = factories.Dataset(**dataset_dict)
        
        serializer = RDFSerializer()
        dataset_ref = serializer.graph_from_dataset(dataset)
        g = serializer.g
        
        # No assessment triples should exist
        assessment_triples = list(
            g.triples((dataset_ref, MOBILITYDCATAP.assessmentResult, None))
        )
        assert len(assessment_triples) == 0

    def test_assessment_date_only(self):
        """Test RDF generation with assessment_date but no assessment_result."""
        owner_org, dataset_dict = self._create_base_dataset()
        assessment_date = "2026-01-15"
        dataset_dict["assessment_date"] = assessment_date
        
        dataset = factories.Dataset(**dataset_dict)
        
        serializer = RDFSerializer()
        dataset_ref = serializer.graph_from_dataset(dataset)
        g = serializer.g
        
        # Assessment should exist with one triple (date + type)
        assessment_refs = list(
            g.objects(dataset_ref, MOBILITYDCATAP.assessmentResult)
        )
        assert len(assessment_refs) == 1
        
        assessment_ref = assessment_refs[0]
        
        # Check Assessment type
        assert (assessment_ref, RDF.type, MOBILITYDCATAP.Assessment) in g
        
        # Check date is present and has correct datatype
        dates = list(g.objects(assessment_ref, DCTERMS.issued))
        assert len(dates) == 1
        assert dates[0].datatype == XSD.date
        assert str(dates[0]) == assessment_date
        
        # Check result is absent
        results = list(g.objects(assessment_ref, OA.hasBody))
        assert len(results) == 0

    def test_assessment_result_only(self):
        """Test RDF generation with assessment_result but no assessment_date."""
        owner_org, dataset_dict = self._create_base_dataset()
        assessment_result = "https://example.com/assessment/result"
        dataset_dict["assessment_result"] = assessment_result
        
        dataset = factories.Dataset(**dataset_dict)
        
        serializer = RDFSerializer()
        dataset_ref = serializer.graph_from_dataset(dataset)
        g = serializer.g
        
        # Assessment should exist
        assessment_refs = list(
            g.objects(dataset_ref, MOBILITYDCATAP.assessmentResult)
        )
        assert len(assessment_refs) == 1
        
        assessment_ref = assessment_refs[0]
        
        # Check Assessment type
        assert (assessment_ref, RDF.type, MOBILITYDCATAP.Assessment) in g
        
        # Check result is present and is a URI
        results = list(g.objects(assessment_ref, OA.hasBody))
        assert len(results) == 1
        assert isinstance(results[0], URIRef)
        assert str(results[0]) == assessment_result
        
        # Check date is absent
        dates = list(g.objects(assessment_ref, DCTERMS.issued))
        assert len(dates) == 0

    def test_assessment_both_fields(self):
        """Test RDF generation with both assessment_date and assessment_result."""
        owner_org, dataset_dict = self._create_base_dataset()
        assessment_date = "2026-02-20"
        assessment_result = "https://example.com/assessment/pass"
        dataset_dict["assessment_date"] = assessment_date
        dataset_dict["assessment_result"] = assessment_result
        
        dataset = factories.Dataset(**dataset_dict)
        
        serializer = RDFSerializer()
        dataset_ref = serializer.graph_from_dataset(dataset)
        g = serializer.g
        
        # Assessment should exist as single instance (0..1 cardinality)
        assessment_refs = list(
            g.objects(dataset_ref, MOBILITYDCATAP.assessmentResult)
        )
        assert len(assessment_refs) == 1, "Assessment cardinality must be 0..1 (single instance)"
        
        assessment_ref = assessment_refs[0]
        
        # Check Assessment type
        assert (assessment_ref, RDF.type, MOBILITYDCATAP.Assessment) in g
        
        # Count total triples for assessment (type + date + result = 3)
        assessment_triples = list(g.triples((assessment_ref, None, None)))
        # Should have exactly 3 triples: RDF.type, DCTERMS.issued, OA.hasBody
        assert len(assessment_triples) == 3, (
            f"Expected 3 assessment triples (type, date, result), got {len(assessment_triples)}: "
            f"{[(str(p), str(o)) for s, p, o in assessment_triples]}"
        )
        
        # Check date with correct datatype
        dates = list(g.objects(assessment_ref, DCTERMS.issued))
        assert len(dates) == 1
        assert dates[0].datatype == XSD.date
        assert str(dates[0]) == assessment_date
        
        # Check result URI
        results = list(g.objects(assessment_ref, OA.hasBody))
        assert len(results) == 1
        assert isinstance(results[0], URIRef)
        assert str(results[0]) == assessment_result

