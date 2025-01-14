from typing import List, Dict

from rdflib import Dataset, URIRef
from rdflib.namespace import DCTERMS, SKOS, DCAT, FOAF, OWL
from rdflib.term import Node

from ckan_schema.mobility_dcat_ap_converter.range_value_converter import (
    RangeValueConverter,
)
from mobility_dcat_ap.dataset import (
    CVOCAB_MOBILITY_THEME,
    CVOCAB_NUTS,
    CVOCAB_LAU,
    CVOCAB_GEOREFERENCING_METHOD,
    CVOCAB_NETWORK_COVERAGE,
    CVOCAB_INTENDED_INFORMATION_SERVICE,
)
from mobility_dcat_ap.namespace import MOBILITYDCATAP
from dcat_schema_transpiler.namespaces.ADMS import ADMS
from dcat_schema_transpiler.namespaces.DCAT_AP import DCATAP
from dcat_schema_transpiler.namespaces.DQV import DQV
from dcat_schema_transpiler.rdfs.rdfs_class import RDFSClass
from dcat_schema_transpiler.rdfs.rdfs_property import RDFSProperty
from dcat_schema_transpiler.rdfs.rdfs_resource import RDFSResource
from dcat_schema_transpiler.ckan_schema.mobility_dcat_ap_converter.classes.kind import (
    Kind,
)
from dcat_schema_transpiler.ckan_schema.mobility_dcat_ap_converter.classes.agent import (
    Agent,
)


class DCATDataset(RangeValueConverter):
    iri = DCAT.Dataset
    mandatory_properties = {
        DCTERMS.description,
        DCAT.distribution,
        DCTERMS.accrualPeriodicity,
        MOBILITYDCATAP.mobilityTheme,
        DCTERMS.spatial,
        DCTERMS.title,
        DCTERMS.publisher,
    }

    recommended_properties = {
        MOBILITYDCATAP.georeferencingMethod,
        DCAT.contactPoint,
        DCAT.keyword,
        MOBILITYDCATAP.networkCoverage,
        DCTERMS.conformsTo,
        DCTERMS.rightsHolder,
        DCAT.theme,
        DCTERMS.temporal,
        MOBILITYDCATAP.transportMode,
    }

    optional_properties = {
        DCATAP.applicableLegislation,
        MOBILITYDCATAP.assessmentResult,
        DCTERMS.hasVersion,
        DCTERMS.identifier,
        DCTERMS.isVersionOf,
        MOBILITYDCATAP.intendedInformationService,
        DCTERMS.language,
        ADMS.identifier,
        DCTERMS.relation,
        DCTERMS.isReferencedBy,
        DCTERMS.issued,
        DCTERMS.modified,
        OWL.versionInfo,
        ADMS.versionNotes,
        DQV.hasQualityAnnotation,
    }

    def __init__(self, clazz: RDFSClass):
        super().__init__(clazz)

    def ckan_field_by_id(self, p: URIRef, pointer: str = None) -> str:
        mappings = {
            DCTERMS.description: "notes_translated",
            DCTERMS.accrualPeriodicity: "frequency",
            MOBILITYDCATAP.mobilityTheme: {
                "main": "mobility_theme",
                "sub": "mobility_theme_sub",
            },
            DCTERMS.title: "title_translated",
            DCTERMS.spatial: "spatial",
            OWL.versionInfo: "version",
            ADMS.versionNotes: "version_notes_translated",
            MOBILITYDCATAP.georeferencingMethod: "georeferencing_method",
            MOBILITYDCATAP.networkCoverage: "network_coverage",
            DCAT.contactPoint: "contact_point",
            DCTERMS.conformsTo: "conforms_to",
            MOBILITYDCATAP.assessmentResult: "assessment_result",
            MOBILITYDCATAP.intendedInformationService: "intended_information_service",
            DQV.hasQualityAnnotation: "quality_description",
            DCTERMS.language: "language",
            DCTERMS.rightsHolder: "rights_holder",
            DCTERMS.relation: "related_resource",
            DCTERMS.isReferencedBy: "is_referenced_by",
        }
        field_value = mappings.get(p)
        if isinstance(field_value, dict):
            field_name = field_value.get(pointer)
        else:
            field_name = field_value

        if field_name is not None:
            return field_name
        else:
            raise ValueError(
                f"A mapping was not found between the class {self.clazz.iri} property {p} and CKAN datamodel using pointer {pointer}"
            )

    def ckan_field(self, p: RDFSProperty, pointer: str = None) -> str:
        return self.ckan_field_by_id(p.iri, pointer)

    def get_label(self, p: RDFSProperty, ds: Dataset):
        if p.is_iri(OWL.versionInfo):
            return "Dataset version"
        if p.is_iri(ADMS.versionNotes):
            return "Version notes"
        return super().get_label(p, ds)

    def get_range_value(
        self, ds: Dataset, clazz_p: RDFSProperty
    ) -> RDFSClass | RDFSResource | None:
        if clazz_p.is_iri(DCTERMS.publisher):
            r_value = RDFSResource.from_ds(FOAF.Agent, ds)
        else:
            r_value = super().get_range_value(ds, clazz_p)
        return r_value

    def get_schema(self, ds: Dataset, clazz_p: RDFSProperty, is_required: bool = False):
        vocabulary_ranges = [
            MOBILITYDCATAP.mobilityTheme,
            DCTERMS.spatial,
            MOBILITYDCATAP.georeferencingMethod,
            MOBILITYDCATAP.networkCoverage,
            MOBILITYDCATAP.intendedInformationService,
        ]
        if any(
            clazz_p.is_iri(vocabulary_range) for vocabulary_range in vocabulary_ranges
        ):
            """
            Controlled vocabulary fields.
            """
            return self.controlled_vocab_field(clazz_p, ds, is_required)

        """
        Multilingual fields should have "required: false" at the field level.
        Required input languages are given in separate field "required_languages".
        """
        if (
            clazz_p.is_iri(DCTERMS.title)
            or clazz_p.is_iri(DCTERMS.description)
            or clazz_p.is_iri(ADMS.versionNotes)
        ):
            r_value = super().get_schema(ds, clazz_p, is_required=False)
            return {
                **(
                    r_value
                    | RangeValueConverter.get_translated_field_properties(is_required)
                )
            }
        if clazz_p.is_iri(DCTERMS.conformsTo):
            return {
                "field_name": self.ckan_field(clazz_p),
                "label": "Spatial Reference System",
                "help_text": "Value must be an EPSG number",
                "required": is_required,
                "preset": "iri_fragment",
                "input_type": "number",
                "form_attrs": {"min": "2000", "max": "69036405"},
                "validators": "scheming_required remove_whitespace ignore_missing spatial_reference_validator",
            }
        if clazz_p.is_iri(DCTERMS.relation):
            return {
                "field_name": self.ckan_field(clazz_p),
                "label": "Related dataset",
                "help_text": "A related dataset that is somehow referenced, cited, or otherwise pointed to by this dataset.",
                "required": is_required,
                "preset": "dataset_reference_select",
                "choices": "",
                "validators": "scheming_required ignore_missing dataset_reference_validator",
            }
        if clazz_p.is_iri(DCTERMS.isReferencedBy):
            return {
                "field_name": self.ckan_field(clazz_p),
                "label": "Is referenced by",
                "form_snippet": None,
                "required": False,
                "validators": "is_referenced_by_validator",
            }
        if clazz_p.is_iri(DCTERMS.language):
            return super().get_schema(ds, clazz_p, is_required)

        return super().get_schema(ds, clazz_p, is_required)

    def controlled_vocab_field(
        self, p: RDFSProperty, ds: Dataset, is_required: bool
    ) -> List | Dict:
        match p.iri:
            case MOBILITYDCATAP.mobilityTheme:
                g = ds.get_graph(URIRef(CVOCAB_MOBILITY_THEME))
                return [
                    {
                        "field_name": self.ckan_field(p, "main"),
                        "label": "Data content category",
                        "required": is_required,
                        "preset": "select",
                        "form_include_blank_choice": True,
                        "choices": RangeValueConverter.vocab_choices(
                            g,
                            lambda s: (
                                s,
                                SKOS.broader,
                                URIRef(
                                    "https://w3id.org/mobilitydcat-ap/mobility-theme/data-content-category"
                                ),
                            )
                            in g,
                        ),
                    },
                    {
                        "field_name": self.ckan_field(p, "sub"),
                        "label": "Data content sub category",
                        "required": False,
                        "preset": "select",
                        "form_include_blank_choice": True,
                        "validators": "scheming_required scheming_choices mobility_theme_sub_validator",
                        "choices": RangeValueConverter.vocab_choices(
                            g,
                            lambda s: (
                                s,
                                SKOS.broader,
                                URIRef(
                                    "https://w3id.org/mobilitydcat-ap/mobility-theme/data-content-sub-category"
                                ),
                            )
                            in g,
                        ),
                    },
                ]
            case DCTERMS.spatial:
                g_nuts = ds.get_graph(URIRef(CVOCAB_NUTS))
                g_lau = ds.get_graph(URIRef(CVOCAB_LAU))

                def find_top_nuts(concept: Node) -> Node:
                    broader_concept = g_nuts.value(concept, SKOS.broader)
                    if broader_concept is not None:
                        return find_top_nuts(broader_concept)
                    return concept

                def is_finnish_nuts(nuts):
                    if (nuts, None, None) in g_nuts:
                        return (
                            (
                                nuts,
                                URIRef(
                                    "http://publications.europa.eu/ontology/euvoc#status"
                                ),
                                URIRef(
                                    "http://publications.europa.eu/resource/authority/concept-status/CURRENT"
                                ),
                            )
                            in g_nuts
                            and (
                                nuts,
                                URIRef("http://www.w3.org/ns/adms#status"),
                                URIRef(
                                    "http://publications.europa.eu/resource/authority/concept-status/DEPRECATED"
                                ),
                            )
                            not in g_nuts
                            and find_top_nuts(nuts)
                            == URIRef("http://data.europa.eu/nuts/code/FI")
                        )
                    else:
                        return False

                def is_finnish_lau(lau: URIRef):
                    if (lau, None, None) in g_lau:
                        lau_nuts = g_lau.value(lau, SKOS.broadMatch)
                        return find_top_nuts(lau_nuts) == URIRef(
                            "http://data.europa.eu/nuts/code/FI"
                        )
                    return False

                def is_finnish_place(concept: URIRef):
                    return is_finnish_nuts(concept) or is_finnish_lau(concept)

                return {
                    "field_name": self.ckan_field(p),
                    "label": "Location",
                    "required": is_required,
                    "preset": "select",
                    "form_include_blank_choice": True,
                    "choices": RangeValueConverter.vocab_choices(
                        g_nuts + g_lau, is_finnish_place
                    ),
                }
            case MOBILITYDCATAP.georeferencingMethod:
                g = ds.get_graph(URIRef(CVOCAB_GEOREFERENCING_METHOD))
                return {
                    "field_name": self.ckan_field(p),
                    "label": "Georeferencing Method",
                    "required": is_required,
                    "preset": "select",
                    "form_include_blank_choice": True,
                    "choices": RangeValueConverter.vocab_choices(g),
                }
            case MOBILITYDCATAP.networkCoverage:
                g = ds.get_graph(URIRef(CVOCAB_NETWORK_COVERAGE))
                return {
                    "field_name": self.ckan_field(p),
                    "label": "Network Coverage",
                    "required": is_required,
                    "preset": "select",
                    "form_include_blank_choice": True,
                    "choices": RangeValueConverter.vocab_choices(g),
                }
            case MOBILITYDCATAP.intendedInformationService:
                g = ds.get_graph(URIRef(CVOCAB_INTENDED_INFORMATION_SERVICE))
                return {
                    "field_name": self.ckan_field(p),
                    "label": "Intended information service",
                    "required": is_required,
                    "preset": "select",
                    "form_include_blank_choice": True,
                    "choices": RangeValueConverter.vocab_choices(g),
                }

    def post_process_schema(self, schema: List[Dict]):
        def rename_field_names(field):
            if field.get("field_name") == Kind.aggregate_field_name:
                field["field_name"] = self.ckan_field_by_id(DCAT.contactPoint)
                field["label"] = "Contact point"
            if field.get("field_name") == Agent.aggregate_field_name:
                field["field_name"] = self.ckan_field_by_id(DCTERMS.rightsHolder)
                field["label"] = "Rights holder"
            return field

        return list(map(rename_field_names, schema))

    def is_property_required(self, property: RDFSProperty) -> bool:
        return property.iri in DCATDataset.mandatory_properties
