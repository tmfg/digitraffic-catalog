from typing import Dict, Set, Literal

from rdflib import Dataset, URIRef
from rdflib.namespace import DCAT, DCTERMS

from ckan_schema.mobility_dcat_ap_converter.classes.catalogue_record import CatalogueRecord
from ckan_schema.mobility_dcat_ap_converter.classes.dataset import DCATDataset
from ckan_schema.mobility_dcat_ap_converter.classes.distribution import Distribution
from ckan_schema.mobility_dcat_ap_converter.classes.frequency import Frequency
from ckan_schema.mobility_dcat_ap_converter.classes.license_document import LicenseDocument
from ckan_schema.mobility_dcat_ap_converter.classes.linguistic_system import LinguisticSystem
from ckan_schema.mobility_dcat_ap_converter.classes.media_type_or_extent import MediaTypeOrExtent
from ckan_schema.mobility_dcat_ap_converter.classes.mobility_data_standard import MobilityDataStandard
from ckan_schema.mobility_dcat_ap_converter.classes.rights_statement import RightsStatement
from ckan_schema.mobility_dcat_ap_converter.range_value_converter import RangeValueConverter
from mobility_dcat_ap.namespace import MOBILITYDCATAP_NS_URL, MOBILITYDCATAP
from dcat_schema_transpiler.rdfs.rdfs_class import RDFSClass
from dcat_schema_transpiler.rdfs.util import ClassPropertiesAggregator


class ClassConverter:

    @staticmethod
    def convert(clazz: RDFSClass, ds: Dataset, omit: Dict[URIRef, Set[URIRef] | Literal['all']] = {}, is_required: bool = None):
        if clazz.iri in omit and omit[clazz.iri] == 'all':
            return []
        graph_namespace = URIRef(MOBILITYDCATAP_NS_URL)
        clazz_aggregate = ClassPropertiesAggregator.from_ds_with_graph(clazz, ds, graph_namespace)
        schema_fields = []
        converter = ClassConverter.get_converter(clazz)
        class_properties = clazz_aggregate.properties | clazz_aggregate.properties_includes

        def append_schema(schema):
            if isinstance(schema, list):
                for field in schema:
                    schema_fields.append(field)
            else:
                schema_fields.append(schema)

        if not class_properties:
            schema = converter.get_schema(ds, None, is_required)
            if schema is None:
                print('WARNING: Schema is None when converting a class')
            else:
                append_schema(schema)
        for p in class_properties:
            if clazz.iri in omit and p.iri in omit[clazz.iri]:
                continue
            schema = converter.get_schema(ds, p, is_required)
            if schema is None:
                continue
            is_range_value_class = isinstance(schema, Dict) and set(schema.keys()) == {'required'}
            if is_range_value_class:
                rdf_range = converter.get_range_value(ds, p)
                schema = ClassConverter.convert(rdf_range, ds, omit=omit, is_required=schema.get('required'))
                append_schema(schema)
            else:
                append_schema(schema)
        return schema_fields

    @staticmethod
    def get_converter(clazz: RDFSClass):
        iri_to_converter: Dict[URIRef, type[RangeValueConverter]] = {
            DCAT.CatalogRecord: CatalogueRecord,
            DCAT.Dataset: DCATDataset,
            DCAT.Distribution: Distribution,
            DCTERMS.Frequency: Frequency,
            DCTERMS.LicenseDocument: LicenseDocument,
            DCTERMS.LinguisticSystem: LinguisticSystem,
            DCTERMS.MediaTypeOrExtent: MediaTypeOrExtent,
            MOBILITYDCATAP.MobilityDataStandard: MobilityDataStandard,
            DCTERMS.RightsStatement: RightsStatement
        }

        if clazz.iri in iri_to_converter:
            return iri_to_converter.get(clazz.iri)(clazz)
        else:
            return RangeValueConverter(clazz)
