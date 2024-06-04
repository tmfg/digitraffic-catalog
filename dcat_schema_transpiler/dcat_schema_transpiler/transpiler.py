from __future__ import annotations
from rdflib import Dataset, Graph, Namespace, URIRef, Literal, BNode
from rdflib.namespace import DefinedNamespace, RDF, RDFS, DCTERMS, XSD, DCAM, DCAT, FOAF, VANN, OWL, QB, SKOS
from rdflib.plugins import sparql
from typing import List, Type, TypeVar, Any
import httpx
import re
import hashlib
import owlready2
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


def get_graph_url(ns: URIRef, mime_types: str = 'application/rdf+xml, text/turtle') -> str:
    headers = {'Accept': mime_types}
    r = httpx.get(str(ns), headers=headers, follow_redirects=True)
    return str(r.url)


def download_graph(ns: URIRef) -> Graph:
    graph_url = get_graph_url(ns)
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


def set_content_for_graph(graph: Graph) -> None:
    ns: URIRef = graph.identifier
    # The namespaces in elif -clauses need some special handling as the content negotiation does not work
    if str(ns) == 'http://data.europa.eu/r5r/':
        graph.parse(dcat_ap_v_2_0_1_url)
    elif str(ns) == 'http://spdx.org/rdf/terms#':
        graph.parse('https://raw.githubusercontent.com/spdx/spdx-spec/development/v2.3/ontology/spdx-ontology.owl.xml',
                    format='application/rdf+xml')
    elif str(ns) == 'http://www.w3.org/ns/locn#':
        graph.parse('https://semiceu.github.io/Core-Location-Vocabulary/releases/w3c/locn.rdf',
                    format='application/rdf+xml')
    elif str(ns) == 'http://purl.org/vocab/vann/':
        graph.parse('https://vocab.org/vann/vann-vocab-20100607.rdf', format='application/rdf+xml')
    else:
        graph_url = get_graph_url(ns, 'application/rdf+xml')
        graph.parse(graph_url)


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


#            ds.add(triple)
# ds.add((FOAF.Agent, FOAF.name, RDFS.Literal))


populate_mobility_graph()

clazz_pred = {}

default_graph = ''

for gra in ds.graphs():
    pprint.pprint(gra.identifier)
    if gra.namespace_manager is None:
        pprint.pprint(gra.identifier)
        default_graph = gra

from abc import ABC, abstractmethod


class Resource(ABC):
    @abstractmethod
    def __init__(self, namespace: Namespace, iri: URIRef, types: List[URIRef]):
        if (namespace is None or
                iri is None):
            raise ValueError('Cannot create a resource without namespace or iri')
        if not types:
            raise ValueError(f'Minimum of one type must be provided for {iri}')
        self.namespace = namespace
        self.iri = iri
        self.types = types

    @property
    @abstractmethod
    def type(self):
        """
        The rdf:Property value
        """
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
        TODO: Have a more sensible way to get the namespace than checking some random list
        """
        for known_namespace in dcat_ap_namespaces.values():
            if iri in known_namespace._NS:
                return known_namespace._NS

    @staticmethod
    def resource_args_from_ds(iri: URIRef, ds: Dataset) -> (Namespace, URIRef, List[URIRef]):
        namespace = Resource.ns_from_iri(iri)
        g = ds.get_graph(URIRef(namespace))
        return (namespace, iri, [URIRef(node) for node in g.objects(iri, RDF.type)])

class IRIResource(Resource):
    def __init__(self, namespace: Namespace, iri: URIRef, types: List[URIRef]) -> None:
        super().__init__(namespace, iri, types)

    def value(self):
        return self.iri

    @property
    def type(self):
        return self.types

    @classmethod
    def from_ds(cls, iri, ds: Dataset) -> IRIResource:
        namespace, iri, types = Resource.resource_args_from_ds(iri, ds)
        return IRIResource(namespace, iri, types)

    @staticmethod
    def iri_resource_factory(cls, iri, ds: Dataset, **kwargs):
        namespace, iri, types = Resource.resource_args_from_ds(iri, ds)
        g = ds.get_graph(URIRef(namespace))

        constructor_arguments = {}

        for arument_label, predicate in kwargs.items():
            constructor_arguments[arument_label] = [v for v in g.objects(iri, predicate)]
        return cls(namespace, iri, types, **constructor_arguments)

    def turtle_format(self, p_o_tuples: List[(URIRef, List[Any])]):
        linesep = ";" + os.linesep + "   " + " " * len(str(self.iri))

        def objects_list_as_string(objects: List[str]) -> str:
            return ("," + os.linesep).join(
                map(lambda o: ("<" + o + ">") if isinstance(o, IRIResource) else str(o),
                    objects))
        given_properties = map(
            lambda p_o: '''<{predicate}> {objects}'''.format(predicate=p_o[0], objects=objects_list_as_string(p_o[1])),
            filter(
                lambda p_o: p_o[1],
                p_o_tuples))
        return '''<{subject}> a {types}{properties} .\
        '''.format(subject=self.iri, types=(", ".join(self.types) + linesep), properties=linesep.join(given_properties))


class Literal(Resource):
    def __init__(self, namespace: Namespace, iri: URIRef, types: List[URIRef], literal_value):
        super().__init__(namespace, iri, types)
        self.literal_value = literal_value

    def value(self):
        return self.literal_value


class BlankNode(Resource):
    def __init__(self):
        self.values = []
        self.skolem_iri = ""

    def value(self):
        self.values


class RDFSResource(IRIResource):
    def __init__(self, namespace: Namespace, iri: URIRef, types: List[URIRef],
                 label: List[Literal] = None, comment: List[Literal] = None,
                 see_also: List[Resource] = None, is_defined_by: List[Resource] = None, member: List[Resource] = None):
        super().__init__(namespace, iri, types)
        self.label = label
        self.comment = comment
        self.see_also = see_also
        self.is_defined_by = is_defined_by
        self.member = member

    def __str__(self):
        return self.turtle_format([
            (RDFS.label, self.label),
            (RDFS.comment, self.comment),
            (RDFS.seeAlso, self.see_also),
            (RDFS.isDefinedBy, self.is_defined_by),
            (RDFS.member, self.member)
        ])

    @classmethod
    def from_ds(cls, iri, ds: Dataset) -> RDFSResource:
        return IRIResource.iri_resource_factory(cls, iri, ds,
                                         label = RDFS.label,
                                         comment = RDFS.comment,
                                         see_also = RDFS.seeAlso,
                                         is_defined_by = RDFS.isDefinedBy,
                                         member = RDFS.member)


class RDFSClass(RDFSResource):
    def __init__(self, namespace: Namespace, iri: URIRef, types: List[URIRef],
                 label: Literal = None, comment: Literal = None,
                 see_also: Resource = None, is_defined_by: Resource = None, member: Resource = None,
                 sub_class_of: IRIResource=None):
        super().__init__(namespace, iri, types,
                         label=label, comment=comment, see_also=see_also, is_defined_by= is_defined_by,
                         member=member)
        if RDFS.Class not in types:
            raise ValueError(f'Trying to create an RDFSClass without specifying it as a Class type')
        self.sub_class_of = sub_class_of

    def __str__(self):
        return self.turtle_format([
            (RDFS.label, self.label),
            (RDFS.comment, self.comment),
            (RDFS.seeAlso, self.see_also),
            (RDFS.isDefinedBy, self.is_defined_by),
            (RDFS.member, self.member),
            (RDFS.subClassOf, self.sub_class_of)
        ])

    @classmethod
    def from_ds(cls, iri, ds: Dataset) -> RDFSResource:
        return IRIResource.iri_resource_factory(cls, iri, ds,
                                                label = RDFS.label,
                                                comment = RDFS.comment,
                                                see_also = RDFS.seeAlso,
                                                is_defined_by = RDFS.isDefinedBy,
                                                member = RDFS.member,
                                                sub_class_of = RDFS.subClassOf)

class RDFSProperty(RDFSResource):
    def __init__(self, namespace: URIRef, iri: URIRef, label: Literal = None, comment: Literal = None,
                 range: Resource = None,
                 domain: Resource = None, subPropertyOf: RDFSProperty = None):
        super().__init__(namespace, iri)
        self.label = label
        self.comment = comment
        self.range = range
        self.domain = domain
        self.subPropertyOf = subPropertyOf


class ClassPropertiesAggregator:
    def __init__(self, clazz: RDFSResource, properties: List[RDFSProperty]):
        self.clazz = clazz
        self.properties = properties

    @classmethod
    def from_graph(cls, resource: IRIResource, graph: Graph):
        for triple in graph.triples((resource.iri, None, None)):
            pass


foobar = RDFSResource.from_ds(FOAF.Agent, ds)
# pprint.pprint(type(ds.get_graph(URIRef(FOAF._NS))))
# pprint.pprint(URIRef(FOAF._NS))
print(str(foobar))
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
