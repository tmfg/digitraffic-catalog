from __future__ import annotations
from rdflib import URIRef, RDFS, FOAF
from rdflib.namespace import DCAT, DCAM
import pprint

from file_handler.schema import rdf_to_yaml
from mobility_dcat_ap.dataset import create_dataset, DCAT_AP
from mobility_dcat_ap.namespace import MOBILITYDCATAP
from mobility_dcat_ap_to_schema import MobilityDCATAPToSchema
from rdfs.iri_resource import iri_resource_factory
from rdfs.rdfs_class import RDFSClass
from rdfs.rdfs_property import RDFSProperty
from rdfs.util import ClassPropertiesAggregator

# class CKANExtSchemingSchema:
#     def __init__(self, dataset_fields, resource_fields):
#         self.dataset_fields = dataset_fields
#         self.resource_fields = resource_fields
#
#     def add_fields(self, cpa: ClassPropertiesAggregator):
#         pass

ds = create_dataset()

clazz = RDFSClass.from_ds(DCAT.Dataset, ds)

# print("######## CLASSS ##########")
# print(clazz)
#
print("---> Domain")
for quad in ds.quads((None, RDFS.domain, FOAF.Agent)):
    print(quad)
print("---> Domain includes")
for quad in ds.quads((None, DCAM.domainIncludes, FOAF.Agent)):
    print(quad)
# print("---> Range")
# for quad in ds.quads((None, RDFS.range, DCAT.Dataset)):
#     print(quad)
# print("---> Range includes")
# for quad in ds.quads((None, DCAM.rangeIncludes, DCAT.Dataset)):
#     print(quad)
# print("<<----->>")
# print("---> applicableLegislation")
# for quad in ds.quads((DCAT_AP.applicableLegislation, None, None)):
#     print(quad)

foobar = ClassPropertiesAggregator.from_ds_with_graph(clazz, ds, URIRef(MOBILITYDCATAP._NS))

#print("SDPOFH ###########")
#print(str(foobar))

pprint.pprint(MobilityDCATAPToSchema.fields_from_aggregator(foobar, ds, URIRef(MOBILITYDCATAP._NS)))
rdf_to_yaml(foobar, ds)


print(f'''properties_count: {len(foobar.properties)}
properties_includes_count: {len(foobar.properties_includes)}''')

