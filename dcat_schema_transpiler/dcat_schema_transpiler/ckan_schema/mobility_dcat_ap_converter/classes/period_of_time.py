from typing import Dict

from ckan_schema.mobility_dcat_ap_converter.i18n.translations import (
    TRANSLATIONS,
)
from rdflib import Dataset, URIRef
from rdflib.namespace import DCAT, DCTERMS

from ckan_schema.mobility_dcat_ap_converter.range_value_converter import (
    RangeValueConverter,
)
from mobility_dcat_ap.dataset import CVOCAB_FORMAT
from dcat_schema_transpiler.rdfs.rdfs_class import RDFSClass
from dcat_schema_transpiler.rdfs.rdfs_property import RDFSProperty


class PeriodOfTime(RangeValueConverter):
    iri = DCTERMS.PeriodOfTime

    recommended_properties = {DCAT.startDate, DCAT.endDate}

    def __init__(self, clazz: RDFSClass, parent_class_iri: URIRef = None):
        super().__init__(clazz)
        self.parent_class_iri = parent_class_iri

    def ckan_field(self, p: RDFSProperty, pointer: str = None) -> str:
        mappings = {DCAT.startDate: "start_timestamp", DCAT.endDate: "end_timestamp"}
        field_name = mappings.get(p.iri)

        if field_name is not None:
            return field_name
        else:
            raise ValueError(
                f"A mapping was not found between the class {self.clazz.iri} property {p.iri} and CKAN datamodel"
            )

    def get_range_value(self, ds: Dataset, clazz_p: RDFSProperty) -> RDFSClass | None:
        return super().get_range_value(ds, clazz_p)

    def get_schema(
        self, ds: Dataset, clazz_p: RDFSProperty | None, is_required: bool = False
    ):
        if any(clazz_p.is_iri(p) for p in self.__class__.recommended_properties):
            parent_context = TRANSLATIONS.get(
                self.parent_class_iri, TRANSLATIONS[DCAT.Distribution]
            )
            label = parent_context.get(self.iri, {}).get(clazz_p.iri, {})
            return {
                "field_name": self.ckan_field(clazz_p),
                **super().get_necessity_mapping(clazz_p.iri),
                **label,
                "preset": "datetime_tz",
                "required": is_required,
                "classes": ["control-medium", "hide-necessity"],
            }
        return None

    def is_property_required(self, property: RDFSProperty) -> bool:
        return False
