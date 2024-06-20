from rdflib import DCTERMS, Dataset, DCAT, FOAF

from ckan_schema.mobility_dcat_ap_converter.range_value_converter import RangeValueConverter
from rdfs.rdfs_class import RDFSClass
from rdfs.rdfs_property import RDFSProperty


class CatalogueRecord(RangeValueConverter):
    def __init__(self):
        super().__init__(iri_to_convert=DCAT.CatalogRecord)

    def get_range_value(self, ds: Dataset, clazz: RDFSClass, clazz_p: RDFSProperty) -> RDFSClass | None:
        return super().get_range_value(ds, clazz, clazz_p)


    def get_schema(self, ds: Dataset, clazz: RDFSClass, clazz_p: RDFSProperty):
        mandatory_properties = {#DCTERMS.created, <--- Generoidaan
                                #DCTERMS.modified, <--- Generoidaan
                                DCTERMS.language, FOAF.primaryTopic}
        if self.is_class_specific_converter(clazz) and clazz_p.iri in mandatory_properties:
            return super().get_schema(ds, clazz, clazz_p)
        return None