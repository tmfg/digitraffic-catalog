from typing import Dict

from rdflib import DCTERMS, Dataset, DCAT, URIRef

from ckan_schema.mobility_dcat_ap_converter.range_value_converter import (
    RangeValueConverter,
)
from mobility_dcat_ap.dataset import (
    CNT,
    ADMS,
    CNT_CHARACTERENCODING_SETS,
    CVOCAB_COMMUNICATION_METHOD,
    CVOCAB_APPLICATION_LAYER_PROTOCOL,
    CVOCAB_GRAMMAR,
    CVOCAB_MOBILITY_DATA_STANDARD,
)
from mobility_dcat_ap.namespace import MOBILITYDCATAP
from dcat_schema_transpiler.rdfs.rdfs_class import RDFSClass
from dcat_schema_transpiler.rdfs.rdfs_property import RDFSProperty


class Distribution(RangeValueConverter):
    iri = DCAT.Distribution
    mandatory_properties = {
        DCAT.accessURL,
        MOBILITYDCATAP.mobilityDataStandard,
        DCTERMS.format,
        DCTERMS.rights,
    }
    recommended_properties = {
        MOBILITYDCATAP.applicationLayerProtocol,
        DCTERMS.description,
        DCTERMS.license,
    }
    optional_properties = {
        DCAT.accessService,
        CNT.characterEncoding,
        MOBILITYDCATAP.communicationMethod,
        MOBILITYDCATAP.dataFormatNotes,
        DCAT.downloadURL,
        MOBILITYDCATAP.grammar,
        ADMS.sample,
        DCTERMS.temporal,
        DCTERMS.title,
    }

    def __init__(self, clazz: RDFSClass):
        super().__init__(clazz)

    def ckan_field(self, p: RDFSProperty, pointer: str | None = None) -> str:
        mappings = {
            DCAT.accessURL: "url",
            DCTERMS.format: "format",
            DCTERMS.title: "name_translated",
            DCTERMS.description: "description_translated",
            MOBILITYDCATAP.communicationMethod: "communication_method",
            CNT.characterEncoding: "character_encoding",
            DCAT.accessService: "access_service",
            DCAT.downloadURL: "download_url",
            MOBILITYDCATAP.dataFormatNotes: "data_format_notes_translated",
            MOBILITYDCATAP.grammar: "data_grammar",
            ADMS.sample: "sample",
            DCTERMS.temporal: "temporal_coverage",
            MOBILITYDCATAP.applicationLayerProtocol: "application_layer_protocol",
        }
        field_name = mappings.get(p.iri)

        if field_name is not None:
            return field_name
        else:
            raise ValueError(
                f"A mapping was not found between the class {self.clazz.iri} property {p.iri} and CKAN datamodel"
            )

    def get_range_value(self, ds: Dataset, clazz_p: RDFSProperty) -> RDFSClass | None:
        return super().get_range_value(ds, clazz_p)

    def get_schema(self, ds: Dataset, clazz_p: RDFSProperty, is_required: bool = None):
        properties_union = (
            Distribution.mandatory_properties
            | Distribution.recommended_properties
            | Distribution.optional_properties
        )
        if clazz_p.iri in properties_union:
            vocabulary_ranges = [
                MOBILITYDCATAP.communicationMethod,
                MOBILITYDCATAP.applicationLayerProtocol,
                MOBILITYDCATAP.grammar,
                MOBILITYDCATAP.mobilityDataStandard,
            ]
            if any(
                clazz_p.is_iri(vocabulary_range)
                for vocabulary_range in vocabulary_ranges
            ):
                schema = self.controlled_vocab_field(clazz_p, ds, is_required)
            elif clazz_p.is_iri(CNT.characterEncoding):
                r_value = super().get_schema(ds, clazz_p, is_required=False)
                schema = r_value | {
                    "preset": "select",
                    "sorted_choices": True,
                    "form_include_blank_choice": True,
                    # choices are taken from specific csv data set
                    "choices": super().choices_from_cached_csv(
                        CNT_CHARACTERENCODING_SETS, "Preferred MIME Name", "Name"
                    ),
                    "validators": "character_encoding_validator ignore_missing",
                }
            elif (
                clazz_p.is_iri(DCTERMS.description)
                or clazz_p.is_iri(DCTERMS.title)
                or clazz_p.is_iri(MOBILITYDCATAP.dataFormatNotes)
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
                    )
                }

            elif clazz_p.is_iri(DCAT.accessURL):
                schema = super().get_schema(ds, clazz_p, is_required) | {
                    "preset": "url",
                    **super().get_property_label_with_help_text(clazz_p.iri),
                }
            elif clazz_p.is_iri(DCAT.downloadURL):
                schema = super().get_schema(ds, clazz_p, is_required) | {
                    "preset": "url",
                    **super().get_property_label_with_help_text(clazz_p.iri),
                }
            elif clazz_p.is_iri(ADMS.sample):
                schema = super().get_schema(ds, clazz_p, is_required) | {
                    "preset": "url",
                    **super().get_property_label_with_help_text(clazz_p.iri),
                }
            else:
                schema = super().get_schema(ds, clazz_p, is_required)
            if schema is None:
                return None
            return {
                **schema,
                **super().get_necessity_mapping(clazz_p.iri),
            }
        return None

    def controlled_vocab_field(
        self, p: RDFSProperty, ds: Dataset, is_required: bool
    ) -> Dict:
        match p.iri:
            case MOBILITYDCATAP.communicationMethod:
                g = ds.get_graph(URIRef(CVOCAB_COMMUNICATION_METHOD))
                return {
                    "field_name": self.ckan_field(p),
                    **super().get_property_label_with_help_text(p.iri),
                    "required": is_required,
                    "preset": "select",
                    "sorted_choices": True,
                    "form_include_blank_choice": True,
                    "choices": RangeValueConverter.vocab_choices(graph=g, iri=p.iri),
                    "validators": "communication_method_validator ignore_missing",
                }
            case MOBILITYDCATAP.applicationLayerProtocol:
                g = ds.get_graph(URIRef(CVOCAB_APPLICATION_LAYER_PROTOCOL))
                return {
                    "field_name": self.ckan_field(p),
                    **super().get_property_label_with_help_text(p.iri),
                    "required": is_required,
                    "preset": "select",
                    "sorted_choices": True,
                    "form_include_blank_choice": True,
                    "choices": RangeValueConverter.vocab_choices(graph=g, iri=p.iri),
                    "validators": "application_layer_protocol_validator ignore_missing",
                }
            case MOBILITYDCATAP.grammar:
                g = ds.get_graph(URIRef(CVOCAB_GRAMMAR))
                return {
                    "field_name": self.ckan_field(p),
                    **super().get_property_label_with_help_text(p.iri),
                    "required": is_required,
                    "preset": "select",
                    "sorted_choices": True,
                    "form_include_blank_choice": True,
                    "choices": RangeValueConverter.vocab_choices(graph=g, iri=p.iri),
                    "validators": "data_grammar_validator ignore_missing",
                }
            case MOBILITYDCATAP.mobilityDataStandard:
                g = ds.get_graph(URIRef(CVOCAB_MOBILITY_DATA_STANDARD))
                return {
                    "field_name": "mobility_data_standard",
                    **super().get_property_label_with_help_text(p.iri),
                    "required": is_required,
                    "preset": "select",
                    "sorted_choices": True,
                    "form_include_blank_choice": True,
                    "choices": RangeValueConverter.vocab_choices(graph=g, iri=p.iri),
                    "validators": "mobility_data_standard_validator ignore_missing",
                }
            case MOBILITYDCATAP.communicationMethod:
                g = ds.get_graph(URIRef(CVOCAB_COMMUNICATION_METHOD))
                return {
                    "field_name": "communication_method",
                    **super().get_property_label_with_help_text(p.iri),
                    "required": is_required,
                    "preset": "select",
                    "sorted_choices": True,
                    "form_include_blank_choice": True,
                    "choices": RangeValueConverter.vocab_choices(graph=g, iri=p.iri),
                    "validators": "communication_method_validator ignore_missing",
                }

    def is_property_required(self, property: RDFSProperty) -> bool:
        return property.iri in Distribution.mandatory_properties
