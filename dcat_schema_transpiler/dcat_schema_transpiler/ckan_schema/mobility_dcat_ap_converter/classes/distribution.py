from typing import Dict

from rdflib import DCTERMS, Dataset, DCAT, URIRef

from ckan_schema.mobility_dcat_ap_converter.range_value_converter import (
    RangeValueConverter,
)
from mobility_dcat_ap.dataset import (
    CNT,
    ADMS,
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

    def ckan_field(self, p: RDFSProperty, pointer: str = None) -> str:
        mappings = {
            DCAT.accessURL: "url",
            DCTERMS.format: "format",
            DCTERMS.title: "name_translated",
            DCTERMS.description: "description_translated",
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
                MOBILITYDCATAP.mobilityDataStandard
            ]
            if any(clazz_p.is_iri(vocabulary_range) for vocabulary_range in vocabulary_ranges):
                return self.controlled_vocab_field(clazz_p, ds, is_required)

            """
            Multilingual fields should have "required: false" at the field level.
            Required input languages are given in separate field "required_languages".
            """
            if clazz_p.is_iri(DCTERMS.description):
                r_value = super().get_schema(ds, clazz_p, is_required=False)
                return {
                    **(
                        r_value
                        | RangeValueConverter.get_translated_field_properties(
                            is_required
                        )
                    )
                }
            if clazz_p.is_iri(DCTERMS.title):
                r_value = super().get_schema(ds, clazz_p, is_required=False)
                return {
                    **(
                        r_value
                        | RangeValueConverter.get_translated_field_properties(
                            is_required
                        )
                    )
                }
            return super().get_schema(ds, clazz_p, is_required)
        return None

    def controlled_vocab_field(
        self, p: RDFSProperty, ds: Dataset, is_required: bool
    ) -> Dict:
        label_value = self.get_label(p, ds)
        match p.iri:
            case MOBILITYDCATAP.communicationMethod:
                g = ds.get_graph(URIRef(CVOCAB_COMMUNICATION_METHOD))
                return {
                    "field_name": self.ckan_field(p),
                    "label": label_value,
                    "required": is_required,
                    "preset": "select",
                    "form_include_blank_choice": True,
                    "choices": RangeValueConverter.vocab_choices(g),
                }
            case MOBILITYDCATAP.applicationLayerProtocol:
                g = ds.get_graph(URIRef(CVOCAB_APPLICATION_LAYER_PROTOCOL))
                return {
                    "field_name": self.ckan_field(p),
                    "label": label_value,
                    "required": is_required,
                    "preset": "select",
                    "form_include_blank_choice": True,
                    "choices": RangeValueConverter.vocab_choices(g),
                }
            case MOBILITYDCATAP.grammar:
                g = ds.get_graph(URIRef(CVOCAB_GRAMMAR))
                return {
                    "field_name": self.ckan_field(p),
                    "label": label_value,
                    "required": is_required,
                    "preset": "select",
                    "form_include_blank_choice": True,
                    "choices": RangeValueConverter.vocab_choices(g),
                }
            case MOBILITYDCATAP.mobilityDataStandard:
                g = ds.get_graph(URIRef(CVOCAB_MOBILITY_DATA_STANDARD))
                return {
                    "field_name": "mobility_data_standard",
                    "label": "Mobility data standard",
                    "required": is_required,
                    "preset": "select",
                    "form_include_blank_choice": True,
                    "choices": RangeValueConverter.vocab_choices(g),
                }

    def is_property_required(self, property: RDFSProperty) -> bool:
        return property.iri in Distribution.mandatory_properties
