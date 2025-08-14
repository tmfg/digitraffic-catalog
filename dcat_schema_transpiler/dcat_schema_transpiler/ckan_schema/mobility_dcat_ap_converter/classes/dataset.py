from typing import List, Dict

from ckan_schema.mobility_dcat_ap_converter.classes.period_of_time import PeriodOfTime
from ckan_schema.mobility_dcat_ap_converter.classes.assessment import Assessment
from rdflib import Dataset, URIRef
from rdflib.namespace import DCTERMS, SKOS, DCAT, FOAF, OWL
from rdflib.term import Node

from ckan_schema.mobility_dcat_ap_converter.range_value_converter import (
    RangeValueConverter,
    Necessity,
)
from mobility_dcat_ap.dataset import (
    CVOCAB_MOBILITY_THEME,
    CVOCAB_NUTS,
    CVOCAB_LAU,
    CVOCAB_GEOREFERENCING_METHOD,
    CVOCAB_NETWORK_COVERAGE,
    CVOCAB_INTENDED_INFORMATION_SERVICE,
    CVOCAB_THEME,
    CVOCAB_TRANSPORT_MODE,
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

    def __init__(self, clazz: RDFSClass, parent_class_iri: URIRef = None):
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
            DCAT.theme: "theme",
            MOBILITYDCATAP.transportMode: "transport_mode",
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
            DCAT.theme,
            MOBILITYDCATAP.transportMode,
        ]
        if any(
            clazz_p.is_iri(vocabulary_range) for vocabulary_range in vocabulary_ranges
        ):
            """
            Controlled vocabulary fields.
            """
            schema = self.controlled_vocab_field(clazz_p, ds, is_required)
        elif (
            clazz_p.is_iri(DCTERMS.title)
            or clazz_p.is_iri(DCTERMS.description)
            or clazz_p.is_iri(ADMS.versionNotes)
        ):
            """
            Multilingual fields should have "required: false" at the field level.
            Required input languages are given in separate field "required_languages".
            """
            super_schema = super().get_schema(ds, clazz_p, is_required=False)
            schema = {
                **(
                    super_schema
                    | RangeValueConverter.get_translated_field_properties(
                        super_schema.get("label", {}) if super_schema else {},
                        is_required,
                    )
                    | super().get_property_label_with_help_text(clazz_p.iri)
                )
            }
        elif clazz_p.is_iri(DCTERMS.conformsTo):
            schema = {
                "field_name": self.ckan_field(clazz_p),
                **super().get_property_label_with_help_text(clazz_p.iri),
                "required": is_required,
                "preset": "iri_fragment",
                "input_type": "number",
                "form_attrs": {"min": "2000", "max": "69036405"},
                "validators": super().get_validators(
                    [
                        "remove_whitespace",
                        "spatial_reference_validator",
                    ]
                ),
            }
        elif clazz_p.is_iri(DCTERMS.relation):
            schema = {
                "field_name": self.ckan_field(clazz_p),
                **super().get_property_label_with_help_text(clazz_p.iri),
                "required": is_required,
                "preset": "dataset_reference_select",
                "choices": "",
                "validators": super().get_validators(
                    [
                        "value_to_list",
                        "dataset_reference_validator",
                    ]
                ),
                "output_validators": "dataset_reference_validator",
            }
        elif clazz_p.is_iri(DCTERMS.isReferencedBy):
            schema = {
                "field_name": self.ckan_field(clazz_p),
                **super().get_property_label_with_help_text(clazz_p.iri),
                "form_snippet": None,
                "required": False,
                "validators": super().get_validators(
                    ["value_to_list", "is_referenced_by_validator"]
                ),
                "output_validators": "is_referenced_by_validator",
            }
        else:
            schema = super().get_schema(ds, clazz_p, is_required)
        if schema is None:
            return None

        def apply_necessity_mapping(schema, necessity_fn):
            """
            Apply necessity mapping to the schema.
            """
            if isinstance(schema, list):
                return list(
                    map(lambda s: apply_necessity_mapping(s, necessity_fn), schema)
                )
            else:
                if schema.get("field_name") == "mobility_theme_sub":
                    # In spec comments it is mentioned that the sub-theme field is optional.
                    necessity_mapping = {
                        "required": False,
                        "necessity": Necessity.OPTIONAL.value,
                    }
                else:
                    necessity_mapping = necessity_fn(clazz_p.iri)
                return {**schema, **necessity_mapping}

        return apply_necessity_mapping(schema, super().get_necessity_mapping)

    def controlled_vocab_field(
        self, p: RDFSProperty, ds: Dataset, is_required: bool
    ) -> List | Dict:
        match p.iri:
            case MOBILITYDCATAP.mobilityTheme:
                g = ds.get_graph(URIRef(CVOCAB_MOBILITY_THEME))
                return [
                    {
                        "field_name": self.ckan_field(p, "main"),
                        **super().get_property_label_with_help_text(p.iri, "main"),
                        "required": is_required,
                        "preset": "select",
                        "sorted_choices": True,
                        "validators": super().get_validators(
                            ["mobility_theme_validator"]
                        ),
                        "choices": RangeValueConverter.vocab_choices(
                            graph=g,
                            filter=lambda s: (
                                s,
                                SKOS.broader,
                                URIRef(
                                    "https://w3id.org/mobilitydcat-ap/mobility-theme/data-content-category"
                                ),
                            )
                            in g,
                            vocab=CVOCAB_MOBILITY_THEME,
                        ),
                    },
                    {
                        "field_name": self.ckan_field(p, "sub"),
                        **super().get_property_label_with_help_text(p.iri, "sub"),
                        "required": False,
                        "preset": "select_mobility_sub_theme",
                        "sorted_choices": True,
                        "form_include_blank_choice": True,
                        "validators": super().get_validators(
                            [
                                "scheming_choices",
                                "mobility_theme_sub_validator",
                            ]
                        ),
                        "choices": RangeValueConverter.vocab_choices(
                            graph=g,
                            filter=lambda s: (
                                s,
                                SKOS.broader,
                                URIRef(
                                    "https://w3id.org/mobilitydcat-ap/mobility-theme/data-content-sub-category"
                                ),
                            )
                            in g,
                            vocab=CVOCAB_MOBILITY_THEME,
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
                    return concept if concept is not None else URIRef("")

                def is_finnish_nuts(nuts):

                    if (nuts, None, None) in g_nuts:
                        return (
                            (
                                nuts,
                                URIRef("http://www.w3.org/ns/adms#status"),
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
                            and str(find_top_nuts(nuts)).startswith(
                                "http://data.europa.eu/nuts/code/FI"
                            )
                        )
                    else:
                        return False

                def is_finnish_lau(lau: URIRef):
                    if (lau, None, None) in g_lau:
                        lau_nuts = g_lau.value(lau, SKOS.broadMatch)
                        top_nuts = find_top_nuts(lau_nuts)
                        return top_nuts and str(top_nuts).startswith(
                            "http://data.europa.eu/nuts/code/FI"
                        )
                    return False

                def is_finnish_place(concept: URIRef):
                    return is_finnish_nuts(concept) or is_finnish_lau(concept)

                return {
                    "field_name": self.ckan_field(p),
                    **super().get_property_label_with_help_text(p.iri),
                    "required": is_required,
                    "preset": "select",
                    "form_include_blank_choice": True,
                    "choices": RangeValueConverter.vocab_choices(
                        g_nuts + g_lau, is_finnish_place
                    ),
                    "validators": super().get_validators(["location_validator"]),
                }
            case MOBILITYDCATAP.georeferencingMethod:
                g = ds.get_graph(URIRef(CVOCAB_GEOREFERENCING_METHOD))
                return {
                    "field_name": self.ckan_field(p),
                    **super().get_property_label_with_help_text(p.iri),
                    "required": is_required,
                    "preset": "select",
                    "sorted_choices": True,
                    "form_include_blank_choice": True,
                    "choices": RangeValueConverter.vocab_choices(graph=g),
                    "validators": super().get_validators(
                        ["georeferencing_method_validator"]
                    ),
                }
            case MOBILITYDCATAP.networkCoverage:
                g = ds.get_graph(URIRef(CVOCAB_NETWORK_COVERAGE))
                return {
                    "field_name": self.ckan_field(p),
                    **super().get_property_label_with_help_text(p.iri),
                    "required": is_required,
                    "preset": "select",
                    "sorted_choices": True,
                    "form_include_blank_choice": True,
                    "choices": RangeValueConverter.vocab_choices(
                        graph=g, vocab=CVOCAB_NETWORK_COVERAGE
                    ),
                    "validators": super().get_validators(
                        ["network_coverage_validator"]
                    ),
                }
            case DCAT.theme:
                g = ds.get_graph(URIRef(CVOCAB_THEME))
                return {
                    "field_name": self.ckan_field(p),
                    **super().get_property_label_with_help_text(p.iri),
                    "required": is_required,
                    "preset": "select",
                    "sorted_choices": True,
                    "form_include_blank_choice": True,
                    "choices": RangeValueConverter.vocab_choices(graph=g),
                    "validators": super().get_validators(["theme_validator"]),
                }
            case MOBILITYDCATAP.transportMode:
                g = ds.get_graph(URIRef(CVOCAB_TRANSPORT_MODE))
                return {
                    "field_name": self.ckan_field(p),
                    **super().get_property_label_with_help_text(p.iri),
                    "required": is_required,
                    "preset": "select",
                    "sorted_choices": True,
                    "form_include_blank_choice": True,
                    "choices": RangeValueConverter.vocab_choices(
                        graph=g, vocab=CVOCAB_TRANSPORT_MODE
                    ),
                    "validators": super().get_validators(["transport_mode_validator"]),
                }
            case MOBILITYDCATAP.intendedInformationService:
                g = ds.get_graph(URIRef(CVOCAB_INTENDED_INFORMATION_SERVICE))
                return {
                    "field_name": self.ckan_field(p),
                    **super().get_property_label_with_help_text(p.iri),
                    "required": is_required,
                    "preset": "select",
                    "sorted_choices": True,
                    "form_include_blank_choice": True,
                    "choices": RangeValueConverter.vocab_choices(
                        graph=g, vocab=CVOCAB_INTENDED_INFORMATION_SERVICE
                    ),
                    "validators": super().get_validators(
                        ["intended_information_service_validator"]
                    ),
                }

    def post_process_schema(self, schema: List[Dict]):

        def rename_field_names(field):

            if field.get("field_name") == Kind.aggregate_field_name:
                field |= {
                    "field_name": self.ckan_field_by_id(DCAT.contactPoint),
                    "subfield_form_attrs": {
                        "data-module": "digitraffic_theme_contact_detail"
                    },
                    "form_blanks": 0,
                } | self.get_property_label_with_help_text(DCAT.contactPoint)

            if field.get("field_name") == Agent.aggregate_field_name:
                field |= {
                    "field_name": self.ckan_field_by_id(DCTERMS.rightsHolder),
                    "subfield_form_attrs": {
                        "data-module": "digitraffic_theme_rights_holder"
                    },
                    "form_blanks": 0,
                } | self.get_property_label_with_help_text(DCTERMS.rightsHolder)

            return field

        return list(map(rename_field_names, schema))

    def is_property_required(self, property: RDFSProperty) -> bool:
        return property.iri in DCATDataset.mandatory_properties
