from __future__ import annotations
from rdflib import URIRef
from rdflib.namespace import DCAT
import pprint

from file_handler.schema import rdf_to_yaml
from mobility_dcat_ap.dataset import create_dataset
from mobility_dcat_ap.namespace import MOBILITYDCATAP
from mobility_dcat_ap_to_schema import MobilityDCATAPToSchema
from rdfs.rdfs_class import RDFSClass
from rdfs.util import ClassPropertiesAggregator

#
# def range_property_value(p: RDFSProperty, cps: ClassPropertiesAggregator, ds: Dataset) -> RDFSClass|None:
#     r = p.get_rdf_object(RDFS.range, ds) or ()
#     if p.is_iri(DCTERMS.format):
#         # Check comments from https://mobilitydcat-ap.github.io/mobilityDCAT-AP/releases/index.html#distribution-format
#         r_includes = (RDFSClass.from_ds(DCTERMS.MediaTypeOrExtent, ds),)
#     else:
#         r_includes = p.get_rdf_object(DCAM.rangeIncludes, ds) or ()
#     obj = r + r_includes
#     if not obj:
#         print("#### COULD NOT FIND AN OBJECT")
#         return None
#     if p.is_iri(DCTERMS.identifier) and cps.clazz.is_iri(DCTERMS.LicenseDocument):
#         ## TODO: Vapaateksti pitäisi olla myös mahdollinen listan sijasta
#         rdf_range = [o for o in obj if o.is_iri(SKOS.Concept)][0]
#     elif p.is_iri(ADMS['sample']) and cps.clazz.is_iri(DCAT.Distribution):
#         rdf_range = [o for o in obj if o.is_iri(RDFS.Resource)][0]
#     else:
#         rdf_range = obj[0]



# class CKANExtSchemingSchema:
#     def __init__(self, dataset_fields, resource_fields):
#         self.dataset_fields = dataset_fields
#         self.resource_fields = resource_fields
#
#     def add_fields(self, cpa: ClassPropertiesAggregator):
#         pass

ds = create_dataset()

clazz = RDFSClass.from_ds(DCAT.Distribution, ds)



foobar = ClassPropertiesAggregator.from_ds_with_graph(clazz, ds, URIRef(MOBILITYDCATAP._NS))

pprint.pprint(MobilityDCATAPToSchema.fields_from_aggregator(foobar, ds, URIRef(MOBILITYDCATAP._NS)))
rdf_to_yaml(foobar, ds)

print("SDPOFH ###########")
print(str(foobar))
print(f'''properties_count: {len(foobar.properties)}
properties_includes_count: {len(foobar.properties_includes)}''')

