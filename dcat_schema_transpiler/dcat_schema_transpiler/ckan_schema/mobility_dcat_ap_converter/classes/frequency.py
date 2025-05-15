from typing import Dict

from rdflib import DCTERMS, Dataset, URIRef

from ckan_schema.mobility_dcat_ap_converter.range_value_converter import (
    RangeValueConverter, Necessity,
)
from mobility_dcat_ap.dataset import (
    CVOCAB_EUV_FREQUENCY,
)
from dcat_schema_transpiler.rdfs.rdfs_class import RDFSClass
from dcat_schema_transpiler.rdfs.rdfs_property import RDFSProperty


class Frequency(RangeValueConverter):
    iri = DCTERMS.Frequency

    def __init__(self, clazz: RDFSClass):
        super().__init__(clazz)

    def ckan_field(self, p: RDFSProperty, pointer: str = None) -> str:
        raise ValueError(
            f"{self.__class__.__name__} class {self.clazz.iri} does not have any properties. Only vocabulary."
        )

    def get_range_value(self, ds: Dataset, clazz_p: RDFSProperty) -> RDFSClass | None:
        return super().get_range_value(ds, clazz_p)

    def get_schema(
        self, ds: Dataset, clazz_p: RDFSProperty | None, is_required: bool = False
    ):
        return self.controlled_vocab_field(clazz_p, ds, is_required)

    def controlled_vocab_field(
        self, p: RDFSProperty, ds: Dataset, is_required: bool
    ) -> Dict:
        g = ds.get_graph(URIRef(CVOCAB_EUV_FREQUENCY))
        return {
            "field_name": "frequency",
            **super().get_class_label_with_help_text(),
            "necessity": Necessity.MANDATORY.value,
            "required": is_required,
            "preset": "multi_select",
            "sorted_choices": True,
            "choices": RangeValueConverter.vocab_choices(graph=g, iri=self.iri),
            "validators": "frequency_validator",
            "output_validators": "frequency_validator",
        }

    def is_property_required(self, property: RDFSProperty) -> bool:
        return False
