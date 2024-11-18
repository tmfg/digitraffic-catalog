from dataclasses import dataclass

from rdflib import Dataset, Graph, Namespace, URIRef, Literal
from rdflib.namespace import (
    RDF,
    RDFS,
    DCTERMS,
    XSD,
    DCAM,
    DCAT,
    FOAF,
    VANN,
    OWL,
    SKOS,
    ORG,
    PROV,
)

from dcat_schema_transpiler.cache.vocabularies import (
    is_local_file_created,
    get_cached_file_path,
    cache_vocabulary,
)
from dcat_schema_transpiler.integration.client import get_graph_url, get_serialized_rdf
from dcat_schema_transpiler.mobility_dcat_ap.namespace import (
    MOBILITYDCATAP_NS_URL,
    MOBILITYDCATAP,
)
from dcat_schema_transpiler.asset_description_metadata_schema.namespace import ADMS

dcat_ap_v_2_0_1_url = "https://joinup.ec.europa.eu/sites/default/files/distribution/access_url/2020-06/e7febda4-1604-4e01-802f-53f0fd2f690c/dcat-ap_2.0.1.rdf"

ADMS = Namespace("http://www.w3.org/ns/adms#")
BIBO = Namespace("http://purl.org/ontology/bibo/")
CC = Namespace("http://creativecommons.org/ns#")
CNT = Namespace("http://www.w3.org/2011/content#")
DCAT_AP = Namespace("http://data.europa.eu/r5r/")
DCELEM = Namespace("http://purl.org/dc/elements/1.1/")
DQV = Namespace("http://www.w3.org/ns/dqv#")
LOCN = Namespace("http://www.w3.org/ns/locn#")
OA = Namespace("http://www.w3.org/ns/oa#")
XHV = Namespace("http://www.w3.org/1999/xhtml/vocab#")
VCARD = Namespace("http://www.w3.org/2006/vcard/ns#")
SDMX = Namespace("http://purl.org/linked-data/sdmx#")
WDRS = Namespace("http://www.w3.org/2007/05/powder-s#")
VOAF = Namespace("http://purl.org/vocommons/voaf#")
VS = Namespace("http://www.w3.org/2003/06/sw-vocab-status/ns#")
SKOS_DOC = Namespace("http://www.w3.org/TR/skos-primer/")
SPDX = Namespace("http://spdx.org/rdf/terms#")
XML = Namespace("http://www.w3.org/XML/1998/namespace")
ELI = Namespace("http://data.europa.eu/eli/ontology")

CVOCAB_MOBILITY_THEME = Namespace("https://w3id.org/mobilitydcat-ap/mobility-theme/")

CVOCAB_FORMAT = Namespace("http://publications.europa.eu/resource/authority/file-type/")
CVOCAB_MOBILITY_DATA_STANDARD = Namespace(
    "https://w3id.org/mobilitydcat-ap/mobility-data-standard/"
)
CVOCAB_GRAMMAR = Namespace("https://w3id.org/mobilitydcat-ap/grammar/")
CVOCAB_APPLICATION_LAYER_PROTOCOL = Namespace(
    "https://w3id.org/mobilitydcat-ap/application-layer-protocol/"
)
CVOCAB_COMMUNICATION_METHOD = Namespace(
    "https://w3id.org/mobilitydcat-ap/communication-method/"
)
CVOCAB_RIGHTS_STATEMENT_TYPE = Namespace(
    "https://w3id.org/mobilitydcat-ap/conditions-for-access-and-usage/"
)
CVOCAB_LICENSE_IDENTIFIER = Namespace(
    "http://publications.europa.eu/resource/authority/licence/"
)

CVOCAB_EUV_FREQUENCY = Namespace(
    "http://publications.europa.eu/resource/authority/frequency"
)
CVOCAB_MOBILITY_DCAT_AP_FREQUENCY = Namespace(
    "https://w3id.org/mobilitydcat-ap/update-frequency"
)
CVOCAB_LANGUAGE = Namespace("http://publications.europa.eu/resource/authority/language")
# About NUTS: https://ec.europa.eu/eurostat/web/gisco/geodata/statistical-units/territorial-units-statistics
# Download page: https://data.europa.eu/data/datasets/nuts~~1?locale=en
CVOCAB_NUTS = Namespace("http://data.europa.eu/nuts/")
# About LAU: https://ec.europa.eu/eurostat/web/gisco/geodata/statistical-units/local-administrative-units
CVOCAB_LAU = Namespace("https://w3id.org/stirdata/resource/lau/item/")
CVOCAB_GEOREFERENCING_METHOD = Namespace("https://w3id.org/mobilitydcat-ap/georeferencing-method#")

mobility_dcat_namespaces = {
    "adms": ADMS,
    "bibo": BIBO,
    "cnt": CNT,
    "dcat": DCAT,
    "dcatap": DCAT_AP,
    "dct": DCTERMS,
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
    "xsd": XSD,
    # "eli": ELI
}

controlled_vocabularies = [
    CVOCAB_FORMAT,
    CVOCAB_MOBILITY_DATA_STANDARD,
    CVOCAB_GRAMMAR,
    CVOCAB_APPLICATION_LAYER_PROTOCOL,
    CVOCAB_COMMUNICATION_METHOD,
    CVOCAB_RIGHTS_STATEMENT_TYPE,
    CVOCAB_LICENSE_IDENTIFIER,
    CVOCAB_EUV_FREQUENCY,
    CVOCAB_MOBILITY_DCAT_AP_FREQUENCY,
    CVOCAB_MOBILITY_THEME,
    CVOCAB_LANGUAGE,
    CVOCAB_NUTS,
    CVOCAB_LAU,
    CVOCAB_GEOREFERENCING_METHOD,
]


def mobilitydcatap_fixes(graph):
    # There is probably a typo in the .ttl file. Should be capital 'M' as per https://mobilitydcat-ap.github.io/mobilityDCAT-AP/releases/index.html#properties-for-mobility-data-standard
    graph.remove(
        (OWL.versionInfo, DCAM.domainIncludes, MOBILITYDCATAP.mobilityDataStandard)
    )
    graph.add(
        (OWL.versionInfo, DCAM.domainIncludes, MOBILITYDCATAP.MobilityDataStandard)
    )

    # DCAT or DCAT-AP has in comments that the following properties are part of some class. Here we add a property that states the fact
    graph.add((DCTERMS.format, DCAM.domainIncludes, DCAT.Distribution))
    graph.add((DCTERMS.rights, DCAM.domainIncludes, DCAT.Distribution))
    graph.add((DCTERMS.description, DCAM.domainIncludes, DCAT.Distribution))
    graph.add((DCTERMS.license, DCAM.domainIncludes, DCAT.Distribution))
    graph.add((DCTERMS.title, DCAM.domainIncludes, DCAT.Distribution))
    graph.add((DCAT.accessService, DCAM.domainIncludes, DCAT.Distribution))

    graph.add((DCTERMS.description, DCAM.domainIncludes, DCAT.Dataset))
    graph.add((DCTERMS.title, DCAM.domainIncludes, DCAT.Dataset))
    graph.add((DCAT.contactPoint, DCAM.domainIncludes, DCAT.Dataset))
    graph.add((DCAT.distribution, DCAM.domainIncludes, DCAT.Dataset))
    graph.add((DCAT.keyword, DCAM.domainIncludes, DCAT.Dataset))
    graph.add((DCTERMS.accrualPeriodicity, DCAM.domainIncludes, DCAT.Dataset))
    graph.add((DCTERMS.spatial, DCAM.domainIncludes, DCAT.Dataset))
    graph.add((DCTERMS.publisher, DCAM.domainIncludes, DCAT.Dataset))
    graph.add((OWL.versionInfo, DCAM.domainIncludes, DCAT.Dataset))
    graph.add((ADMS.versionNotes, DCAM.domainIncludes, DCAT.Dataset))

    graph.add((DCTERMS.created, DCAM.domainIncludes, DCAT.CatalogRecord))
    graph.add((DCTERMS.language, DCAM.domainIncludes, DCAT.CatalogRecord))
    graph.add((FOAF.primaryTopic, DCAM.domainIncludes, DCAT.CatalogRecord))
    graph.add((DCTERMS.modified, DCAM.domainIncludes, DCAT.CatalogRecord))

    graph.add((DCAT.dataset, DCAM.domainIncludes, DCAT.Catalog))
    graph.add((DCTERMS.description, DCAM.domainIncludes, DCAT.Catalog))
    graph.add((FOAF.homepage, DCAM.domainIncludes, DCAT.Catalog))
    graph.add((DCTERMS.publisher, DCAM.domainIncludes, DCAT.Catalog))
    graph.add((DCAT.record, DCAM.domainIncludes, DCAT.Catalog))
    graph.add((DCTERMS.spatial, DCAM.domainIncludes, DCAT.Catalog))
    graph.add((DCTERMS.title, DCAM.domainIncludes, DCAT.Catalog))

    # Range chanages stated in the document but not visible in the serialized format
    graph.add((DCTERMS.format, DCAM.rangeIncludes, DCTERMS.MediaTypeOrExtent))
    graph.add((DCTERMS.description, DCAM.rangeIncludes, RDFS.Literal))

    # Resources taken from DCAT-AP version 3
    # graph.add((DCAT_AP.applicableLegislation, RDFS.label, Literal("applicable legislation", lang="en")))
    # graph.add((DCAT_AP.applicableLegislation, SKOS.definition, Literal("the legislation that is applicable to this resource.", lang="en")))
    # graph.add((DCAT_AP.applicableLegislation, RDFS.domain, RDFS.Resource))
    # graph.add((DCAT_AP.applicableLegislation, RDFS.range, ELI.LegalResource))

    # Agent
    graph.add((FOAF.name, DCAM.domainIncludes, FOAF.Agent))


def other_fixes(ds: Dataset):
    g_dcterms = ds.get_graph(URIRef(DCTERMS._NS))

    # Cannot find anything about class DCTERMS.Extent but it is still used
    # here https://www.dublincore.org/specifications/dublin-core/dcmi-terms/terms/format/
    g_dcterms.remove((DCTERMS.format, DCAM.rangeIncludes, DCTERMS._NS.Extent))


def add_property(ds: Dataset, graph_namespace: URIRef, property: URIRef):
    g = ds.get_graph(graph_namespace)
    propertys_graph = next(
        ds_g for ds_g in ds.graphs() if property.startswith(ds_g.identifier)
    )

    for triple in propertys_graph.triples((property, None, None)):
        g.add(triple)


def fill_mobilitydcatap_graph(ds: Dataset):
    ## Distribution
    dataset_property_iris = {
        DCTERMS.description,
        DCTERMS.title,
        DCAT.contactPoint,
        DCAT.distribution,
        DCAT.keyword,
        DCTERMS.accrualPeriodicity,
        DCTERMS.spatial,
        DCTERMS.publisher,
    }
    distribution_property_iris = {
        DCAT.accessURL,
        DCTERMS.format,
        DCTERMS.rights,
        DCTERMS.description,
        DCTERMS.license,
        DCAT.accessService,
        DCAT.downloadURL,
    }
    period_of_time_property_iris = {DCAT.startDate, DCAT.endDate}
    catalogue_record_iris = {
        DCTERMS.created,
        DCTERMS.language,
        FOAF.primaryTopic,
        DCTERMS.modified,
    }
    other_property_iris = {FOAF.name}

    property_union = (
        dataset_property_iris
        | distribution_property_iris
        | period_of_time_property_iris
        | other_property_iris
        | catalogue_record_iris
    )
    for property_iri in property_union:
        add_property(ds, URIRef(MOBILITYDCATAP._NS), property_iri)


@dataclass
class NsFetchInfo:
    graph_url: str
    serialization_format: str

    def get_mime_type(self):
        match self.serialization_format:
            case "rdf":
                return "application/rdf+xml"
            case "ttl":
                return "text/turtle"


def ns_fetch_info(ns: URIRef) -> NsFetchInfo | None:
    # The namespaces in elif -clauses need some special handling as the content negotiation does not work
    if str(ns) == "http://data.europa.eu/r5r/":
        # The above link won't lead to the serialized resource
        # ds.default_context.serialize(destination=mdcatap_file_name, format="xml")
        graph_url = dcat_ap_v_2_0_1_url
        serialization_format = "rdf"

    elif str(ns) == "http://spdx.org/rdf/terms#":
        # The above link won't lead to the serialized resource
        graph_url = "https://raw.githubusercontent.com/spdx/spdx-spec/development/v2.3/ontology/spdx-ontology.owl.xml"
        serialization_format = "rdf"
    elif str(ns) == "http://www.w3.org/ns/locn#":
        # The above link won't lead to the serialized resource
        graph_url = (
            "https://semiceu.github.io/Core-Location-Vocabulary/releases/w3c/locn.rdf"
        )
        serialization_format = "rdf"
    elif str(ns) == "http://purl.org/vocab/vann/":
        # The above link won't lead to the serialized resource
        graph_url = "https://vocab.org/vann/vann-vocab-20100607.rdf"
        serialization_format = "rdf"
    elif str(ns) == "http://www.w3.org/1999/xhtml/vocab#":
        return None
    elif str(ns) == "http://creativecommons.org/ns#":
        # Couldn't find a serialized version
        return None
    elif str(ns) == "http://purl.org/linked-data/sdmx#":
        # The returned content-type header is set wrong to text/plain when it actually is Turtle
        graph_url, _ = get_graph_url(ns)
        serialization_format = "ttl"
    elif str(ns) == "http://www.w3.org/TR/skos-primer/":
        # Couldn't find a serialized version
        return None
    elif str(ns) == "http://www.w3.org/2001/XMLSchema#":
        return None
    elif str(ns) == "http://www.w3.org/XML/1998/namespace":
        return None
    elif str(ns) == "http://purl.org/linked-data/cube#":
        # The returned content-type header is set wrong
        graph_url, _ = get_graph_url(ns)
        serialization_format = "ttl"
    elif str(ns) == "http://purl.org/ontology/bibo/":
        # The returned content-type header is set wrong
        graph_url, _ = get_graph_url(ns)
        serialization_format = "rdf"

    # VOCABS
    elif str(ns) == "http://publications.europa.eu/resource/authority/file-type/":
        graph_url = "https://op.europa.eu/o/opportal-service/euvoc-download-handler?cellarURI=http%3A%2F%2Fpublications.europa.eu%2Fresource%2Fcellar%2Fa8fa2fcb-28d8-11ef-9290-01aa75ed71a1.0001.04%2FDOC_1&fileName=filetypes-skos.rdf"
        serialization_format = "rdf"
    elif str(ns) == "http://publications.europa.eu/resource/authority/licence/":
        graph_url = "https://op.europa.eu/o/opportal-service/euvoc-download-handler?cellarURI=http%3A%2F%2Fpublications.europa.eu%2Fresource%2Fcellar%2Fab0e79f8-5c6c-11ee-9220-01aa75ed71a1.0001.03%2FDOC_1&fileName=licences-skos.rdf"
        serialization_format = "rdf"
    elif str(ns) == "http://publications.europa.eu/resource/authority/frequency":
        graph_url = "https://op.europa.eu/o/opportal-service/euvoc-download-handler?cellarURI=http%3A%2F%2Fpublications.europa.eu%2Fresource%2Fcellar%2Fcc196da1-28d8-11ef-9290-01aa75ed71a1.0001.03%2FDOC_1&fileName=frequencies-skos.rdf"
        serialization_format = "rdf"
    elif str(ns) == "http://publications.europa.eu/resource/authority/language":
        graph_url = "https://op.europa.eu/o/opportal-service/euvoc-download-handler?cellarURI=http%3A%2F%2Fpublications.europa.eu%2Fresource%2Fcellar%2F3f407e57-28d9-11ef-9290-01aa75ed71a1.0001.05%2FDOC_1&fileName=languages-skos.rdf"
        serialization_format = "rdf"
    elif str(ns) == "https://w3id.org/mobilitydcat-ap/mobility-data-standard/":
        graph_url, _ = get_graph_url(ns)
        serialization_format = "ttl"
    elif str(ns) == "https://w3id.org/mobilitydcat-ap/grammar/":
        graph_url, _ = get_graph_url(ns)
        serialization_format = "ttl"
    elif str(ns) == "https://w3id.org/mobilitydcat-ap/application-layer-protocol/":
        graph_url, _ = get_graph_url(ns)
        serialization_format = "ttl"
    elif str(ns) == "https://w3id.org/mobilitydcat-ap/communication-method/":
        graph_url, _ = get_graph_url(ns)
        serialization_format = "ttl"
    elif str(ns) == "https://w3id.org/mobilitydcat-ap/conditions-for-access-and-usage/":
        graph_url, _ = get_graph_url(ns)
        serialization_format = "ttl"
    elif str(ns) == "https://w3id.org/mobilitydcat-ap/update-frequency":
        graph_url, _ = get_graph_url(ns)
        serialization_format = "ttl"
    elif str(ns) == "https://w3id.org/mobilitydcat-ap/mobility-theme/":
        graph_url, _ = get_graph_url(ns)
        serialization_format = "ttl"
    elif str(ns) == "http://data.europa.eu/nuts/":
        graph_url = "https://data.europa.eu/api/hub/repo/distributions/e02ba91d-0aaa-4af0-b49c-699eda90c902.rdf"
        serialization_format = "rdf"
    elif str(ns) == "https://w3id.org/stirdata/resource/lau/item/":
        graph_url, _ = get_graph_url(ns)
        serialization_format = "ttl"
    elif str(ns) == "https://w3id.org/mobilitydcat-ap/georeferencing-method#":
        graph_url, _ = get_graph_url(ns)
        serialization_format = "ttl"
    else:
        graph_url, mime_format = get_graph_url(ns)
        serialization_format = "ttl" if mime_format == "text/turtle" else "rdf"
    return NsFetchInfo(graph_url, serialization_format)


def set_content_for_graph(graph: Graph) -> None:
    ns: URIRef = graph.identifier

    if is_local_file_created(ns):
        graph.parse(get_cached_file_path(ns))
        return

    fetch_info = ns_fetch_info(ns)

    if fetch_info is None:
        return

    graph_url = fetch_info.graph_url
    serialization_format = fetch_info.serialization_format
    graph.parse(graph_url, format=fetch_info.get_mime_type())

    cache_content = get_serialized_rdf(graph_url, serialization_format)
    cache_vocabulary(cache_content, ns, serialization_format)


def populate_dataset(ds: Dataset, namespace: Namespace) -> None:
    if not [
        context for context in ds.contexts() if context.identifier == URIRef(namespace)
    ]:
        g = ds.graph(namespace)
        set_content_for_graph(g)


def create_dataset() -> Dataset:
    DCATAP_NS_URL = "http://data.europa.eu/r5r/"

    mobility_dcat_v_1_0_1_url = "https://mobilitydcat-ap.github.io/mobilityDCAT-AP/releases/1.0.1/mobilitydcat-ap.ttl"

    ## HUOM! Ei ole versiota DCAT specificaatioon. Pitäisi olla v2
    dcat_url = "https://www.w3.org/ns/dcat.ttl"

    ds = Dataset()

    g_mobility_dcat = ds.graph(URIRef(MOBILITYDCATAP_NS_URL))
    g_mobility_dcat.parse(mobility_dcat_v_1_0_1_url)

    g_dcat_ap = ds.graph(URIRef(DCATAP_NS_URL))
    g_dcat_ap.parse(dcat_ap_v_2_0_1_url)

    mobilitydcatap_fixes(g_mobility_dcat)

    for namespace in list(mobility_dcat_namespaces.values()) + controlled_vocabularies:
        if isinstance(namespace, Namespace):
            ns = namespace
        else:
            ns = namespace._NS
        if not isinstance(ns, Namespace):
            raise ValueError("Foo")
        populate_dataset(ds, ns)

    other_fixes(ds)

    fill_mobilitydcatap_graph(ds)

    return ds
