from rdflib import DCTERMS, Dataset, RDFS

from ckan_schema.mobility_dcat_ap_converter.range_value_converter import RangeValueConverter
from rdfs.rdfs_class import RDFSClass
from rdfs.rdfs_property import RDFSProperty


class RightsStatement(RangeValueConverter):
    recommended_properties = {RDFS.label}

    def __init__(self):
        super().__init__(iri_to_convert=DCTERMS.RightsStatement)

    def get_range_value(self, ds: Dataset, clazz: RDFSClass, clazz_p: RDFSProperty) -> RDFSClass | None:
        return super().get_range_value(ds, clazz, clazz_p)

    def get_schema(self, ds: Dataset, clazz: RDFSClass, clazz_p: RDFSProperty):
        if self.is_class_specific_converter(clazz) and clazz_p.is_iri(RDFS.label):
            return dict(
                field_name=RangeValueConverter.ckan_field(clazz.iri, clazz_p),
                label='Additional information for access and usage'
            )
        return super().get_schema(ds, clazz, clazz_p)