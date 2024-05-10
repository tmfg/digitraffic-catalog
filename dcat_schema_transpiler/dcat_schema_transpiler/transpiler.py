from rdflib import Graph, Namespace, URIRef, Literal, BNode
from rdflib.namespace import RDF, RDFS, DCTERMS, XSD, DCAM, DCAT, FOAF, VANN, OWL, QB, SKOS
from rdflib.plugins import sparql
import httpx
import re

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

ADMS = Namespace('http://www.w3.org/ns/adms#')
LOCN = Namespace('http://www.w3.org/ns/locn#')
DCELEM = Namespace('http://purl.org/dc/elements/1.1/')
DCT = Namespace('http://purl.org/dc/terms/')
XHV = Namespace('http://www.w3.org/1999/xhtml/vocab#')
CC = Namespace('http://creativecommons.org/ns#')
VCARD = Namespace('http://www.w3.org/2006/vcard/ns#')
SDMX = Namespace('http://purl.org/linked-data/sdmx#')
WDRS = Namespace('http://www.w3.org/2007/05/powder-s#')
VOAF = Namespace('http://purl.org/vocommons/voaf#')
SKOS_DOC = Namespace('http://www.w3.org/TR/skos-primer/')
SPDX = Namespace('http://spdx.org/rdf/terms#')

namespaces = {
    "adms": ADMS,
    "locn": LOCN,
    "dcelem": DCELEM,
    "dct": DCT,
    "xhv": XHV,
    "cc": CC,
    "vcard": VCARD,
    "sdmx": SDMX,
    "wdrs": WDRS,
    "voaf": VOAF,
    "skosDoc": SKOS_DOC,
    "spdx": SPDX
}

for ns_name, ns in namespaces.items():
    g_mobility_dcat.bind(ns_name, ns)
    g_dcat_ap.bind(ns_name, ns)
    g_dcat.bind(ns_name, ns)

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

# dcat_ap_unique_classes_with_properties_q = """
#     PREFIX dcam: <http://purl.org/dc/dcam/>
#     PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
#     PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
#
#     SELECT DISTINCT ?class
#     WHERE {
#         ?property rdfs:label ?label .
#         ?property rdf:type rdf:Property .
#         ?property dcam:domainIncludes ?class
#     }
# """

### PRINTING ###

### MOBILITY PRINTING
import pprint

mobility_dcat_calsses = [clazz for (clazz,) in g_mobility_dcat.query(mobility_dcat_unique_classes_with_properties_q)]

#for stmt in mobility_dcat_calsses:
#    pprint.pprint(stmt)
#for (predicate, object) in g_mobility_dcat.predicate_objects(LOCN.Address):
#    pprint.pprint(f'{predicate} {object}')

### DCAT AP PRINTING
some_ref = URIRef('http://www.w3.org/ns/dcat#record')
some_ref_def_by = g_dcat_ap[some_ref: RDFS.isDefinedBy]
some_ref_identifier = g_dcat_ap[some_ref: DCTERMS.identifier]

dcat_ap_namespaces = {
    "dct": DCT,
    "foaf": FOAF,
    "dcat": DCAT,
    "adms": ADMS,
    "vann": VANN,
    "xhv": XHV,
    "cc": CC,
    "owl": OWL,
    "vcard": VCARD,
    "sdmx": SDMX,
    "wdrs": WDRS,
    "voaf": VOAF,
    "skosDoc": SKOS_DOC,
    "spdx": SPDX,
    "xsd": XSD,
    "qb": QB,
    "skos": SKOS,
    "dcam": DCAM,
    "dcelem": DCELEM,
    "rdf": RDF,
    "rdfs": RDFS,
}

dcat_ap_voc_q = sparql.prepareQuery("""
    SELECT ?s ?predicate ?object
    WHERE {
    ?s ?predicate ?object .
    BIND( IRI(?identifier) AS ?s ).
    }
""",
    initNs = dcat_ap_namespaces)
dcat_ap_unique_subject = sparql.prepareQuery("""
    SELECT DISTINCT ?subject
    WHERE {
        ?subject ?p ?o .
    }
""",
    initNs = dcat_ap_namespaces)
# for stmt in g_dcat_ap.predicate_objects(some_ref):
#     pprint.pprint(stmt)
# pprint.pprint("   -----------   ")
# for stmt in g_dcat.predicate_objects(some_ref):
#     pprint.pprint(stmt)
# pprint.pprint("   -----------   ")
# pprint.pprint(some_ref_def_by)
# for stmtt in some_ref_def_by:
#     pprint.pprint(stmtt)
# pprint.pprint("   -----------   ")
# for stmtt in some_ref_identifier:
#     pprint.pprint(stmtt.value)
#     for stmt in g_dcat.query(q, initBindings={'identifier': URIRef(stmtt.value)}):
#         pprint.pprint(stmt)

dcat_ap_words = {}

def blank_node_values(dcat_words, ns_graph, subject_dcat_p_o):
    for (dcat_predicate, dcat_object) in subject_dcat_p_o:
        if type(dcat_object) is BNode:
            new_dic = {}
            dcat_words[dcat_predicate] = [new_dic]
            blank_node_values(new_dic, ns_graph, ns_graph.predicate_objects(dcat_object))
        else:
            if dcat_predicate in dcat_words:
                dcat_words.get(dcat_predicate).append(dcat_object)
            else:
                dcat_words[dcat_predicate] = [dcat_object]

def download_graph(ns: URIRef) -> Graph:
    headers = {'Accept': 'application/rdf+xml, text/turtle'}
    r = httpx.get(str(ns), headers=headers, follow_redirects=True)
    graph_url = str(r.url)
    #pprint.pprint(f'download_graph: graph_url {graph_url}')
    g = Graph()
    g.parse(graph_url)
    return g

#pprint.pprint("ASFASF")
#test_graph = Graph()
#test_graph.parse('https://sparontologies.github.io/frbr/current/frbr.xml', format='application/rdf+xml')
#for foo in g_dcat_ap.query('SELECT ?s ?p ?o WHERE { ?s ?p ?o . FILTER regex(str(?s), "http://purl.org/dc/terms/") }'):
#    pprint.pprint(foo)
#for foo in test_graph:
#    pprint.pprint(foo)
#pprint.pprint("ASFASF")

shortened_identifier_p = re.compile('[a-zA-Z]+:[a-zA-Z]+')
local_identifier_p = re.compile('[a-zA-Z]+')
downloaded_graphs = {}

def get_graph(ns_prefix: str, ns: URIRef, g_dcat_ap) -> Graph:
    #pprint.pprint(f'get_graph: ns_prefix {ns_prefix}')
    #pprint.pprint(downloaded_graphs.keys())
    if ns_prefix in downloaded_graphs:
        #pprint.pprint('Access from the dict')
        return downloaded_graphs[ns_prefix]
    if (str(ns) == 'http://data.europa.eu/r5r/'):
        ns_graph = g_dcat_ap
    # spdx and locn need some special handling as the content negotiation does not work
    elif str(ns_prefix) == 'spdx':
        g_spdx = Graph()
        g_spdx.parse('https://raw.githubusercontent.com/spdx/spdx-spec/development/v2.3/ontology/spdx-ontology.owl.xml', format='application/rdf+xml')
        ns_graph = g_spdx
    elif str(ns_prefix) == 'locn':
       g_locn = Graph()
       g_locn.parse('https://semiceu.github.io/Core-Location-Vocabulary/releases/w3c/locn.rdf', format='application/rdf+xml')
       ns_graph = g_locn
    else:
        ns_graph = download_graph(ns)
    ns_graph.bind(ns_prefix, ns)
    downloaded_graphs[ns_prefix] = ns_graph
    return ns_graph

def is_property(po_dict):
    return (URIRef('http://www.w3.org/2000/01/rdf-schema#subPropertyOf') in po_dict or
            URIRef('http://www.w3.org/2000/01/rdf-schema#domain') in po_dict or
            URIRef('http://www.w3.org/2002/07/owl#DatatypeProperty') in po_dict[URIRef('http://www.w3.org/1999/02/22-rdf-syntax-ns#type')] or
            URIRef('http://www.w3.org/1999/02/22-rdf-syntax-ns#Property') in po_dict[URIRef('http://www.w3.org/1999/02/22-rdf-syntax-ns#type')])


def is_class(po_dict):
    return (URIRef('http://www.w3.org/2002/07/owl#Class') in po_dict[URIRef('http://www.w3.org/1999/02/22-rdf-syntax-ns#type')] or
            URIRef('http://www.w3.org/2000/01/rdf-schema#Class') in po_dict[URIRef('http://www.w3.org/1999/02/22-rdf-syntax-ns#type')])


for (dcat_ap_subject,) in g_dcat_ap.query(dcat_ap_unique_subject):
    if type(dcat_ap_subject) is not BNode:
        try:
            #pprint.pprint(f'subject is {dcat_ap_subject}')
            ref_identifier_node = next(g_dcat_ap[dcat_ap_subject: DCTERMS.identifier])
            if type(ref_identifier_node) is BNode:
                if str(dcat_ap_subject) == 'http://www.w3.org/ns/dcat#Role':
                    ref_identifier = 'dcat:Role'
            else:
                ref_identifier = ref_identifier_node.value.strip()
            #pprint.pprint(f'identifier is {ref_identifier}')
            if shortened_identifier_p.match(ref_identifier):
                full_identifier_uri = g_dcat_ap.namespace_manager.expand_curie(ref_identifier)
            elif local_identifier_p.match(ref_identifier):
                full_identifier_uri = dcat_ap_subject
            else:
                full_identifier_uri = ref_identifier
            #pprint.pprint(f'full identifier is {full_identifier_uri}')
            #pprint.pprint(ref_identifier)
            #identifier_uri,badsf,asdfa = next(iter(g_dcat.query(sparql.prepareQuery("SELECT ?s ?predicate ?object WHERE { ?s ?predicate ?object . BIND( IRI(?identifier) AS ?s ). }",initNs = dcat_ap_namespaces), initBindings={'identifier': ref_identifier})))
            #pprint.pprint(identifier_uri)
            #pprint.pprint()
            #pprint.pprint(badsf)
            #pprint.pprint(asdfa)
            #pprint.pprint(URIRef(full_identifier_uri))
            #pprint.pprint(URIRef('http://purl.org/dc/terms/Location') in DCT)
            #pprint.pprint(type(DCT))
            #pprint.pprint(URIRef('http://purl.org/dc/terms/Location') in g_dcat_ap.namespace_manager)
            #pprint.pprint(list(g_dcat_ap.namespace_manager.namespaces()))
            #pprint.pprint([(ns_prefix, ns) for (ns_prefix, ns) in g_dcat_ap.namespaces() if URIRef(full_identifier_uri).startswith(ns)])
            ns_prefix, ns = [(ns_prefix, ns) for (ns_prefix, ns) in g_dcat_ap.namespaces() if URIRef(full_identifier_uri).startswith(ns)][0]

            #pprint.pprint(f'ns prefix is {ns_prefix} and ns is {ns}')

            #pprint.pprint("NAMESPACE TYPE")
            #pprint.pprint(type(ns))
            #subject_dcat_triples = g_dcat.query(dcat_ap_voc_q, initBindings={'identifier': ref_identifier})
            #pprint.pprint(ns)
            #pprint.pprint(ns["Graph"])

            ns_graph = get_graph(ns_prefix, ns, g_dcat_ap)

            subject_dcat_p_o = ns_graph.predicate_objects(URIRef(full_identifier_uri))
            #ns_graph.query(sparql.prepareQuery("SELECT ?subject ?predicate ?object WHERE { BIND( IRI(?identifier) AS ?s ). ?subject ?predicate ?object . FILTER(?s = ?subject).  }",initNs = dcat_ap_namespaces), initBindings={'identifier': ref_identifier})
            #ns_graph.query(dcat_ap_voc_q, initBindings={'identifier': ref_identifier_node})

            dcat_words = {}
            blank_node_values(dcat_words, ns_graph, subject_dcat_p_o)
            #for (dcat_predicate, dcat_object) in subject_dcat_p_o:
            #    blank_node_values(dcat_words, subject_dcat_p_o, dcat_predicate, dcat_object)
#                 if type(dcat_object) is BNode:
#                     foo()
#                 else:
#                     dcat_words[dcat_predicate] = dcat_object
            dcat_ap_words[dcat_ap_subject] = {
                'dcat_ap': {dcat_ap_predicate: dcat_ap_object for (dcat_ap_predicate, dcat_ap_object) in g_dcat_ap.predicate_objects(dcat_ap_subject)},
                ns_prefix: dcat_words, #{dcat_predicate: dcat_object for (_, dcat_predicate, dcat_object) in subject_dcat_triples}
                'type': 'property' if is_property(dcat_words) else ('class' if is_class(dcat_words) else 'other')
            }
        except StopIteration:
            pprint.pprint(f'Could not find identifier for {dcat_ap_subject}')
pprint.pprint(dcat_ap_words)

pprint.pprint("###### CLASSES ######")
pprint.pprint([k for k,v in dcat_ap_words.items() if v['type'] == 'class'])



#for ns in g_dcat_ap.namespaces():
#    pprint.pprint(ns)