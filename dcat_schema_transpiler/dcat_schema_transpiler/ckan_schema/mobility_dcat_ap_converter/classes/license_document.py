from rdflib import DCTERMS, Dataset, SKOS

from ckan_schema.mobility_dcat_ap_converter.range_value_converter import RangeValueConverter
from dcat_schema_transpiler.rdfs.rdfs_class import RDFSClass
from dcat_schema_transpiler.rdfs.rdfs_property import RDFSProperty
from dcat_schema_transpiler.rdfs.rdfs_resource import RDFSResource


class LicenseDocument(RangeValueConverter):
    def __init__(self):
        super().__init__(DCTERMS.LicenseDocument)

    def get_range_value(self, ds: Dataset, clazz: RDFSClass, clazz_p: RDFSProperty) -> RDFSClass | None:
        if clazz_p.is_iri(DCTERMS.identifier) and self.is_class_specific_converter(clazz):
            ## TODO: Vapaateksti pitäisi olla myös mahdollinen listan sijasta
            r_value = RDFSResource.from_ds(SKOS.Concept, ds)
        else:
            r_value = super().get_range_value(ds, clazz, clazz_p)
        return r_value

    def get_schema(self, ds: Dataset, clazz: RDFSClass, clazz_p: RDFSProperty):
        return super().get_schema(ds, clazz, clazz_p)
