from rdflib import Graph, Namespace

mobility_dcat_v_1_0_1_url = 'https://mobilitydcat-ap.github.io/mobilityDCAT-AP/releases/1.0.1/mobilitydcat-ap.ttl'
dcat_ap_v_2_0_1_url = 'https://joinup.ec.europa.eu/sites/default/files/distribution/access_url/2020-06/e7febda4-1604-4e01-802f-53f0fd2f690c/dcat-ap_2.0.1.rdf'
## HUOM! Ei ole versiota DCAT specificaatioon. Pitäisi olla v2
dcat_url = 'https://www.w3.org/ns/dcat.ttl'

g_mobility_dcat = Graph()
g_mobility_dcat.parse(mobility_dcat_v_1_0_1_url)

g_dcat_ap = Graph()
g_dcat_ap.parse(dcat_ap_v_2_0_1_url)

g_dcat = Graph()
g_dcat.parse(dcat_url)

LOCN = Namespace('http://www.w3.org/ns/locn#')
g_mobility_dcat.bind('locn', LOCN)

### MOBILITY DCAT QUERIES ###

mobility_dcat_classes_q = """
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

    SELECT ?class ?label
    WHERE {
        ?class rdf:type owl:Class .
        ?class rdfs:label ?label .
    }
"""

# Result of this query should be empty
mobility_dcat_properties_without_class_q = """
    PREFIX dcam: <http://purl.org/dc/dcam/>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

    SELECT ?label
    WHERE {
        ?s rdfs:label ?label .
        ?s rdf:type rdf:Property .
        FILTER NOT EXISTS {
            ?s dcam:domainIncludes ?class
        }
    }
"""

mobility_dcat_properties_q = """
    PREFIX dcam: <http://purl.org/dc/dcam/>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

    SELECT ?property ?label ?class
    WHERE {
        ?property rdfs:label ?label .
        ?property rdf:type rdf:Property .
        ?property dcam:domainIncludes ?class
    }
"""

mobility_dcat_unique_classes_with_properties_q = """
    PREFIX dcam: <http://purl.org/dc/dcam/>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

    SELECT DISTINCT ?class
    WHERE {
        ?property rdfs:label ?label .
        ?property rdf:type rdf:Property .
        ?property dcam:domainIncludes ?class
    }
"""

### DCAT AP QUERIES ##

some_test_query = """
    PREFIX dcam: <http://purl.org/dc/dcam/>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

    SELECT ?label
    WHERE {
        ?s rdfs:label ?label .
        FILTER regex(?label, "Dataset - description")
    }
"""

dcat_ap_properties_q = """
    PREFIX dcam: <http://purl.org/dc/dcam/>
    PREFIX dcelem: <http://purl.org/dc/elements/1.1/>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX dcat: <http://www.w3.org/ns/dcat#>
    PREFIX dct: <http://purl.org/dc/terms/>

    SELECT ?label ?identifier
    WHERE {
        ?s dct:identifier 'dcat:dataset' .
        ?s rdfs:label ?label .
    }
"""

### PRINTING ###

### MOBILITY PRINTING
import pprint

mobility_dcat_calsses = [clazz for (clazz,) in g_mobility_dcat.query(mobility_dcat_unique_classes_with_properties_q)]

#for stmt in mobility_dcat_calsses:
#    pprint.pprint(stmt)
for (predicate, object) in g_mobility_dcat.predicate_objects(LOCN.Address):
    pprint.pprint(f'{predicate} {object}')

### DCAT AP PRINTING

#for stmt in g_dcat_ap.query(dcat_ap_properties_q):
#    pprint.pprint(stmt)
