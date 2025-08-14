from typing import Dict

from rdflib import DCTERMS, Dataset, URIRef
from copy import deepcopy

from ckan_schema.mobility_dcat_ap_converter.range_value_converter import (
    RangeValueConverter,
    Necessity,
)
from mobility_dcat_ap.dataset import CVOCAB_FORMAT
from dcat_schema_transpiler.rdfs.rdfs_class import RDFSClass
from dcat_schema_transpiler.rdfs.rdfs_property import RDFSProperty


class MediaTypeOrExtent(RangeValueConverter):
    iri = DCTERMS.MediaTypeOrExtent

    def __init__(self, clazz: RDFSClass, parent_class_iri: URIRef = None):
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
            "necessity": Necessity.MANDATORY.value,
            "form_include_blank_choice": True,
            # Use the English "label" also as "value".
            #
            # "Value" is by default an IRI in this case, and storing it in the database
            # results in IRIs displayed in the UI where labels should be.
            #
            # The IRI is stored in a separate field so that it can be included in the RDF correctly.
            #
            # This vocabulary doesn't include translations, but if it eventually does,
            # "value" should include the translations. There will probably also
            # have to be a validator that handles the resulting dict value correctly.
            "choices": [
                {
                    "value": (
                        choice["label"].get("en", None)
                        if isinstance(choice["label"], dict)
                        else None
                    ),
                    "label": choice["label"],
                    "iri": choice["value"],
                }
                for choice in RangeValueConverter.vocab_choices(g)
            ],
        }

    def is_property_required(self, property: RDFSProperty) -> bool:
        return False
