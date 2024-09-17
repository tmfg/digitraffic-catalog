from rdflib import DCTERMS, Dataset

from ckan_schema.mobility_dcat_ap_converter.range_value_converter import RangeValueConverter
from dcat_schema_transpiler.rdfs.rdfs_class import RDFSClass
from dcat_schema_transpiler.rdfs.rdfs_property import RDFSProperty


class LinguisticSystem(RangeValueConverter):
    def __init__(self):
        super().__init__(DCTERMS.LinguisticSystem)

    def get_range_value(self, ds: Dataset, clazz: RDFSClass, clazz_p: RDFSProperty) -> RDFSClass | None:
        return super().get_range_value(ds, clazz, clazz_p)

    def get_schema(self, ds: Dataset, clazz: RDFSClass, clazz_p: RDFSProperty | None, is_required: bool = False):
        if self.is_class_specific_converter(clazz):
            return RangeValueConverter.controlled_vocab_field(clazz_p, clazz, ds, is_required)
        return super().get_schema(ds, clazz, clazz_p, is_required)