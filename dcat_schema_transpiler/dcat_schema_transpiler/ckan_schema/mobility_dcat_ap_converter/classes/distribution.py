from rdflib import DCTERMS, Dataset, SKOS, RDFS, DCAT, FOAF

from ckan_schema.mobility_dcat_ap_converter.range_value_converter import RangeValueConverter
from mobility_dcat_ap.dataset import CNT, ADMS
from mobility_dcat_ap.namespace import MOBILITYDCATAP
from rdfs.rdfs_class import RDFSClass
from rdfs.rdfs_property import RDFSProperty
from rdfs.rdfs_resource import RDFSResource


class Distribution(RangeValueConverter):
    def __init__(self):
        super().__init__(iri_to_convert=DCAT.Distribution)

    def get_range_value(self, ds: Dataset, clazz: RDFSClass, clazz_p: RDFSProperty) -> RDFSClass | None:
        return super().get_range_value(ds, clazz, clazz_p)


    def get_schema(self, ds: Dataset, clazz: RDFSClass, clazz_p: RDFSProperty):
        mandatory_properties = {DCAT.accessURL, MOBILITYDCATAP.mobilityDataStandard, DCTERMS.format, DCTERMS.rights}
        recommended_properties = {MOBILITYDCATAP.applicationLayerProtocol, DCTERMS.description, DCTERMS.license}
        optional_properties = {#DCAT.accessService,
                               CNT.characterEncoding, MOBILITYDCATAP.communicationMethod,
                               MOBILITYDCATAP.dataFormatNotes, DCAT.downloadURL, MOBILITYDCATAP.grammar,
                               ADMS.sample, DCTERMS.temporal, DCTERMS.title}
        properties_union = mandatory_properties | recommended_properties | optional_properties
        if self.is_class_specific_converter(clazz) and clazz_p.iri in properties_union:
            return super().get_schema(ds, clazz, clazz_p)
        return None