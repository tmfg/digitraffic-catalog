from rdflib import Dataset, DCAT

from ckan_schema.mobility_dcat_ap_converter.range_value_converter import RangeValueConverter
from rdfs.rdfs_class import RDFSClass
from rdfs.rdfs_property import RDFSProperty


class DataService(RangeValueConverter):
    def __init__(self):
        super().__init__(DCAT.DataService)

    def get_range_value(self, ds: Dataset, clazz: RDFSClass, clazz_p: RDFSProperty) -> RDFSClass | None:
        # TODO
        return None

    def get_schema(self, ds: Dataset, clazz: RDFSClass, clazz_p: RDFSProperty):
        # TODO
        return None
