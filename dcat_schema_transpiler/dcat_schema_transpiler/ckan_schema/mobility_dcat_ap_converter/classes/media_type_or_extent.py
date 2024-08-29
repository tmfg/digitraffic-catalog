from rdflib import DCTERMS, Dataset, URIRef

from ckan_schema.mobility_dcat_ap_converter.range_value_converter import RangeValueConverter
from mobility_dcat_ap.dataset import CVOCAB_FORMAT
from rdfs.rdfs_class import RDFSClass
from rdfs.rdfs_property import RDFSProperty


class MediaTypeOrExtent(RangeValueConverter):
    def __init__(self):
        super().__init__(DCTERMS.MediaTypeOrExtent)

    def get_range_value(self, ds: Dataset, clazz: RDFSClass, clazz_p: RDFSProperty) -> RDFSClass | None:
        return super().get_range_value(ds, clazz, clazz_p)

    def get_schema(self, ds: Dataset, clazz: RDFSClass, clazz_p: RDFSProperty | None):
        if self.is_class_specific_converter(clazz):
            return RangeValueConverter.controlled_vocab_field(clazz_p, clazz, ds)
        return super().get_schema(ds, clazz, clazz_p)