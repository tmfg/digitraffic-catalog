from typing import Dict

from rdflib import DCTERMS, Dataset, URIRef

from ckan_schema.mobility_dcat_ap_converter.range_value_converter import (
    RangeValueConverter,
)
from dcat_schema_transpiler.rdfs.rdfs_class import RDFSClass
from dcat_schema_transpiler.rdfs.rdfs_property import RDFSProperty
from mobility_dcat_ap.dataset import CVOCAB_LANGUAGE


class LinguisticSystem(RangeValueConverter):
    iri = DCTERMS.LinguisticSystem

    def __init__(self, clazz: RDFSClass):
        super().__init__(clazz)

    def ckan_field(self, p: RDFSProperty, pointer: str = None) -> str:
        raise ValueError(
            f"{self.__class__.__name__} class {self.clazz.iri} does not have any properties. Only vocabulary."
        )

    def get_range_value(self, ds: Dataset, clazz_p: RDFSProperty) -> RDFSClass | None:
        return super().get_range_value(ds, clazz_p)

    def get_schema(
        self, ds: Dataset, clazz_p: RDFSProperty | None, is_required: bool = None
    ):
        return self.controlled_vocab_field(clazz_p, ds, is_required)

    def controlled_vocab_field(
        self, p: RDFSProperty, ds: Dataset, is_required: bool
    ) -> Dict:
        g = ds.get_graph(URIRef(CVOCAB_LANGUAGE))

        def is_supported_language(s: URIRef) -> bool:
            def language_uri(ending):
                return f"{str(CVOCAB_LANGUAGE)}/{ending}"

            supported_languages = {
                language_uri("FIN"),
                language_uri("SWE"),
                language_uri("ENG"),
                language_uri("EST"),
                language_uri("NOR"),
                language_uri("DAN"),
                language_uri("DEU"),
                language_uri("FRA"),
                language_uri("SPA"),
                language_uri("LAV"),
                language_uri("LIT"),
                language_uri("ISL"),
                language_uri("POL"),
                language_uri("NLD"),
            }
            if str(s) in supported_languages:
                return True
            return False

        return {
            "field_name": "language",
            "label": "Language",
            "required": is_required,
            "preset": "select",
            "help_text": "Language used in content data",
            "form_include_blank_choice": True,
            "choices": RangeValueConverter.vocab_choices(
                g, lambda s: is_supported_language(s)
            ),
        }

    def is_property_required(self, property: RDFSProperty) -> bool:
        return False
