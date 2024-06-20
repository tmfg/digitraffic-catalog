from rdflib import Dataset, URIRef

from ckan_schema.mobility_dcat_ap_converter.classes.dataset import DCATDataset
from ckan_schema.mobility_dcat_ap_converter.classes.distribution import Distribution
from ckan_schema.mobility_dcat_ap_converter.classes.frequency import Frequency
from ckan_schema.mobility_dcat_ap_converter.classes.license_document import LicenseDocument
from ckan_schema.mobility_dcat_ap_converter.classes.media_type_or_extent import MediaTypeOrExtent
from ckan_schema.mobility_dcat_ap_converter.classes.mobility_data_standard import MobilityDataStandard
from ckan_schema.mobility_dcat_ap_converter.classes.rights_statement import RightsStatement
from ckan_schema.mobility_dcat_ap_converter.range_value_converter import RangeValueConverter
from mobility_dcat_ap.namespace import MOBILITYDCATAP_NS_URL
from rdfs.rdfs_class import RDFSClass
from rdfs.util import ClassPropertiesAggregator


class ClassConverter:

    @staticmethod
    def convert(clazz: RDFSClass, ds: Dataset):
        graph_namespace = URIRef(MOBILITYDCATAP_NS_URL)
        clazz_aggregate = ClassPropertiesAggregator.from_ds_with_graph(clazz, ds, graph_namespace)
        schema_fields = []
        converter = ClassConverter.get_converter(clazz)
        class_properties = clazz_aggregate.properties | clazz_aggregate.properties_includes
        #print('-------------')
        #print(f'converter: {converter.__class__.__name__}')
        #print(f'converting class: {clazz.iri}')
        def append_schema(schema):
            if isinstance(schema, list):
                for field in schema:
                    schema_fields.append(field)
            else:
                schema_fields.append(schema)
        if not class_properties:
            schema = converter.get_schema(ds, clazz, None)
            if schema is None:
                print('WARNING: Schema is None when converting a class')
            else:
                append_schema(schema)
        for p in class_properties:
            #print(f'--> property: {p.iri}')
            schema = converter.get_schema(ds, clazz, p)
            #print(schema)
            is_range_value_class = schema == {}
            #print(f'is_range_value_class: {is_range_value_class}')
            #print(f'schema is None: {schema is None}')
            if is_range_value_class:
                rdf_range = converter.get_range_value(ds, clazz, p)
                #print(f'rdf_range: {rdf_range}')
                schema = ClassConverter.convert(rdf_range, ds)
                append_schema(schema)
            elif schema is None:
                continue
            else:
                append_schema(schema)
        return schema_fields

    @staticmethod
    def get_converter(clazz: RDFSClass):
        specific_converters = [LicenseDocument(), MediaTypeOrExtent(), MobilityDataStandard(), RightsStatement(),
                               Distribution(), Frequency(), DCATDataset()]
        for converter in specific_converters:
            if converter.is_class_specific_converter(clazz):
                return converter
        return RangeValueConverter()
