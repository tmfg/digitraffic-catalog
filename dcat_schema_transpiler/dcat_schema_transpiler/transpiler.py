from __future__ import annotations
from rdflib import Dataset, Graph, Namespace, URIRef, Literal, BNode
from rdflib.namespace import DefinedNamespace, RDF, RDFS, DCTERMS, XSD, DCAM, DCAT, FOAF, VANN, OWL, QB, SKOS, ORG, PROV
from rdflib.plugins import sparql
from typing import List, Type, TypeVar, Any, Dict, Tuple
import httpx
import re
import hashlib
import owlready2
import glob
import base64
import pprint
import os

MOBILITYDCATAP_NS_URL = 'http://w3id.org/mobilitydcat-ap#'
DCATAP_NS_URL = 'http://data.europa.eu/r5r/'

mobility_dcat_v_1_0_1_url = 'https://mobilitydcat-ap.github.io/mobilityDCAT-AP/releases/1.0.1/mobilitydcat-ap.ttl'
dcat_ap_v_2_0_1_url = 'https://joinup.ec.europa.eu/sites/default/files/distribution/access_url/2020-06/e7febda4-1604-4e01-802f-53f0fd2f690c/dcat-ap_2.0.1.rdf'
## HUOM! Ei ole versiota DCAT specificaatioon. Pitäisi olla v2
dcat_url = 'https://www.w3.org/ns/dcat.ttl'

ds = Dataset()

g_mobility_dcat = ds.graph(URIRef(MOBILITYDCATAP_NS_URL))
g_mobility_dcat.parse(mobility_dcat_v_1_0_1_url)

g_dcat_ap = ds.graph(URIRef(DCATAP_NS_URL))
g_dcat_ap.parse(dcat_ap_v_2_0_1_url)

ADMS = Namespace('http://www.w3.org/ns/adms#')
BIBO = Namespace('http://purl.org/ontology/bibo/')
CC = Namespace('http://creativecommons.org/ns#')
CNT = Namespace('http://www.w3.org/2011/content#')
DCAT_AP = Namespace('http://data.europa.eu/r5r/')
DCELEM = Namespace('http://purl.org/dc/elements/1.1/')
DCT = Namespace('http://purl.org/dc/terms/')
DQV = Namespace('http://www.w3.org/ns/dqv#')
LOCN = Namespace('http://www.w3.org/ns/locn#')
OA = Namespace('http://www.w3.org/ns/oa#')
XHV = Namespace('http://www.w3.org/1999/xhtml/vocab#')
VCARD = Namespace('http://www.w3.org/2006/vcard/ns#')
SDMX = Namespace('http://purl.org/linked-data/sdmx#')
WDRS = Namespace('http://www.w3.org/2007/05/powder-s#')
VOAF = Namespace('http://purl.org/vocommons/voaf#')
VS = Namespace('http://www.w3.org/2003/06/sw-vocab-status/ns#')
SKOS_DOC = Namespace('http://www.w3.org/TR/skos-primer/')
SPDX = Namespace('http://spdx.org/rdf/terms#')
XML = Namespace('http://www.w3.org/XML/1998/namespace')


class MOBILITYDCATAP(DefinedNamespace):
    _NS = Namespace(MOBILITYDCATAP_NS_URL)

    # Classes
    MobilityDataStandard: URIRef
    Assessment: URIRef

    # Properties
    mobilityTheme: URIRef
    georeferencingMethod: URIRef
    networkCoverage: URIRef
    transportMode: URIRef
    assessmentResult: URIRef
    intendedInformationService: URIRef
    mobilityDataStandard: URIRef
    applicationLayerProtocol: URIRef
    communicationMethod: URIRef
    grammar: URIRef
    schema: URIRef
    dataFormatNotes: URIRef


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

mobility_dcat_namespaces = {
    "adms": ADMS,
    "bibo": BIBO,
    "cnt": CNT,
    "dcat": DCAT,
    "dcatap": DCAT_AP,
    "dct": DCT,
    "dcam": DCAM,
    "dqv": DQV,
    "foaf": FOAF,
    "locn": LOCN,
    "oa": OA,
    "org": ORG,
    "owl": OWL,
    "prov": PROV,
    "rdf": RDF,
    "rdfs": RDFS,
    "skos": SKOS,
    "spdx": SPDX,
    "vann": VANN,
    "vcard": VCARD,
    "voaf": VOAF,
    "vs": VS,
    "xml": XML,
    "xsd": XSD
}

# for ns_name, ns in namespaces.items():
#    g_mobility_dcat.bind(ns_name, ns)
#    g_dcat_ap.bind(ns_name, ns)

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

### PRINTING ###

### MOBILITY PRINTING


mobility_dcat_calsses = [clazz for (clazz,) in g_mobility_dcat.query(mobility_dcat_unique_classes_with_properties_q)]

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
                                    initNs=dcat_ap_namespaces)
unique_subject = sparql.prepareQuery("""
    SELECT DISTINCT ?subject
    WHERE {
        ?subject ?p ?o .
    }
""",
                                     initNs=dcat_ap_namespaces)


def mobilitydcatap_fixes(graph):
    # There is probably a typo in the .ttl file. Should be capital 'M' as per https://mobilitydcat-ap.github.io/mobilityDCAT-AP/releases/index.html#properties-for-mobility-data-standard
    graph.remove((OWL.versionInfo, DCAM.domainIncludes, MOBILITYDCATAP.mobilityDataStandard))
    graph.add((OWL.versionInfo, DCAM.domainIncludes, MOBILITYDCATAP.MobilityDataStandard))


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


def get_graph_url(ns: URIRef, mime_types: str = 'application/rdf+xml, text/turtle') -> (str, str):
    headers = {'Accept': mime_types}
    r = httpx.get(str(ns), headers=headers, follow_redirects=True)
    # Some servers do not write content-type with capital letters
    content_type = r.headers['Content-Type'] or r.headers['content-type']
    return str(r.url), content_type


def download_graph(ns: URIRef) -> Graph:
    graph_url, _ = get_graph_url(ns)
    g = Graph()
    g.parse(graph_url)
    return g


shortened_identifier_p = re.compile('[a-zA-Z]+:[a-zA-Z]+')
local_identifier_p = re.compile('[a-zA-Z]+')
downloaded_graphs = {}


def is_property(po_dict):
    return (URIRef('http://www.w3.org/2000/01/rdf-schema#subPropertyOf') in po_dict or
            URIRef('http://www.w3.org/2000/01/rdf-schema#domain') in po_dict or
            URIRef('http://www.w3.org/2002/07/owl#DatatypeProperty') in po_dict.get(
                URIRef('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'), {}) or
            URIRef('http://www.w3.org/1999/02/22-rdf-syntax-ns#Property') in po_dict.get(
                URIRef('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'), {}))


def is_class(po_dict):
    return (URIRef('http://www.w3.org/2002/07/owl#Class') in po_dict.get(
        URIRef('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'), {}) or
            URIRef('http://www.w3.org/2000/01/rdf-schema#Class') in po_dict.get(
                URIRef('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'), {}))


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


def get_graph_for_iri(iri_referencing_graph: Graph, iri: URIRef) -> (str, Graph):
    try:
        ns_prefix, ns = \
            [(ns_prefix, ns) for (ns_prefix, ns) in iri_referencing_graph.namespaces() if URIRef(iri).startswith(ns)][0]
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
        g_spdx.parse('https://raw.githubusercontent.com/spdx/spdx-spec/development/v2.3/ontology/spdx-ontology.owl.xml',
                     format='application/rdf+xml')
        ns_graph = g_spdx
    elif str(ns_prefix) == 'locn':
        g_locn = Graph()
        g_locn.parse('https://semiceu.github.io/Core-Location-Vocabulary/releases/w3c/locn.rdf',
                     format='application/rdf+xml')
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


def ns_to_encoded(ns: str) -> str:
    ns_hashed = hashlib.md5(bytes(str(ns), 'utf-8'))
    return base64.b32encode(ns_hashed.digest()).decode("utf-8").replace('=', '')


def get_cached_file_path(ns: str) -> str:
    cached_file_name = ns_to_encoded(ns)
    file_abspath = os.path.abspath("./vocabularies/" + cached_file_name)
    files = glob.glob(file_abspath + '.*')
    if files:
        return files[0]


def is_local_file_created(ns: str):
    cached_file_name = ns_to_encoded(ns)
    file_abspath = os.path.abspath("./vocabularies/" + cached_file_name)

    if glob.glob(file_abspath + '.*'):
        return True
    return False


def create_cached_file(ns: str, format: Literal['rdf', 'ttl']) -> str:
    if is_local_file_created(ns):
        return get_cached_file_path(ns)
    else:
        cached_file_name = ns_to_encoded(ns)
        file_abspath = os.path.abspath("./vocabularies/" + cached_file_name + "." + format)
        pprint.pprint(f'Creating file {file_abspath}')
        file_dirname = os.path.dirname(file_abspath)
        if not os.path.isdir(file_dirname):
            os.makedirs(file_dirname)
        with open(file_abspath, 'w'):
            pass
        return file_abspath


def set_content_for_graph(graph: Graph) -> None:
    ns: URIRef = graph.identifier

    if is_local_file_created(ns):
        graph.parse(get_cached_file_path(ns))
        return
    # The namespaces in elif -clauses need some special handling as the content negotiation does not work
    if str(ns) == 'http://data.europa.eu/r5r/':
        # The above link won't lead to the serialized resource
        # ds.default_context.serialize(destination=mdcatap_file_name, format="xml")
        graph_url = dcat_ap_v_2_0_1_url
        serialization_format = 'rdf'
        graph.parse(graph_url)
    elif str(ns) == 'http://spdx.org/rdf/terms#':
        # The above link won't lead to the serialized resource
        graph_url = 'https://raw.githubusercontent.com/spdx/spdx-spec/development/v2.3/ontology/spdx-ontology.owl.xml'
        serialization_format = 'rdf'
        graph.parse(graph_url,
                    format='application/rdf+xml')
    elif str(ns) == 'http://www.w3.org/ns/locn#':
        # The above link won't lead to the serialized resource
        graph_url = 'https://semiceu.github.io/Core-Location-Vocabulary/releases/w3c/locn.rdf'
        serialization_format = 'rdf'
        graph.parse(graph_url,
                    format='application/rdf+xml')
    elif str(ns) == 'http://purl.org/vocab/vann/':
        # The above link won't lead to the serialized resource
        graph_url = 'https://vocab.org/vann/vann-vocab-20100607.rdf'
        serialization_format = 'rdf'
        graph.parse(graph_url, format='application/rdf+xml')
    elif str(ns) == 'http://www.w3.org/ns/adms#':
        # Links are broken atm
        return
    elif str(ns) == 'http://www.w3.org/1999/xhtml/vocab#':
        return
    elif str(ns) == 'http://creativecommons.org/ns#':
        # Couldn't find a serialized version
        return
    elif str(ns) == 'http://purl.org/linked-data/sdmx#':
        # The returned content-type header is set wrong to text/plain when it actually is Turtle
        graph_url, _ = get_graph_url(ns)
        serialization_format = 'ttl'
        graph.parse(graph_url, format='text/turtle')
    elif str(ns) == 'http://www.w3.org/TR/skos-primer/':
        # Couldn't find a serialized version
        return
    elif str(ns) == 'http://www.w3.org/2001/XMLSchema#':
        return
    elif str(ns) == 'http://www.w3.org/XML/1998/namespace':
        return
    elif str(ns) == 'http://purl.org/linked-data/cube#':
        # The returned content-type header is set wrong
        graph_url, _ = get_graph_url(ns)
        serialization_format = 'ttl'
        graph.parse(graph_url, format='text/turtle')
    elif str(ns) == 'http://purl.org/ontology/bibo/':
        # The returned content-type header is set wrong
        graph_url, _ = get_graph_url(ns)
        serialization_format = 'rdf'
        graph.parse(graph_url, format='application/rdf+xml')
    else:
        graph_url, mime_format = get_graph_url(ns)
        serialization_format = 'ttl' if mime_format == 'text/turtle' else 'rdf'
        graph.parse(graph_url)

    cached_file = create_cached_file(ns, serialization_format)
    # graph.serialize(graph)
    r = httpx.get(graph_url,
                  headers={'Accept': 'text/turtle' if serialization_format == 'ttl' else 'application/rdf+xml'})
    with open(cached_file, "w") as file:
        file.write(r.text)


def enrich_po_dict(subject, po_dict, graph, ns_prefix):
    try:
        defined_by_ns_prefix_list = [ns_prefix for (ns_prefix, ns) in graph.namespaces() if
                                     (get_is_defined_by(po_dict) or "").startswith(ns)]
        if len(defined_by_ns_prefix_list) == 0:
            defined_by_ns_prefix = None
        else:
            defined_by_ns_prefix = defined_by_ns_prefix_list[0]
    except IndexError:
        return (None, None)
    return {
        'po_dict': po_dict,
        'type': 'property' if is_property(po_dict) else ('class' if is_class(po_dict) else 'other'),
        'domain': get_domains(po_dict) if is_property(po_dict) else None,
        'ns_prefix': defined_by_ns_prefix,
        'used_by': ns_prefix,
        'directly_used_by': graph[subject] is not None
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
            else:
                origin_graph_po_dict = {}
            graph_subject_p_o = graph.predicate_objects(subject)
            graph_po_dict = po_tuples_to_po_dict(graph, graph_subject_p_o, origin_graph_po_dict)
            enriched_dict[subject] = enrich_po_dict(subject, graph_po_dict, graph, ns_prefix)
    return enriched_dict


mobilitydcatap_fixes(g_mobility_dcat)


# dcat_ap_words = classes_properties(g_dcat_ap, 'dcatap')
# mobility_dcat_words = classes_properties(g_mobility_dcat, 'mobilitydcatap')

# dcat_ap_words_classes = {k for k,v in dcat_ap_words.items() if v['type'] == 'class'}
# mobility_dcat_words_classes = {k for k,v in mobility_dcat_words.items() if v['type'] == 'class'}

# def mobilitydcatap_classes():
#    {k for k,v in mobility_dcat_words.items() if v['type'] == 'class'}

def populate_dataset(ds: Dataset, namespace: Namespace) -> None:
    if not [context for context in ds.contexts() if context.identifier == URIRef(namespace)]:
        g = ds.graph(namespace)
        set_content_for_graph(g)


def populate_mobility_graph():
    # Add dcat-ap triples that are defined in the mobilityDCAT-AP document in order to conform to DCAT-AP
    # _, g_foaf = get_graph_for_iri(g_mobility_dcat, FOAF.Agent)
    #    _, g_rdfs = get_graph_for_iri(g_mobility_dcat, RDFS.Class)
    #   ds.add_graph(g_rdfs)
    # ds.add_graph(g_foaf)
    g_foaf = ds.graph(FOAF._NS)
    set_content_for_graph(g_foaf)
    # for triple in g_rdfs.triples((RDFS.label, None, None)):
    populate_dataset(ds, RDF._NS)
    populate_dataset(ds, RDFS._NS)
    populate_dataset(ds, SKOS._NS)


#            ds.add(triple)
# ds.add((FOAF.Agent, FOAF.name, RDFS.Literal))


# populate_mobility_graph()

for _, namespace in mobility_dcat_namespaces.items():
    if isinstance(namespace, Namespace):
        ns = namespace
    else:
        ns = namespace._NS
    if not isinstance(ns, Namespace):
        raise ValueError('Foo')
    populate_dataset(ds, ns)

clazz_pred = {}

default_graph = ''

from abc import ABC, abstractmethod


class Resource(ABC):
    def __eq__(self, other):
        if other is None:
            return False
        if not isinstance(other, RDFSProperty):
            return False
        if str(self.iri) == str(other.iri):
            return True
        else:
            return False

    def __hash__(self):
        return hash(str(self.iri))

    @property
    @abstractmethod
    def type(self):
        pass

    @abstractmethod
    def value(self):
        """
        This method should return the referent of an IRI or literal value of a literal
        """
        pass

    @classmethod
    @abstractmethod
    def from_ds(cls, iri: URIRef, ds: Dataset) -> Resource:
        pass

    @staticmethod
    def ns_from_iri(iri: URIRef):
        """
        TODO: Have a more sensible way to get the namespace than checking some random list.
              Should probably find a better place for this method anyway
        """
        for known_namespace in mobility_dcat_namespaces.values():
            if isinstance(known_namespace, Namespace):
                ns = known_namespace
            else:
                ns = known_namespace._NS
            if iri in ns:
                return ns



class IRIResource(Resource):
    def __init__(self, namespace: Namespace, iri: URIRef, types: Tuple[URIRef, ...],
                 additional_properties: Dict[URIRef, Tuple[Tuple[str, Namespace]]] = None) -> None:
        if (namespace is None or
                iri is None):
            raise ValueError('Cannot create a resource without namespace or iri')
        if not types:
            raise ValueError(f'Minimum of one type must be provided for {iri}')
        self.namespace = namespace
        self.iri = iri
        self.types = types
        self.additional_properties = additional_properties

    def value(self):
        return self.iri

    @property
    def type(self):
        return self.types

    @classmethod
    def from_ds(cls, iri, ds: Dataset) -> IRIResource:
        namespace, iri, types = IRIResource.resource_args_from_ds(iri, ds)
        return IRIResource(namespace, iri, types)

    @staticmethod
    def create_resource_(resource_ref: URIRef | Literal, ds: Dataset) -> Resource:
        if isinstance(resource_ref, Literal):
            return RDFSLiteral(resource_ref)
        namespace, iri, types = IRIResource.resource_args_from_ds(resource_ref, ds)
        if RDFS.Class in types:
            return RDFSResource.from_ds(iri, ds)
        elif RDF.Property in types:
            return RDFSProperty.from_ds(iri, ds)
        else:
            raise ValueError(f'Could not create a resource from iri {iri}')

    @staticmethod
    def resource_args_from_ds(iri: URIRef, ds: Dataset) -> (Namespace, URIRef, Tuple[URIRef]):
        namespace = Resource.ns_from_iri(iri)
        g = ds.get_graph(URIRef(namespace))
        return namespace, iri, tuple(URIRef(node) for node in g.objects(iri, RDF.type))

    def turtle_format(self, p_o_tuples: Tuple[(URIRef, Tuple[Any, ...]), ...]):
        spaces_s = "   " + " " * len(str(self.iri))
        linesep = ";" + os.linesep + spaces_s
        types_str = ("," + os.linesep + spaces_s + "  ").join(self.types) + linesep

        def objects_list_as_string(predicate: URIRef, objects: Tuple[str, ...]) -> str:
            spaces_p = "   " + " " * len(str(predicate))
            return ("," + os.linesep + spaces_s + spaces_p).join(
                map(lambda o: ("<" + o + ">") if isinstance(o, IRIResource) else str(o),
                    objects))

        def additional_objects_list_as_string(predicate: URIRef, objects: Tuple[Tuple[str, namespace], ...]) -> str:
            spaces_p = "   " + " " * len(str(predicate))
            return ("," + os.linesep + spaces_s + spaces_p).join(
                map(lambda o: ("<" + o[0].iri + ">") if isinstance(o[0], IRIResource) else str(o[0]) + ' (' + str(o[1]) + ')',
                    objects))

        given_properties = map(
            lambda p_o: '''<{predicate}> {objects}'''.format(predicate=p_o[0], objects=objects_list_as_string(*p_o)),
            filter(
                lambda p_o: p_o[1],
                p_o_tuples))
        additional_properties = map(
            lambda p_o: '''<{predicate}> {objects}'''.format(predicate=p_o[0], objects=additional_objects_list_as_string(*p_o)),
            self.additional_properties.items())
        return '''<{subject}> a {types}{properties}{additional_properties} .\
        '''.format(subject=self.iri,
                   types=types_str,
                   properties=linesep.join(given_properties),
                   additional_properties=linesep.join(additional_properties))


class RDFSLiteral(Resource):
    def __init__(self, literal: Literal):
        self.literal = literal

    def value(self):
        return self.literal.value

    @property
    def type(self):
        return self.literal.datatype

    @classmethod
    def from_ds(cls, iri: URIRef, ds: Dataset) -> Resource:
        pass


class BlankNode(Resource):
    def __init__(self):
        self.values = []
        self.skolem_iri = ""

    def value(self):
        self.values


class RDFSResource(IRIResource):
    def __init__(self, namespace: Namespace, iri: URIRef, types: Tuple[URIRef, ...],
                 additional_properties: Dict[URIRef, List[Tuple[str, Namespace]]] = None,
                 label: Tuple[RDFSLiteral, ...] = None, comment: Tuple[RDFSLiteral, ...] = None,
                 see_also: Tuple[Resource, ...] = None, is_defined_by: Tuple[Resource, ...] = None, member: Tuple[Resource, ...] = None):
        super().__init__(namespace, iri, types, additional_properties = additional_properties)
        self.label = label
        self.comment = comment
        self.see_also = see_also
        self.is_defined_by = is_defined_by
        self.member = member

    def __str__(self):
        return self.turtle_format((
            (RDFS.label, self.label),
            (RDFS.comment, self.comment),
            (RDFS.seeAlso, self.see_also),
            (RDFS.isDefinedBy, self.is_defined_by),
            (RDFS.member, self.member)
        ))

    @classmethod
    def from_ds(cls, iri, ds: Dataset) -> RDFSResource:
        return iri_resource_factory(cls, iri, ds,
                                                label=RDFS.label,
                                                comment=RDFS.comment,
                                                see_also=RDFS.seeAlso,
                                                is_defined_by=RDFS.isDefinedBy,
                                                member=RDFS.member)


class RDFSClass(RDFSResource):
    def __init__(self, namespace: Namespace, iri: URIRef, types: Tuple[URIRef, ...],
                 additional_properties: Dict[URIRef, List[Tuple[str, Namespace]]] = None,
                 label: Tuple[RDFSLiteral, ...] = None, comment: Tuple[RDFSLiteral, ...] = None,
                 see_also: Tuple[Resource, ...] = None, is_defined_by: Tuple[Resource, ...] = None, member: Tuple[Resource, ...] = None,
                 sub_class_of: Tuple[IRIResource, ...] = None):
        super().__init__(namespace, iri, types, additional_properties=additional_properties,
                         label=label, comment=comment, see_also=see_also, is_defined_by=is_defined_by,
                         member=member)
        if RDFS.Class not in types:
            raise ValueError(f'Trying to create an RDFSClass without specifying it as a Class type')
        self.sub_class_of = sub_class_of

    def __str__(self):
        return self.turtle_format((
            (RDFS.label, self.label),
            (RDFS.comment, self.comment),
            (RDFS.seeAlso, self.see_also),
            (RDFS.isDefinedBy, self.is_defined_by),
            (RDFS.member, self.member),
            (RDFS.subClassOf, self.sub_class_of)
        ))

    @classmethod
    def from_ds(cls, iri, ds: Dataset) -> RDFSClass:
        return iri_resource_factory(cls, iri, ds,
                                                label=RDFS.label,
                                                comment=RDFS.comment,
                                                see_also=RDFS.seeAlso,
                                                is_defined_by=RDFS.isDefinedBy,
                                                member=RDFS.member,
                                                sub_class_of=RDFS.subClassOf)


class RDFSProperty(RDFSResource):
    def __init__(self, namespace: Namespace, iri: URIRef, types: Tuple[URIRef, ...],
                 additional_properties: Dict[URIRef, List[Tuple[str, Namespace]]] = None,
                 label: Tuple[RDFSLiteral, ...] = None, comment: Tuple[RDFSLiteral, ...] = None,
                 see_also: Tuple[Resource, ...] = None, is_defined_by: Tuple[Resource, ...] = None, member: Tuple[Resource, ...] = None,
                 domain: Tuple[Resource, ...] = None, range: Tuple[Resource, ...] = None,
                 sub_property_of: Tuple[RDFSProperty, ...] = None):
        super().__init__(namespace, iri, types, additional_properties=additional_properties,
                         label=label, comment=comment, see_also=see_also, is_defined_by=is_defined_by,
                         member=member)
        if RDF.Property not in types:
            pass
            # raise ValueError(f'Trying to create an RDFSProperty without specifying it as a Property type')
        self.domain = domain
        self.range = range
        self.sub_property_of = sub_property_of

    def __str__(self):
        return self.turtle_format((
            (RDFS.label, self.label),
            (RDFS.comment, self.comment),
            (RDFS.seeAlso, self.see_also),
            (RDFS.isDefinedBy, self.is_defined_by),
            (RDFS.member, self.member),
            (RDFS.domain, self.domain),
            (RDFS.range, self.range),
            (RDFS.subPropertyOf, self.sub_property_of)
        ))

    @classmethod
    def from_ds(cls, iri, ds: Dataset) -> RDFSProperty:
        return iri_resource_factory(cls, iri, ds,
                                                label=RDFS.label,
                                                comment=RDFS.comment,
                                                see_also=RDFS.seeAlso,
                                                is_defined_by=RDFS.isDefinedBy,
                                                member=RDFS.member,
                                                domain=RDFS.domain,
                                                range=RDFS.range,
                                                sub_property_of=RDFS.subPropertyOf)


class ClassPropertiesAggregator:
    def __init__(self, clazz: RDFSClass, property_objects: Dict[RDFSProperty, List[Tuple[Resource, Namespace]]]):
        self.clazz = clazz
        self.property_objects = property_objects

    @classmethod
    def from_ds(cls, clazz: RDFSClass, ds: Dataset) -> ClassPropertiesAggregator:
        class_properties: Dict[URIRef, List[Tuple[str, Namespace]]] = {}
        for _, p, o, g_identifier in ds.quads((clazz.iri, None, None, None)):
            if isinstance(p, URIRef):
                existing_property = class_properties.get(p)
                new_object = (o, Namespace(g_identifier) if g_identifier is not None else None)
                if existing_property is not None:
                    existing_property.append(new_object)
                else:
                    class_properties[property] = [new_object]

                #property = RDFSProperty.from_ds(p, ds)
                #existing_property = class_properties.get(property)
                #if p == RDFS.isDefinedBy:
                #    # For some reason, isDefinedBy has a wrong value when read by rdflib
                #    obj = Literal(str(o))
                #else:
                #    obj = o
                #new_object = (ClassPropertiesAggregator.create_resource_(obj, ds), Namespace(g_identifier) if g_identifier is not None else None)
                #if existing_property is not None:
                #    existing_property.append(new_object)
                #else:
                #    class_properties[property] = [new_object]
            else:
                raise ValueError('''
                Predicate was not a URIRef. Instead;
                type={type}
                value={value}\
                '''.format(type=type(p), value=p))
        return cls(clazz, class_properties)

    @staticmethod
    def create_resource_(resource_ref: URIRef | Literal, ds: Dataset) -> Resource:
        if isinstance(resource_ref, Literal):
            return RDFSLiteral(resource_ref)
        namespace, iri, types = IRIResource.resource_args_from_ds(resource_ref, ds)
        if RDFS.Class in types:
            return RDFSResource.from_ds(iri, ds)
        elif RDF.Property in types:
            return RDFSProperty.from_ds(iri, ds)
        else:
            raise ValueError(f'Could not create a resource from iri {iri}')

    def __str__(self):
        spaces = '    '
        return '''<{class_iri}>
{spaces}{properties}'''.format(class_iri=self.clazz.iri,
                               properties=(os.linesep + spaces).join(set(map(lambda p_os: "<" +  str(p_os[0].iri) + ">" + (os.linesep + spaces * 2).join(map(lambda r_n: str(r_n[0].value()) + " (" + r_n[1] + ")", p_os[1])), self.property_objects.items()))),
                               spaces=spaces)

    def get_property_objects(self):
        pass


def iri_resource_factory(cls, iri, ds: Dataset, **kwargs):
    """
    TODO: Kato tälle funkkarille parempi paikka
    """
    namespace, iri, types = IRIResource.resource_args_from_ds(iri, ds)
    g = ds.get_graph(URIRef(namespace))

    defined_constructor_arguments = {}
    additional_properties: Dict[RDFSProperty, List[Tuple[URIRef, Namespace]]] = {}

    for arument_label, predicate in kwargs.items():
        defined_constructor_arguments[arument_label] = tuple(v for v in g.objects(iri, predicate))

    for _, p, o, g_identifier in ds.quads((iri, None, None, None)):
        if isinstance(p, URIRef):
            is_in_defined_constructor_arguments = (str(g_identifier) == str(namespace) and
                                                   p in kwargs.values())
            if not is_in_defined_constructor_arguments:
                existing_property = additional_properties.get(p)
                new_object = (o, Namespace(g_identifier) if g_identifier is not None else None)
                if existing_property is not None:
                    existing_property.append(new_object)
                else:
                    additional_properties[p] = [new_object]

                # property = RDFSProperty.from_ds(p, ds)
                # existing_property = additional_properties.get(property)
                # if p == RDFS.isDefinedBy:
                #     # For some reason, isDefinedBy has a wrong value when read by rdflib
                #     obj = Literal(str(o))
                # else:
                #     obj = o
                # new_object = (IRIResource.create_resource_(obj, ds), Namespace(g_identifier) if g_identifier is not None else None)
                # if existing_property is not None:
                #     existing_property.append(new_object)
                # else:
                #     additional_properties[property] = [new_object]
        else:
            raise ValueError('''
                Predicate was not a URIRef. Instead;
                type={type}
                value={value}\
                '''.format(type=type(p), value=p))

    return cls(namespace, iri, types, additional_properties=(None if not additional_properties else {k: tuple(v) for k, v in additional_properties.items()}), **defined_constructor_arguments)

# foobar = RDFSResource.from_ds(FOAF.Agent, ds)
# clazz=RDFSClass.from_ds(FOAF.Agent, ds)
clazz = RDFSClass.from_ds(DCAT.Distribution, ds)

print("ADSF")

# for triple in ds.get_graph(URIRef(DCT)).triples((DCT.identifier, None, None)):
#    print(triple)

#foobar = ClassPropertiesAggregator.from_ds(clazz, ds)
# pprint.pprint(type(ds.get_graph(URIRef(FOAF._NS))))
# pprint.pprint(URIRef(FOAF._NS))
print("clazz #########")
print(clazz)
print("SDPOFH ###########")
#print(str(foobar))
# for x in ds.contexts():
#    pprint.pprint(x.identifier)

# for s, p, o, gra in ds.quads((None, None, None, None)):
#     if URIRef(MOBILITYDCATAP_NS_URL) == gra:
#         if (p == RDF.type and
#            (o == RDFS.Class or o == OWL.Class)):
#             pprint.pprint(f'{s} {p} {o} {gra}')
#     if URIRef(FOAF._NS) == gra:
#         for triple in g_foaf.triples((FOAF.Agent, None, None)):
#                 g_mobility_dcat.add(triple)
#             for triple in g_foaf.triples((FOAF.name, None, None)):
#                 g_mobility_dcat.add(triple)

# for q in ds.quads((None, None, None, ds.default_context)):
#    pprint.pprint(q)

# mdcatap_file_name = os.path.abspath("./tmp/mdcatap.rdf")
#
# if not os.path.exists(mdcatap_file_name):
#     pprint.pprint(f'Creating file {mdcatap_file_name}')
#     mdcatap_file_dirname = os.path.dirname(mdcatap_file_name)
#     if not os.path.isdir(mdcatap_file_dirname):
#         os.makedirs(mdcatap_file_dirname)
#     with open(mdcatap_file_name, 'w'): pass

# foobaz = os.path.abspath("./vocabularies") + '/'
# owlready2.onto_path.append(foobaz)
# owlready2.PREDEFINED_ONTOLOGIES["http://www.w3.org/2000/01/rdf-schema#"]=foobaz + 'rdf-schema.rdf'

# ds.default_context.serialize(destination=mdcatap_file_name, format="xml")
# onto = owlready2.get_ontology(f'file://{mdcatap_file_name}').load()
#
# for clazz in onto.classes():
#     pprint.pprint(clazz)
# for clazz in onto.classes():
#     if clazz.iri == str(FOAF.Agent):
#         pprint.pprint("###### FOAF AGENT ######")
#         pprint.pprint(clazz)
#         pprint.pprint(clazz.get_class_properties())
#         pprint.pprint(clazz.get_name(clazz))
#         pprint.pprint(onto["0.1.Agent"])
#         pprint.pprint(onto["Agent"])
#         pprint.pprint(onto[clazz])
#         pprint.pprint(onto.world[str(FOAF.Agent)])
#         pprint.pprint(onto.world[str(FOAF.Agent)].get_class_properties())
#         pprint.pprint(vars(list(onto.world[str(FOAF.Agent)].get_class_properties())[0]))
#         for prop in onto.world[str(FOAF.Agent)].get_class_properties():
#             pprint.pprint(prop)
#             pprint.pprint(prop.get_domain())
#             pprint.pprint(vars(prop))
# foobar = 'file://' + os.path.abspath("./vocabularies") + '/rdf-schema.rdf'
# pprint.pprint("RDF SCHEMA")
# pprint.pprint(os.path.isabs(foobaz))
# pprint.pprint(owlready2.onto_path)
# pprint.pprint(foobar)
# rdf_s_onto = owlready2.get_ontology(foobar).load()
#
# #rdf_s_onto = owlready2.get_ontology(foobar).load()
# pprint.pprint(rdf_s_onto)
# pprint.pprint(type(rdf_s_onto))

# for clazz in rdf_s_onto.world.as_rdflib_graph().triples((RDFS.Class, None, None)):
#    pprint.pprint(clazz)
