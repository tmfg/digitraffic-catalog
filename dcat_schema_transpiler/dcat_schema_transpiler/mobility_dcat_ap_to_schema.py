from rdflib import Dataset, URIRef
from typing import List

from ckan_schema.mobility_dcat_ap_converter.class_converter import ClassConverter
from rdfs.util import ClassPropertiesAggregator


class MobilityDCATAPToSchema:
    @staticmethod
    def fields_from_aggregator(cps: ClassPropertiesAggregator, ds: Dataset, graph_namespace: URIRef) -> List:
        clazz = cps.clazz
        return ClassConverter.convert(clazz, ds)