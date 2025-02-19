from typing import Dict

from rdflib import DCTERMS, Dataset, URIRef
from copy import deepcopy

from ckan_schema.mobility_dcat_ap_converter.range_value_converter import (
    RangeValueConverter,
)
from mobility_dcat_ap.dataset import CVOCAB_FORMAT
from dcat_schema_transpiler.rdfs.rdfs_class import RDFSClass
from dcat_schema_transpiler.rdfs.rdfs_property import RDFSProperty


class MediaTypeOrExtent(RangeValueConverter):
    iri = DCTERMS.MediaTypeOrExtent

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
        g = ds.get_graph(URIRef(CVOCAB_FORMAT))
        return {
            "field_name": "format",
            "label": "Format",
            "required": is_required,
            "preset": "select",
            "sorted_choices": True,
            "form_include_blank_choice": True,
            # set the label as both value and label in the YAML for CKAN
            # otherwise, using ckan_scheming, CKAN will store "value" in the database which results
            # in IRIs displayed in the UI where labels should be
            "choices": [
                {
                    "value": choice.get("label", {}).get("en", None),  # type: ignore
                    "label": deepcopy(choice["label"]),
                    "iri": choice["value"],
                }
                for choice in RangeValueConverter.vocab_choices(g)
            ],
        }

    def is_property_required(self, property: RDFSProperty) -> bool:
        return False
