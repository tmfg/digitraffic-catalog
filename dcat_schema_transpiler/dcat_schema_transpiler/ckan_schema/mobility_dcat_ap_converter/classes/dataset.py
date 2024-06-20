from rdflib import DCTERMS, Dataset, SKOS, RDFS, DCAT, FOAF

from ckan_schema.mobility_dcat_ap_converter.range_value_converter import RangeValueConverter
from mobility_dcat_ap.namespace import MOBILITYDCATAP
from rdfs.rdfs_class import RDFSClass
from rdfs.rdfs_property import RDFSProperty
from rdfs.rdfs_resource import RDFSResource


class DCATDataset(RangeValueConverter):
    def __init__(self):
        super().__init__(iri_to_convert=DCAT.Dataset)

    def get_range_value(self, ds: Dataset, clazz: RDFSClass, clazz_p: RDFSProperty) -> RDFSClass | None:
        if clazz_p.is_iri(DCTERMS.publisher) and self.is_class_specific_converter(clazz):
            r_value = RDFSResource.from_ds(FOAF.Agent, ds)
        else:
            r_value = super().get_range_value(ds, clazz, clazz_p)
        return r_value


    def get_schema(self, ds: Dataset, clazz: RDFSClass, clazz_p: RDFSProperty):
        mandatory_properties = [DCTERMS.description, DCAT.distribution, DCTERMS.accrualPeriodicity,
                                MOBILITYDCATAP.mobilityTheme,
                                #DCTERMS.spatial,
                                DCTERMS.title,
                                DCTERMS.publisher]
        if self.is_class_specific_converter(clazz) and clazz_p.iri in MOBILITYDCATAP.mobilityTheme:
            return RangeValueConverter.controlled_vocab_field(clazz_p, clazz, ds)
        if self.is_class_specific_converter(clazz) and clazz_p.iri in mandatory_properties:
            return super().get_schema(ds, clazz, clazz_p)
        return None