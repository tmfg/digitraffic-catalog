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

def populate_dataset(ds: Dataset, namespace: Namespace) -> None:
    if not [context for context in ds.contexts() if context.identifier == URIRef(namespace)]:
        g = ds.graph(namespace)
        set_content_for_graph(g)

for _, namespace in mobility_dcat_namespaces.items():
    if isinstance(namespace, Namespace):
        ns = namespace
    else:
        ns = namespace._NS
    if not isinstance(ns, Namespace):
        raise ValueError('Foo')
    populate_dataset(ds, ns)




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
    def __init__(self, clazz: RDFSClass, properties: Set[RDFSProperty], properties_includes: Set[RDFSProperty]):
        self.clazz = clazz
        self.properties = properties
        self.properties_includes = properties_includes

    @classmethod
    def from_ds_with_graph(cls, clazz: RDFSClass, ds: Dataset, graph_namespace: URIRef) -> ClassPropertiesAggregator:
        properties: Set[RDFSProperty] = set()
        properties_includes: Set[RDFSProperty] = set()
        g = ds.get_graph(graph_namespace)
        for s, _, _ in g.triples((None, RDFS.range, clazz.iri)):
            if (s, RDF.type, RDF.Property) in g:
                properties.add(RDFSProperty.from_ds(s, ds))
            elif (s, RDF.type, OWL.DatatypeProperty) in g:
                # Not exactly correct, ubt OWL.DatatypeProperty is a subclass of RDF Property
                properties_includes.add(RDFSProperty.from_ds(s, ds))
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
        else:
            raise ValueError('''
                Predicate was not a URIRef. Instead;
                type={type}
                value={value}\
                '''.format(type=type(p), value=p))

    return cls(namespace, iri, types, additional_properties=(None if not additional_properties else {k: tuple(v) for k, v in additional_properties.items()}), **defined_constructor_arguments)

clazz = RDFSClass.from_ds(DCAT.Distribution, ds)

print("ADSF")


foobar = ClassPropertiesAggregator.from_ds_with_graph(clazz, ds, URIRef(MOBILITYDCATAP._NS))

print("clazz #########")
print(clazz)
print("SDPOFH ###########")
print(str(foobar))
