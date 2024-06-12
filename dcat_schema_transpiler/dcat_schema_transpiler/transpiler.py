from __future__ import annotations
from rdflib import Dataset, Graph, Namespace, URIRef, Literal, BNode
from rdflib.namespace import DefinedNamespace, RDF, RDFS, DCTERMS, XSD, DCAM, DCAT, FOAF, VANN, OWL, QB, SKOS, ORG, PROV
from typing import List, Any, Dict, Tuple, Set
from abc import ABC, abstractmethod
import httpx
import hashlib
import glob
import base64
import pprint
import os
import yaml

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

CVOCAB_MOBILITY_THEME = Namespace('https://w3id.org/mobilitydcat-ap/mobility-theme/')
CVOCAB_THEME = Namespace('http://publications.europa.eu/resource/authority/data-theme/')

CVOCAB_FORMAT = Namespace('http://publications.europa.eu/resource/authority/file-type/')
CVOCAB_MOBILITY_DATA_STANDARD = Namespace('https://w3id.org/mobilitydcat-ap/mobility-data-standard/')
CVOCAB_GRAMMAR = Namespace('https://w3id.org/mobilitydcat-ap/grammar/')
CVOCAB_APPLICATION_LAYER_PROTOCOL = Namespace('https://w3id.org/mobilitydcat-ap/application-layer-protocol/')
CVOCAB_COMMUNICATION_METHOD = Namespace('https://w3id.org/mobilitydcat-ap/communication-method/')
CVOCAB_RIGHTS_STATEMENT_TYPE = Namespace('https://w3id.org/mobilitydcat-ap/conditions-for-access-and-usage/')
CVOCAB_LICENSE_IDENTIFIER = Namespace('http://publications.europa.eu/resource/authority/licence/')


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

def mobilitydcatap_fixes(graph):
    # There is probably a typo in the .ttl file. Should be capital 'M' as per https://mobilitydcat-ap.github.io/mobilityDCAT-AP/releases/index.html#properties-for-mobility-data-standard
    graph.remove((OWL.versionInfo, DCAM.domainIncludes, MOBILITYDCATAP.mobilityDataStandard))
    graph.add((OWL.versionInfo, DCAM.domainIncludes, MOBILITYDCATAP.MobilityDataStandard))

    # DCAT or DCAT-AP has in comments that the following properties are part of some class. Here we add a property that states the fact
    graph.add((DCTERMS.format, DCAM.domainIncludes, DCAT.Distribution))
    graph.add((DCT.rights, DCAM.domainIncludes, DCAT.Distribution))
    graph.add((DCT.description, DCAM.domainIncludes, DCAT.Distribution))
    graph.add((DCT.license, DCAM.domainIncludes, DCAT.Distribution))
    graph.add((DCAT.accessService, DCAM.domainIncludes, DCAT.Distribution))

    # Range chanages stated in the document but not visible in the serialized format
    graph.add((DCTERMS.format, DCAM.rangeIncludes, DCTERMS.MediaTypeOrExtent))
    graph.add((DCTERMS.description, DCAM.rangeIncludes, RDFS.Literal))

def add_property(ds: Dataset, graph_namespace: URIRef, property: URIRef):
    g = ds.get_graph(graph_namespace)
    propertys_graph = next(ds_g for ds_g in ds.graphs() if property.startswith(ds_g.identifier))

    for triple in propertys_graph.triples((property, None, None)):
        g.add(triple)


def fill_mobilitydcatap_graph(ds: Dataset):
    ## Distribution
    distribution_property_iris = {DCAT.accessURL, DCTERMS.format, DCT.rights, DCT.description, DCT.license,
                                  DCAT.accessService, DCAT.downloadURL}
    period_of_time_property_iris = {DCAT.startDate, DCAT.endDate}
    for property_iri in distribution_property_iris:
        add_property(ds, URIRef(MOBILITYDCATAP._NS), property_iri)
    for property_iri in period_of_time_property_iris:
        add_property(ds, URIRef(MOBILITYDCATAP._NS), property_iri)


def get_graph_url(ns: URIRef, mime_types: str = 'application/rdf+xml, text/turtle') -> (str, str):
    headers = {'Accept': mime_types}
    r = httpx.get(str(ns), headers=headers, follow_redirects=True)
    # Some servers do not write content-type with capital letters
    content_type = r.headers['Content-Type'] or r.headers['content-type']
    return str(r.url), content_type


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

    # VOCABS
    elif str(ns) == 'http://publications.europa.eu/resource/authority/file-type/':
        graph_url = 'https://op.europa.eu/o/opportal-service/euvoc-download-handler?cellarURI=http%3A%2F%2Fpublications.europa.eu%2Fresource%2Fcellar%2Fa8fa2fcb-28d8-11ef-9290-01aa75ed71a1.0001.04%2FDOC_1&fileName=filetypes-skos.rdf'
        serialization_format = 'rdf'
        graph.parse(graph_url, format='application/rdf+xml')
    elif str(ns) == 'http://publications.europa.eu/resource/authority/licence/':
        graph_url = 'https://op.europa.eu/o/opportal-service/euvoc-download-handler?cellarURI=http%3A%2F%2Fpublications.europa.eu%2Fresource%2Fcellar%2Fab0e79f8-5c6c-11ee-9220-01aa75ed71a1.0001.03%2FDOC_1&fileName=licences-skos.rdf'
        serialization_format = 'rdf'
        graph.parse(graph_url, format='application/rdf+xml')
    elif str(ns) == 'https://w3id.org/mobilitydcat-ap/mobility-data-standard/':
        graph_url, _ = get_graph_url(ns)
        serialization_format = 'ttl'
        graph.parse(graph_url, format='text/turtle')
    elif str(ns) == 'https://w3id.org/mobilitydcat-ap/grammar/':
        graph_url, _ = get_graph_url(ns)
        serialization_format = 'ttl'
        graph.parse(graph_url, format='text/turtle')
    elif str(ns) == 'https://w3id.org/mobilitydcat-ap/application-layer-protocol/':
        graph_url, _ = get_graph_url(ns)
        serialization_format = 'ttl'
        graph.parse(graph_url, format='text/turtle')
    elif str(ns) == 'https://w3id.org/mobilitydcat-ap/communication-method/':
        graph_url, _ = get_graph_url(ns)
        serialization_format = 'ttl'
        graph.parse(graph_url, format='text/turtle')
    elif str(ns) == 'https://w3id.org/mobilitydcat-ap/conditions-for-access-and-usage/':
        graph_url, _ = get_graph_url(ns)
        serialization_format = 'ttl'
        graph.parse(graph_url, format='text/turtle')
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


mobilitydcatap_fixes(g_mobility_dcat)

controlled_vocabularies = [
    CVOCAB_FORMAT,
    CVOCAB_MOBILITY_DATA_STANDARD,
    CVOCAB_GRAMMAR,
    CVOCAB_APPLICATION_LAYER_PROTOCOL,
    CVOCAB_COMMUNICATION_METHOD,
    CVOCAB_RIGHTS_STATEMENT_TYPE,
    CVOCAB_LICENSE_IDENTIFIER
]

def populate_dataset(ds: Dataset, namespace: Namespace) -> None:
    if not [context for context in ds.contexts() if context.identifier == URIRef(namespace)]:
        g = ds.graph(namespace)
        set_content_for_graph(g)

for namespace in list(mobility_dcat_namespaces.values()) + controlled_vocabularies:
    if isinstance(namespace, Namespace):
        ns = namespace
    else:
        ns = namespace._NS
    if not isinstance(ns, Namespace):
        raise ValueError('Foo')
    populate_dataset(ds, ns)




class Resource(ABC):
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
        known_namespaces = set(mobility_dcat_namespaces.values())
        known_namespaces.add(MOBILITYDCATAP)
        for known_namespace in known_namespaces:
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
            raise ValueError('Minimum of one type must be provided for ' + iri)
        self.namespace = namespace
        self.iri = iri
        self.types = types
        self.additional_properties = additional_properties

    def __eq__(self, other):
        if other is None:
            return False
        if not isinstance(other, IRIResource):
            return False
        if self.is_iri(other.iri):
            return True
        else:
            return False

    def __hash__(self):
        return hash(str(self.iri))

    def value(self):
        return self.iri

    def is_iri(self, iri: URIRef) -> bool:
        return str(self.iri) == str(iri)

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

    def is_language_string(self) -> bool:
        return self.literal.language is not None

    def language(self) -> str:
        return self.literal.language


class BlankNode(Resource):
    def __init__(self):
        self.values = []
        self.skolem_iri = ""

    def value(self):
        self.values


class RDFSResource(IRIResource):
    def __init__(self, namespace: Namespace, iri: URIRef, types: Tuple[URIRef, ...],
                 additional_properties: Dict[URIRef, List[Tuple[URIRef|Literal, Namespace]]] = None,
                 label: Tuple[Literal, ...] = None, comment: Tuple[Literal, ...] = None,
                 see_also: Tuple[URIRef|Literal, ...] = None, is_defined_by: Tuple[URIRef|Literal, ...] = None,
                 member: Tuple[URIRef|Literal, ...] = None):
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

    def get_rdf_object(self, iri: URIRef, ds: Dataset) -> Tuple|None:
        if not isinstance(iri, URIRef):
            return None
        match iri:
            case RDF.type:
                return rdfs_class_tuple(self.types, ds)
            case RDFS.label:
                return rdfs_literal_tuple(self.label)
            case RDFS.comment:
                return rdfs_literal_tuple(self.comment)
            case RDFS.member:
                if self.member and isinstance(self.member[0], URIRef):
                    return rdfs_resource_tuple(self.member, ds)
                elif self.member and isinstance(self.member[0], Literal):
                    return rdfs_literal_tuple(self.member)
                else:
                    return ()
            case RDFS.seeAlso:
                if self.see_also and isinstance(self.see_also[0], URIRef):
                    return rdfs_resource_tuple(self.see_also, ds)
                elif self.see_also and isinstance(self.see_also[0], Literal):
                    return rdfs_literal_tuple(self.see_also)
                else:
                    return ()
            case RDFS.isDefinedBy:
                if self.is_defined_by and isinstance(self.is_defined_by[0], URIRef):
                    return rdfs_resource_tuple(self.is_defined_by, ds)
                elif self.is_defined_by and isinstance(self.is_defined_by[0], Literal):
                    return rdfs_literal_tuple(self.is_defined_by)
                else:
                    return ()
        additional_property = self.additional_properties.get(iri)
        if additional_property is None:
            return None
        if not additional_property:
            return ()
        ap = tuple(map(lambda v: v[0], additional_property))
        if isinstance(ap[0], URIRef):
            return rdfs_resource_tuple(ap, ds)
        elif isinstance(ap[0], Literal):
            return rdfs_literal_tuple(ap)
        return None

    def get_rdf_object_ns(self, resource: RDFSResource) -> Namespace|None:
        iri = resource.iri
        additional_property = self.additional_properties.get(iri)
        if additional_property is not None:
            resource_value = resource.value()
            return [namespace for v, namespace in additional_property if (v.value if isinstance(v, Literal) else v) == resource_value][0]
        for v in self.__dict__.values():
            if isinstance(v, tuple) and iri in v:
                return self.namespace
        return None



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
                 additional_properties: Dict[URIRef, List[Tuple[URIRef|Literal, Namespace]]] = None,
                 label: Tuple[Literal, ...] = None, comment: Tuple[Literal, ...] = None,
                 see_also: Tuple[URIRef|Literal, ...] = None, is_defined_by: Tuple[URIRef|Literal, ...] = None,
                 member: Tuple[URIRef|Literal, ...] = None,
                 sub_class_of: Tuple[URIRef, ...] = None):
        super().__init__(namespace, iri, types, additional_properties=additional_properties,
                         label=label, comment=comment, see_also=see_also, is_defined_by=is_defined_by,
                         member=member)
        # OWL.Class is a subclass of RDFS.Class
        if RDFS.Class not in types and OWL.Class not in types:
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

    def get_rdf_object(self, iri: URIRef, ds: Dataset):
        match iri:
            case RDFS.subClassOf:
                return rdfs_class_tuple(self.sub_class_of, ds)
            case _:
                return super().get_rdf_object(iri, ds)

    @classmethod
    def from_ds(cls, iri, ds: Dataset) -> RDFSClass:
        return iri_resource_factory(cls, iri, ds,
                                                label=RDFS.label,
                                                comment=RDFS.comment,
                                                see_also=RDFS.seeAlso,
                                                is_defined_by=RDFS.isDefinedBy,
                                                member=RDFS.member,
                                                sub_class_of=RDFS.subClassOf)


def rdfs_property_tuple(urirefs: Tuple[URIRef, ...], ds: Dataset) -> Tuple[RDFSProperty, ...]:
    return tuple(map(lambda p: RDFSProperty.from_ds(p, ds), urirefs))

def rdfs_class_tuple(urirefs: Tuple[URIRef, ...], ds: Dataset) -> Tuple[RDFSClass, ...]:
    return tuple(map(lambda c: RDFSClass.from_ds(c, ds), urirefs))

def rdfs_literal_tuple(literals: Tuple[Literal, ...]) -> Tuple[RDFSLiteral, ...]:
    return tuple(map(lambda l: RDFSLiteral(l), literals))

def rdfs_resource_tuple(urirefs: Tuple[URIRef, ...], ds: Dataset) -> Tuple[RDFSResource, ...]:
    return tuple(map(lambda r: RDFSResource.from_ds(r, ds), urirefs))


class RDFSProperty(RDFSResource):
    def __init__(self, namespace: Namespace, iri: URIRef, types: Tuple[URIRef, ...],
                 additional_properties: Dict[URIRef, List[Tuple[URIRef|Literal, Namespace]]] = None,
                 label: Tuple[Literal, ...] = None, comment: Tuple[Literal, ...] = None,
                 see_also: Tuple[URIRef|Literal, ...] = None, is_defined_by: Tuple[URIRef|Literal, ...] = None,
                 member: Tuple[URIRef|Literal, ...] = None,
                 domain: Tuple[URIRef, ...] = None, range: Tuple[URIRef, ...] = None,
                 sub_property_of: Tuple[URIRef, ...] = None):
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

    def get_rdf_object(self, iri: URIRef, ds: Dataset):
        match iri:
            case RDFS.domain:
                return rdfs_class_tuple(self.domain, ds)
            case RDFS.range:
                return rdfs_class_tuple(self.range, ds)
            case RDFS.subPropertyOf:
                return rdfs_property_tuple(self.sub_property_of, ds)
            case _:
                return super().get_rdf_object(iri, ds)

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
    def __init__(self, clazz: RDFSClass, properties: Set[RDFSProperty], properties_includes: Set[RDFSProperty]):
        self.clazz = clazz
        self.properties = properties
        self.properties_includes = properties_includes

    @classmethod
    def from_ds_with_graph(cls, clazz: RDFSClass, ds: Dataset, graph_namespace: URIRef) -> ClassPropertiesAggregator:
        properties: Set[RDFSProperty] = set()
        properties_includes: Set[RDFSProperty] = set()
        g = ds.get_graph(graph_namespace)
        for s, _, _ in g.triples((None, RDFS.domain, clazz.iri)):
            if (s, RDF.type, RDF.Property) in g:
                properties.add(RDFSProperty.from_ds(s, ds))
            elif (s, RDF.type, OWL.DatatypeProperty) in g:
                # Not exactly correct, ubt OWL.DatatypeProperty is a subclass of RDF Property
                properties.add(RDFSProperty.from_ds(s, ds))
            elif (s, RDF.type, OWL.ObjectProperty) in g:
                # Not exactly correct, ubt OWL.ObjectProperty is a subclass of RDF Property
                properties.add(RDFSProperty.from_ds(s, ds))
            else:
                raise ValueError('''
                Subject was not a Property. Instead;
                type={type}
                value={value}\
                '''.format(type=type(s), value=s))
        for s, _, _ in g.triples((None, DCAM.domainIncludes, clazz.iri)):
            if (s, RDF.type, RDF.Property) in g:
                properties_includes.add(RDFSProperty.from_ds(s, ds))
            elif (s, RDF.type, OWL.DatatypeProperty) in g:
                # Not exactly correct, ubt OWL.DatatypeProperty is a subclass of RDF Property
                properties_includes.add(RDFSProperty.from_ds(s, ds))
            elif (s, RDF.type, OWL.ObjectProperty) in g:
                # Not exactly correct, ubt OWL.ObjectProperty is a subclass of RDF Property
                properties_includes.add(RDFSProperty.from_ds(s, ds))
            else:
                raise ValueError('''
                Subject was not a Property. Instead;
                type={type}
                value={value}\
                '''.format(type=type(s), value=s))
        return cls(clazz, properties, properties_includes)

    def __str__(self):
        spaces = '    '
        return '''<{class_iri}>
{spaces}PROPERTIES:
{spaces}{spaces}{properties}
{spaces}PROPERTIES INCLUDES:
{spaces}{spaces}{properties_includes}'''.format(class_iri=self.clazz.iri,
                               properties=(os.linesep + spaces*2).join(map(lambda p: "<" + str(p.iri) + ">", self.properties)),
                               properties_includes=(os.linesep + spaces*2).join(map(lambda p: "<" + str(p.iri) + ">", self.properties_includes)),
                               spaces=spaces)

    def get_property_objects(self):
        pass

class MobilityDCATAPToSchema:
    @staticmethod
    def fields_from_aggregator(cps: ClassPropertiesAggregator, ds: Dataset, graph_namespace: URIRef) -> List:
        if MobilityDCATAPToSchema.is_resource_class(cps.clazz):
            schema_fields = []
            for p in cps.properties | cps.properties_includes:
                # TODO: Warn if more than one range
                r = p.get_rdf_object(RDFS.range, ds) or ()
                if p.is_iri(DCTERMS.format):
                    # Check comments from https://mobilitydcat-ap.github.io/mobilityDCAT-AP/releases/index.html#distribution-format
                    r_includes = (RDFSClass.from_ds(DCTERMS.MediaTypeOrExtent, ds),)
                else:
                    r_includes = p.get_rdf_object(DCAM.rangeIncludes, ds) or ()
                obj = r + r_includes
                if not obj:
                    print("#### COULD NOT FIND AN OBJECT")
                    continue
                if p.is_iri(DCTERMS.identifier) and cps.clazz.is_iri(DCTERMS.LicenseDocument):
                    ## TODO: Vapaateksti pitäisi olla myös mahdollinen listan sijasta
                    rdf_range = [o for o in obj if o.is_iri(SKOS.Concept)][0]
                elif p.is_iri(ADMS['sample']) and cps.clazz.is_iri(DCAT.Distribution):
                    rdf_range = [o for o in obj if o.is_iri(RDFS.Resource)][0]
                else:
                    rdf_range = obj[0]
                if isinstance(rdf_range, RDFSResource) and rdf_range.iri == RDFS.Literal:
                    if cps.clazz.is_iri(DCTERMS.RightsStatement):
                        label_value = 'Additional information for access and usage'
                        field_name = 'rights_statement_label'
                    else:
                        label_value = MobilityDCATAPToSchema.get_label(p)
                        field_name = MobilityDCATAPToSchema.ckan_field(label_value)
                    schema_fields.append({
                        "field_name": field_name,
                        "label": label_value
                    })
                elif isinstance(rdf_range, RDFSResource) and rdf_range.iri == RDFS.Resource:
                    # Resurssi tyyppiset näyttää olevan URLeja
                    label_value = MobilityDCATAPToSchema.get_label(p)
                    schema_fields.append({
                        "field_name": MobilityDCATAPToSchema.ckan_field(label_value),
                        "label": label_value,
                        "help_text": 'The value should be URL'
                    })
                elif isinstance(rdf_range, RDFSResource) and rdf_range.iri == SKOS.Concept:
                    # SKOS.Concept tyyppiset on kontrolloituja sanastoja. RDF:llä ei saane tarkemmin tuota määritettyä.
                    # OWL:illa ehkä saisi
                    schema_fields.append(MobilityDCATAPToSchema.controlled_vocab_field(p, cps.clazz, ds))
                elif isinstance(rdf_range, RDFSResource) and rdf_range.iri == MOBILITYDCATAP.MobilityDataStandard:
                    # MobilityDataStandard has some special rules. It has a controlled vocabulary as an option
                    # but a custom schema should also be supported
                    label_value = MobilityDCATAPToSchema.get_label(p)
                    g_cvocab_mobility_data_standard = ds.get_graph(URIRef(CVOCAB_MOBILITY_DATA_STANDARD))
                    # TODO: Option for a custom schema
                    schema_fields.append({
                        "field_name": MobilityDCATAPToSchema.ckan_field(label_value),
                        "label": label_value,
                        "preset": "select",
                        "choices": MobilityDCATAPToSchema.vocab_choices(g_cvocab_mobility_data_standard)
                    })
                    version_resource = RDFSProperty.from_ds(OWL.versionInfo, ds)
                    label_value = MobilityDCATAPToSchema.get_label(version_resource)
                    schema_fields.append({
                        "field_name": MobilityDCATAPToSchema.ckan_field(label_value),
                        "label": label_value,
                        "help_text": 'Version of the mobility data standard. Use only short version identifiers, e.g., only  "3.2", without redundant acronyms such as "v", underscores etc.'
                    })
                elif isinstance(rdf_range, RDFSResource) and rdf_range.iri == DCTERMS.MediaTypeOrExtent:
                    schema_fields.append({
                        "field_name": "format",
                        "label": "Format",
                        "preset": "select",
                        "choices": MobilityDCATAPToSchema.vocab_choices(ds.get_graph(URIRef(CVOCAB_FORMAT)))
                    })
                else:
                    objects_aggregate = ClassPropertiesAggregator.from_ds_with_graph(rdf_range, ds, graph_namespace)
                    for field in MobilityDCATAPToSchema.fields_from_aggregator(objects_aggregate, ds, graph_namespace):
                        schema_fields.append(field)
            return schema_fields
        else:
            return []

    @staticmethod
    def get_label(p: RDFSProperty):
        label = [label for label in p.get_rdf_object(RDFS.label, ds) if (label.is_language_string() and (label.language() == 'en') or not label.is_language_string())]
        if not label:
            print("LABEL NOT KNOWN")
            print(str(p.get_rdf_object(RDFS.label, ds)))
            return 'not known'
        else:
            return label[0].value()
    @staticmethod
    def is_resource_class(clazz: RDFSClass) -> bool:
        if clazz.is_iri(DCAT.Distribution):
            return True
        return True

    @staticmethod
    def ckan_field(label: str) -> str:
        # TODO: overrides
        return label
    @staticmethod
    def vocab_choices(g: Graph):
        return list([{"value": str(s), "label": RDFSLiteral(
            [pl for pl in g.objects(s, SKOS.prefLabel) if pl.language is None or pl.language == 'en'][0]).value()} for
                     s, _, _ in g.triples((None, RDF.type, SKOS.Concept))])
    @staticmethod
    def controlled_vocab_field(p: RDFSProperty, clazz: RDFSClass, ds: Dataset):
        label_value = MobilityDCATAPToSchema.get_label(p)

        match p.iri:
            case MOBILITYDCATAP.communicationMethod:
                g = ds.get_graph(URIRef(CVOCAB_COMMUNICATION_METHOD))
                return {
                    "field_name": MobilityDCATAPToSchema.ckan_field(label_value),
                    "label": label_value,
                    "preset": "select",
                    "choices": MobilityDCATAPToSchema.vocab_choices(g)
                }
            case DCTERMS.type:
                if clazz.is_iri(DCTERMS.RightsStatement):
                    g = ds.get_graph(URIRef(CVOCAB_RIGHTS_STATEMENT_TYPE))
                    return {
                        "field_name": MobilityDCATAPToSchema.ckan_field('rights_statement_type'),
                        "label": 'Conditions for access and usage',
                        "preset": "select",
                        "choices": MobilityDCATAPToSchema.vocab_choices(g)
                    }
            case DCTERMS.identifier:
                if clazz.is_iri(DCTERMS.LicenseDocument):
                    g = ds.get_graph(URIRef(CVOCAB_LICENSE_IDENTIFIER))
                    return {
                        "field_name": MobilityDCATAPToSchema.ckan_field('standard_license'),
                        "label": 'Standard license',
                        "preset": "select",
                        "choices": MobilityDCATAPToSchema.vocab_choices(g)
                    }
            case MOBILITYDCATAP.applicationLayerProtocol:
                g = ds.get_graph(URIRef(CVOCAB_APPLICATION_LAYER_PROTOCOL))
                return {
                    "field_name": MobilityDCATAPToSchema.ckan_field(label_value),
                    "label": label_value,
                    "preset": "select",
                    "choices": MobilityDCATAPToSchema.vocab_choices(g)
                }
            case MOBILITYDCATAP.grammar:
                g = ds.get_graph(URIRef(CVOCAB_GRAMMAR))
                return {
                    "field_name": MobilityDCATAPToSchema.ckan_field(label_value),
                    "label": label_value,
                    "preset": "select",
                    "choices": MobilityDCATAPToSchema.vocab_choices(g)
                }

class CKANExtSchemingSchema:
    def __init__(self, dataset_fields, resource_fields):
        self.dataset_fields = dataset_fields
        self.resource_fields = resource_fields

    def add_fields(self, cpa: ClassPropertiesAggregator):
        pass



def iri_resource_factory(cls, iri, ds: Dataset, **kwargs):
    """
    TODO: Kato tälle funkkarille parempi paikka
    """
    namespace, iri, types = IRIResource.resource_args_from_ds(iri, ds)
    g = ds.get_graph(URIRef(namespace))

    defined_constructor_arguments: Dict[str, Tuple[URIRef|Literal, ...]] = {}
    additional_properties: Dict[URIRef, List[Tuple[URIRef|Literal, Namespace]]] = {}

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
        else:
            raise ValueError('''
                Predicate was not a URIRef. Instead;
                type={type}
                value={value}\
                '''.format(type=type(p), value=p))

    return cls(namespace, iri, types, additional_properties=(None if not additional_properties else {k: tuple(v) for k, v in additional_properties.items()}), **defined_constructor_arguments)

def rdf_to_yaml(cp: ClassPropertiesAggregator, ds: Dataset):
    resource_fields_schema_map = MobilityDCATAPToSchema.fields_from_aggregator(cp, ds, URIRef(MOBILITYDCATAP._NS))
    dataset_fields_schema_map = [
        {"field_name": "title",
         "label": "Title",
         "preset": "title",
         "form_placeholder": "eg. A descriptive title"},

        {"field_name": "name",
         "label": "URL",
         "preset": "dataset_slug",
         "form_placeholder": "eg. my-dataset"},

        {"field_name": "notes",
         "label": "Description",
         "form_snippet": "markdown.html",
         "form_placeholder": "eg. Some useful notes about the data"},

        {"field_name": "tag_string",
         "label": "Tags",
         "preset": "tag_string_autocomplete",
         "form_placeholder": "eg. economy, mental health, government"},

        {"field_name": "license_id",
         "label": "License",
         "form_snippet": "license.html",
         "help_text": "License definitions and additional information can be found at http://opendefinition.org/"},

        {"field_name": "owner_org",
         "label": "Organization",
         "preset": "dataset_organization"},

        {"field_name": "url",
         "label": "Source",
         "form_placeholder": "http://example.com/dataset.json",
         "display_property": "foaf:homepage",
         "display_snippet": "link.html"},

        {"field_name": "version",
         "label": "Version",
         "validators": "ignore_missing unicode_safe package_version_validator",
         "form_placeholder": "1.0"},

        {"field_name": "author",
         "label": "Author",
         "form_placeholder": "Joe Bloggs",
         "display_property": "dc:creator"},

        {"field_name": "author_email",
         "label": "Author Email",
         "form_placeholder": "joe@example.com",
         "display_property": "dc:creator",
         "display_snippet": "email.html",
         "display_email_name_field": "author"},

        {"field_name": "maintainer",
         "label": "Maintainer",
         "form_placeholder": "Joe Bloggs",
         "display_property": "dc:contributor"},

        {"field_name": "maintainer_email",
         "label": "Maintainer Email",
         "form_placeholder": "joe@example.com",
         "display_property": "dc:contributor",
         "display_snippet": "email.html",
         "display_email_name_field": "maintainer"}
    ]
    schema_map = {
        "scheming_version": 2,
        "dataset_type": "dataset",
        "dataset_fields": dataset_fields_schema_map,
        "resource_fields": resource_fields_schema_map
    }

    file_abspath = os.path.abspath("./output/schema.yaml")
    pprint.pprint(f'Creating file {file_abspath}')
    file_dirname = os.path.dirname(file_abspath)
    if not os.path.isdir(file_dirname):
        os.makedirs(file_dirname)
    with open(file_abspath, 'w') as schema_file:
        yaml.dump(schema_map, schema_file, encoding='utf-8', allow_unicode=True)
    return file_abspath

fill_mobilitydcatap_graph(ds)

clazz = RDFSClass.from_ds(DCAT.Distribution, ds)

print("ADSF")


foobar = ClassPropertiesAggregator.from_ds_with_graph(clazz, ds, URIRef(MOBILITYDCATAP._NS))

print("clazz #########")
print(clazz)

pprint.pprint(MobilityDCATAPToSchema.fields_from_aggregator(foobar, ds, URIRef(MOBILITYDCATAP._NS)))
rdf_to_yaml(foobar, ds)

print("SDPOFH ###########")
print(str(foobar))
print(f'''properties_count: {len(foobar.properties)}
properties_includes_count: {len(foobar.properties_includes)}''')

