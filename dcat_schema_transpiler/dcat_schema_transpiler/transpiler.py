from rdflib import Graph, Namespace, URIRef, Literal, BNode
from rdflib.namespace import RDF, RDFS, DCTERMS, XSD, DCAM, DCAT, FOAF, VANN, OWL, QB, SKOS
from rdflib.plugins import sparql
import httpx
import re
import hashlib

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
unique_subject = sparql.prepareQuery("""
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


def po_tuples_to_po_dict(ns_graph, subject_p_o, dcat_wordss=None):
    if dcat_wordss is None:
        dcat_words = {}
    else:
        dcat_words = dcat_wordss
    for (dcat_predicate, dcat_object) in subject_p_o:
        if type(dcat_object) is BNode:
            new_dict = {}
            if dcat_predicate in dcat_words:
                dcat_words.get(dcat_predicate).append(new_dict)
            else:
                dcat_words[dcat_predicate] = [new_dict]
            po_tuples_to_po_dict(ns_graph, ns_graph.predicate_objects(dcat_object), new_dict)
        else:
            if dcat_predicate in dcat_words:
                dcat_words.get(dcat_predicate).append(dcat_object)
            else:
                dcat_words[dcat_predicate] = [dcat_object]
    return dcat_words

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

def is_property(po_dict):
    return (URIRef('http://www.w3.org/2000/01/rdf-schema#subPropertyOf') in po_dict or
            URIRef('http://www.w3.org/2000/01/rdf-schema#domain') in po_dict or
            URIRef('http://www.w3.org/2002/07/owl#DatatypeProperty') in po_dict.get(URIRef('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'), {}) or
            URIRef('http://www.w3.org/1999/02/22-rdf-syntax-ns#Property') in po_dict.get(URIRef('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'), {}))


def is_class(po_dict):
    return (URIRef('http://www.w3.org/2002/07/owl#Class') in po_dict.get(URIRef('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'), {}) or
            URIRef('http://www.w3.org/2000/01/rdf-schema#Class') in po_dict.get(URIRef('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'), {}))

def get_is_defined_by(po_dict):
    return po_dict.get(URIRef('http://www.w3.org/2000/01/rdf-schema#isDefinedBy'), [None])[0]

def get_domains(po_dict):
    rdfs_domains = (po_dict.get(URIRef('http://www.w3.org/2000/01/rdf-schema#domain')) or [])
    dcam_domains = (po_dict.get(URIRef('http://purl.org/dc/dcam/domainIncludes')) or [])
    return rdfs_domains + dcam_domains

def get_subject_iri_from_graph(graph: Graph, subject: URIRef) -> URIRef:
    shortened_identifier_p = re.compile('[a-zA-Z]+:[a-zA-Z]+')
    local_identifier_p = re.compile('[a-zA-Z]+')
    try:
        ref_identifier_node = next(graph[subject: DCTERMS.identifier])
        ## Special handling for some known cases
        if type(ref_identifier_node) is BNode:
            if str(subject) == 'http://www.w3.org/ns/dcat#Role':
                ref_identifier = 'dcat:Role'
        else:
            ref_identifier = ref_identifier_node.value.strip()
        if shortened_identifier_p.match(ref_identifier):
            full_identifier_iri = graph.namespace_manager.expand_curie(ref_identifier)
        elif local_identifier_p.match(ref_identifier):
            full_identifier_iri = subject
        else:
            full_identifier_iri = ref_identifier
        return full_identifier_iri
    except StopIteration:
        # There was no identifier property so return the 'subject' itself
        return subject

def get_graph_for_iri(iri_referencing_graph: Graph, iri: URIRef) -> Graph:
    try:
        ns_prefix, ns = [(ns_prefix, ns) for (ns_prefix, ns) in iri_referencing_graph.namespaces() if URIRef(iri).startswith(ns)][0]
    except IndexError:
        return (None, None)
    if ns_prefix in downloaded_graphs:
        return (ns_prefix, downloaded_graphs[ns_prefix])
    # Special handling for dcat ap
    if (str(ns) == 'http://data.europa.eu/r5r/'):
        ns_graph = g_dcat_ap
    # The namespaces in elif -clauses need some special handling as the content negotiation does not work
    elif str(ns_prefix) == 'spdx':
        g_spdx = Graph()
        g_spdx.parse('https://raw.githubusercontent.com/spdx/spdx-spec/development/v2.3/ontology/spdx-ontology.owl.xml', format='application/rdf+xml')
        ns_graph = g_spdx
    elif str(ns_prefix) == 'locn':
        g_locn = Graph()
        g_locn.parse('https://semiceu.github.io/Core-Location-Vocabulary/releases/w3c/locn.rdf', format='application/rdf+xml')
        ns_graph = g_locn
    elif str(ns_prefix) == 'vann':
        g_vann = Graph()
        g_vann.parse('https://vocab.org/vann/vann-vocab-20100607.rdf', format='application/rdf+xml')
        ns_graph = g_vann
    else:
        ns_graph = download_graph(ns)
    ns_graph.bind(ns_prefix, ns)
    downloaded_graphs[ns_prefix] = ns_graph
    return (ns_prefix, ns_graph)

def enrich_po_dict(po_dict, graph):
    try:
        ns_prefix_list = [ns_prefix for (ns_prefix, ns) in graph.namespaces() if (get_is_defined_by(po_dict) or "").startswith(ns)]
        if len(ns_prefix_list) == 0:
            ns_prefix = None
        else:
            ns_prefix = ns_prefix_list[0]
    except IndexError:
        return (None, None)
    return {
        'po_dict': po_dict,
        'type': 'property' if is_property(po_dict) else ('class' if is_class(po_dict) else 'other'),
        'domain': get_domains(po_dict) if is_property(po_dict) else None,
        'ns_prefix': ns_prefix
    }

def classes_properties(graph, ns_prefix):
    enriched_dict = {}
    for (subject,) in graph.query(unique_subject):
        if type(subject) is not BNode:
            full_identifier_iri = get_subject_iri_from_graph(graph, subject)
            origin_ns_prefix, origin_ns_graph = get_graph_for_iri(graph, full_identifier_iri)
            if origin_ns_graph is not None:
                origin_graph_subject_p_o = origin_ns_graph.predicate_objects(URIRef(full_identifier_iri))
                origin_graph_po_dict = po_tuples_to_po_dict(origin_ns_graph, origin_graph_subject_p_o)
            graph_subject_p_o = graph.predicate_objects(subject)
            graph_po_dict = po_tuples_to_po_dict(graph, graph_subject_p_o, origin_graph_po_dict)
            enriched_dict[subject] = enrich_po_dict(graph_po_dict, graph)
    return enriched_dict

dcat_ap_words = classes_properties(g_dcat_ap, 'dcatap')
mobility_dcat_words = classes_properties(g_mobility_dcat, 'mobilitydcatap')

#pprint.pprint([v['domain'] for k,v in dcat_ap_words.items() if v['domain']])

def combine_mobility_and_dcat_ap(mobility_dcat_words, dcat_ap_words):
    classes_with_properties = {}
    h = hashlib.new('sha256')
    for k,v in mobility_dcat_words.items():
        if v['type'] == 'class':
            classes_with_properties[k] = {}
    for k,v in dcat_ap_words.items():
        if v['type'] == 'class':
            classes_with_properties[k] = {}
    for k,v in mobility_dcat_words.items():
        if v['domain']:
            for clazz in v.get('domain', []):
                if type(clazz) is URIRef:
                    clazz_key = clazz
                else:
                    h.update(str(clazz).encode())
                    clazz_key = h.hexdigest()
                classes_with_properties[clazz_key] = classes_with_properties.get(clazz_key, {}) | {k: v}
                #classes_with_properties.update({clazz_key: {k: v}})
    for k,v in dcat_ap_words.items():
        if v['domain']:
            for clazz in v.get('domain', []):
                if type(clazz) is URIRef:
                    clazz_key = clazz
                else:
                    h.update(str(clazz).encode())
                    clazz_key = h.hexdigest()
                if classes_with_properties.get(clazz_key):
                    classes_with_properties[clazz_key]['dcat_original'] = classes_with_properties[clazz_key].get('dcat_original', {}) | {k: v}
                else:
                    classes_with_properties[clazz_key] = {'dcat_original': {k: v}}
    return classes_with_properties

def print_ns_classes_with_properties(classes_with_properties, ns_prefix):
    for k,v in classes_with_properties.items():
        if any(vv.get('ns_prefix') == ns_prefix for vv in v.values()):
            pprint.pprint(k)
            for kk,vv in v.items():
                pprint.pprint(f'-- {kk}')

classes_with_properties = combine_mobility_and_dcat_ap(mobility_dcat_words, dcat_ap_words)

dcat_ap_words_classes = {k for k,v in dcat_ap_words.items() if v['type'] == 'class'}
mobility_dcat_words_classes = {k for k,v in mobility_dcat_words.items() if v['type'] == 'class'}

pprint.pprint("###### CLASSES ######")
pprint.pprint(dcat_ap_words_classes)
pprint.pprint("###### MOBILITY CLASSES ######")
pprint.pprint(mobility_dcat_words_classes)
pprint.pprint("###### COMMON CLASSES #######")
pprint.pprint(dcat_ap_words_classes.intersection(mobility_dcat_words_classes))
pprint.pprint("###### DCAT AP UNIQUE CLASSES #####")
pprint.pprint(dcat_ap_words_classes.difference(mobility_dcat_words_classes))
pprint.pprint("###### MOBILITY DCAT AP UNIQUE CLASSES #####")
pprint.pprint(mobility_dcat_words_classes.difference(dcat_ap_words_classes))
pprint.pprint("###### CLASSES WITH PROPERTIES ######")
print_ns_classes_with_properties(classes_with_properties, 'mobilitydcatap')
#for k,v in classes_with_properties.items():
#    pprint.pprint(k)
#    for kk,vv in v.items():
#        pprint.pprint(f'-- {kk}')
        #pprint.pprint(vv)
pprint.pprint("###### STATS ######")
pprint.pprint(f'dcat ap classes count: {len(dcat_ap_words_classes)}')
pprint.pprint(f'mobility classes count: {len(mobility_dcat_words_classes)}')
pprint.pprint(f'common classes count: {len(dcat_ap_words_classes.intersection(mobility_dcat_words_classes))}')
pprint.pprint(f'classes with properties count: {len(classes_with_properties.keys())}')

#pprint.pprint(classes_with_properties)





#for ns in g_dcat_ap.namespaces():
#    pprint.pprint(ns)