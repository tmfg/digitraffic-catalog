from rdflib import DCTERMS, Dataset, DCAT, FOAF

from ckan_schema.mobility_dcat_ap_converter.range_value_converter import RangeValueConverter
from rdfs.rdfs_class import RDFSClass
from rdfs.rdfs_property import RDFSProperty
from rdfs.rdfs_resource import RDFSResource


class CatalogueRecord(RangeValueConverter):
    def __init__(self):
        super().__init__(iri_to_convert=DCAT.CatalogRecord)

    def get_range_value(self, ds: Dataset, clazz: RDFSClass, clazz_p: RDFSProperty) -> RDFSClass | None:
        if clazz_p.is_iri(FOAF.primaryTopic) and self.is_class_specific_converter(clazz):
            r_value = RDFSResource.from_ds(DCAT.Dataset, ds)
        else:
            r_value = super().get_range_value(ds, clazz, clazz_p)
        return r_value

    def get_schema(self, ds: Dataset, clazz: RDFSClass, clazz_p: RDFSProperty):
        mandatory_properties = {#DCTERMS.created, <--- Generoidaan
                                #DCTERMS.modified, <--- Generoidaan
                                DCTERMS.language, FOAF.primaryTopic}
        if self.is_class_specific_converter(clazz) and clazz_p.iri in mandatory_properties:
            return super().get_schema(ds, clazz, clazz_p)
        return None