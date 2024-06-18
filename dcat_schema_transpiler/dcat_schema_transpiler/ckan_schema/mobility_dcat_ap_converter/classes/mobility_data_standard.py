from rdflib import DCTERMS, Dataset, SKOS, RDFS, OWL, URIRef

from ckan_schema.mobility_dcat_ap_converter.range_value_converter import RangeValueConverter
from mobility_dcat_ap.dataset import CVOCAB_MOBILITY_DATA_STANDARD
from mobility_dcat_ap.namespace import MOBILITYDCATAP
from rdfs.rdfs_class import RDFSClass
from rdfs.rdfs_property import RDFSProperty


class MobilityDataStandard(RangeValueConverter):
    def __init__(self):
        super().__init__(MOBILITYDCATAP.MobilityDataStandard)

    def get_range_value(self, ds: Dataset, clazz: RDFSClass, clazz_p: RDFSProperty) -> RDFSClass | None:
        return super().get_range_value(ds, clazz, clazz_p)

    def get_schema(self, ds: Dataset, clazz: RDFSClass, clazz_p: RDFSProperty):
        if self.is_class_specific_converter(clazz):
            # TODO MobilityDataStandard has some special rules. It has a controlled vocabulary as an option
            # but a custom schema should also be supported
            label_value = RangeValueConverter.get_label(clazz_p, ds)

            if clazz_p.is_iri(OWL.versionInfo):
                return {
                    "field_name": RangeValueConverter.ckan_field(label_value),
                    "label": label_value,
                    "help_text": 'Version of the mobility data standard. Use only short version identifiers, e.g., only  "3.2", without redundant acronyms such as "v", underscores etc.'
                }
            if clazz_p.is_iri(MOBILITYDCATAP.schema):
                g_cvocab_mobility_data_standard = ds.get_graph(URIRef(CVOCAB_MOBILITY_DATA_STANDARD))
                return {
                    "field_name": RangeValueConverter.ckan_field(label_value),
                    "label": "Mobility data standard",
                    "preset": "select",
                    "choices": RangeValueConverter.vocab_choices(g_cvocab_mobility_data_standard)
                }
            raise Exception('Should not get to this point')
        return super().get_schema(ds, clazz, clazz_p)