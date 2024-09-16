from rdflib import DCAT, Namespace
import pprint

from file_handler.schema import rdf_to_yaml
from mobility_dcat_ap.dataset import create_dataset
from dcat_schema_transpiler.rdfs.rdfs_class import RDFSClass

ds = create_dataset()

clazz = RDFSClass.from_ds(DCAT.Distribution, ds)
print(str(clazz))
print('')
print('----- ADDITIONAL PROPERTIES -----')
print('')
for iri, values in clazz.additional_properties.items():
    print(f'IRI: {iri}')
    #pprint.pprint(values)
    for value, ns in values:
        print(f'> {ns}')
        print(str(value))

print(Namespace('http://foo.example.com'))
print(str(Namespace('http://foo.example.com')))

#rdf_to_yaml(ds)