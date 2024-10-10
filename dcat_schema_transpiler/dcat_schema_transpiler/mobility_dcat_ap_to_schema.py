from rdflib import Dataset, URIRef, DCAT, DCTERMS
from typing import List

from ckan_schema.mobility_dcat_ap_converter.class_converter import ClassConverter
from ckan_schema.mobility_dcat_ap_converter.classes.distribution import Distribution
from ckan_schema.mobility_dcat_ap_converter.classes.rights_statement import RightsStatement
from dcat_schema_transpiler.rdfs.rdfs_class import RDFSClass
from dcat_schema_transpiler.rdfs.util import ClassPropertiesAggregator


class MobilityDCATAPToSchema:
    @staticmethod
    def fields_from_aggregator(cps: ClassPropertiesAggregator, ds: Dataset, graph_namespace: URIRef) -> List:
        clazz = cps.clazz
        return ClassConverter.convert(clazz, ds)
    @staticmethod
    def resource_fields(ds: Dataset) -> List:
        distribution = RDFSClass.from_ds(DCAT.Distribution, ds)

        ckan_defaults = {DCTERMS.license, DCTERMS.title, DCTERMS.description}

        distribution_fields_to_omit = (Distribution.recommended_properties - ckan_defaults) | Distribution.optional_properties

        return ClassConverter.convert(distribution, ds, omit={DCAT.Distribution: distribution_fields_to_omit,
                                                              DCTERMS.RightsStatement: RightsStatement.recommended_properties})

    @staticmethod
    def dataset_fields(ds: Dataset) -> List:
        catalog_record = RDFSClass.from_ds(DCAT.CatalogRecord, ds)

        return ClassConverter.convert(catalog_record, ds, omit={DCAT.Distribution: 'all',
                                                                # Dataset publisher is set to the organization
                                                                DCAT.Dataset: {DCTERMS.publisher}})