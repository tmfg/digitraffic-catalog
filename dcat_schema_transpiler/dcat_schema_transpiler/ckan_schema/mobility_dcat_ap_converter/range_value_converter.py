from mobility_dcat_ap.namespace import MOBILITYDCATAP_NS_URL
from rdfs.rdfs_resource import RDFSResource
from rdfs.util import get_rdf_object

from rdflib import Dataset, URIRef, Graph, FOAF, OWL, DCAT

from rdflib.namespace import RDF, RDFS, DCTERMS, DCAM, SKOS

from mobility_dcat_ap.dataset import CVOCAB_COMMUNICATION_METHOD, CVOCAB_RIGHTS_STATEMENT_TYPE, \
    CVOCAB_LICENSE_IDENTIFIER, CVOCAB_APPLICATION_LAYER_PROTOCOL, CVOCAB_GRAMMAR, CVOCAB_MOBILITY_DCAT_AP_FREQUENCY, \
    CVOCAB_EUV_FREQUENCY, CVOCAB_MOBILITY_DATA_STANDARD, CVOCAB_FORMAT, CVOCAB_MOBILITY_THEME, CVOCAB_LANGUAGE
from mobility_dcat_ap.namespace import MOBILITYDCATAP
from rdfs.rdfs_class import RDFSClass
from rdfs.rdfs_literal import RDFSLiteral
from rdfs.rdfs_property import RDFSProperty

from typing import Callable, List, Dict

class RangeValueConverter:

    def __init__(self, iri_to_convert=None):
        self.iri_to_convert = iri_to_convert

    def get_range_value(self, ds: Dataset, clazz: RDFSClass, clazz_p: RDFSProperty) -> RDFSClass | None:
        r = get_rdf_object(clazz_p, RDFS.range, ds) or ()
        r_includes = get_rdf_object(clazz_p, DCAM.rangeIncludes, ds) or ()
        obj = r + r_includes
        if not obj:
            print("#### COULD NOT FIND AN OBJECT")
            return None
        # TODO: Warn if more than one object
        r_defined_by_mobility_dcat_ap = tuple(o for o in obj if URIRef(MOBILITYDCATAP_NS_URL) in o.is_defined_by)
        r_defined_by_original = tuple(o for o in obj if URIRef(o.namespace).defrag() in map(lambda defined_by: defined_by.defrag(), o.is_defined_by))
        r_defined_by_clazz_ns = tuple(o for o in obj if URIRef(clazz.namespace) in o.is_defined_by)

        r_ordered = r_defined_by_mobility_dcat_ap + r_defined_by_original + r_defined_by_clazz_ns + obj
        return r_ordered[0] if len(r_ordered) > 0 else None

    def get_schema(self, ds: Dataset, clazz: RDFSClass, clazz_p: RDFSProperty | None):
        rdf_range = self.get_range_value(ds, clazz, clazz_p)
        if isinstance(rdf_range, RDFSResource) and rdf_range.iri == RDFS.Literal:
            label_value = RangeValueConverter.get_label(clazz_p, ds)
            field_name = RangeValueConverter.ckan_field(clazz.iri, clazz_p)
            return {
                "field_name": field_name,
                "label": label_value
            }
        elif isinstance(rdf_range, RDFSResource) and rdf_range.iri == RDFS.Resource:
            # Resurssi tyyppiset näyttää olevan URLeja
            label_value = RangeValueConverter.get_label(clazz_p, ds)
            return {
                "field_name": RangeValueConverter.ckan_field(clazz.iri, clazz_p),
                "label": label_value,
                "help_text": 'The value should be URL'
            }
        elif isinstance(rdf_range, RDFSResource) and rdf_range.iri == SKOS.Concept:
            # SKOS.Concept tyyppiset on kontrolloituja sanastoja. RDF:llä ei saane tarkemmin tuota määritettyä.
            # OWL:illa ehkä saisi
            return RangeValueConverter.controlled_vocab_field(clazz_p, clazz, ds)
        else:
            return {}

    def is_class_specific_converter(self, clazz: RDFSClass):
        return clazz.is_iri(self.iri_to_convert)

    @staticmethod
    def get_label(p: RDFSProperty, ds: Dataset):
        label = [label for label in get_rdf_object(p, RDFS.label, ds) if (label.is_language_string() and (label.language() == 'en') or not label.is_language_string())]
        if not label:
            print("LABEL NOT KNOWN")
            print(str(get_rdf_object(p, RDFS.label, ds)))
            return 'not known'
        else:
            return label[0].value()

    @staticmethod
    def ckan_field(class_iri: URIRef, p: RDFSProperty, pointer: str=None) -> str:
        mappings: Dict[URIRef, Dict[URIRef, str | Dict[str, str]]] = {
            FOAF.Agent: {
                FOAF.name: 'publisher_name'
            },
            MOBILITYDCATAP.MobilityDataStandard: {
                MOBILITYDCATAP.schema: 'mobility_data_standard_schema',
                OWL.versionInfo: 'mobility_data_standard_version'
            },
            DCTERMS.Location: {
                SKOS.inScheme: 'gazetteer',
                DCTERMS.identifier: 'geographic_identifier'
            },
            DCAT.Distribution: {
                DCAT.accessURL: 'url',
                DCTERMS.format: 'format'
            },
            DCTERMS.RightsStatement: {
                DCTERMS.type: 'rights_type'
            },
            DCAT.Dataset: {
                DCTERMS.description: 'notes',
                DCTERMS.accrualPeriodicity: 'frequency',
                MOBILITYDCATAP.mobilityTheme: {
                    'main': 'mobility_theme',
                    'sub': 'mobility_theme_sub'
                },
                DCTERMS.title: 'name'
            },
            DCAT.CatalogRecord: {
                DCTERMS.language: 'metadata_language'
            }
        }
        field_value = mappings.get(class_iri, {}).get(p.iri)
        if isinstance(field_value, dict):
            field_name = field_value.get(pointer)
        else:
            field_name = field_value
        if field_name:
            return field_name
        raise Exception(f'A mapping was not found between the class {class_iri} property {p.iri} and CKAN datamodel')
    @staticmethod
    def vocab_choices(g: Graph, filter: Callable[[URIRef], bool] = lambda s: True):
        def get_label(s):
            labels = [pl for pl in g.objects(s, SKOS.prefLabel)]
            if labels:
                english = [pl for pl in labels if pl.language is None or pl.language == 'en']
                if english:
                    picked_label = english[0]
                else:
                    picked_label = labels[0]
                return RDFSLiteral(picked_label).value()
            print(f'Could not find label for {s}')
            return None
        return list([{"value": str(s), "label": get_label(s)} for
                     s, _, _ in g.triples((None, RDF.type, SKOS.Concept))
                     if filter(URIRef(s))])
    @staticmethod
    def controlled_vocab_field(p: RDFSProperty, clazz: RDFSClass, ds: Dataset) -> List | Dict:
        # Some classes do not have properties
        match clazz.iri:
            case DCTERMS.MediaTypeOrExtent:
                g = ds.get_graph(URIRef(CVOCAB_FORMAT))
                return {
                    "field_name": "format",
                    "label": "Format",
                    "preset": "select",
                    "choices": RangeValueConverter.vocab_choices(g)
                }
            case DCTERMS.Frequency:
                g_mobility_dcat_ap_frequency = ds.get_graph(URIRef(CVOCAB_MOBILITY_DCAT_AP_FREQUENCY))
                g_euv_frequency = ds.get_graph(URIRef(CVOCAB_EUV_FREQUENCY))
                g = g_mobility_dcat_ap_frequency + g_euv_frequency
                return {
                    "field_name": "frequency",
                    "label": "Frequency",
                    "preset": "select",
                    "choices": RangeValueConverter.vocab_choices(g)
                }
            case DCTERMS.LinguisticSystem:
                g = ds.get_graph(URIRef(CVOCAB_LANGUAGE))

                def is_supported_language(s: URIRef) -> bool:
                    def language_uri(ending):
                        return f'{str(CVOCAB_LANGUAGE)}/{ending}'
                    supported_languages = {language_uri('FIN'), language_uri('SWE'), language_uri('ENG')}
                    if str(s) in supported_languages:
                        return True
                    return False
                return {
                    "field_name": "metadata_language",
                    "label": "Metadata Language",
                    "preset": "select",
                    "choices": RangeValueConverter.vocab_choices(g, lambda s: is_supported_language(s))
                }
        label_value = RangeValueConverter.get_label(p, ds)

        match p.iri:
            case MOBILITYDCATAP.communicationMethod:
                g = ds.get_graph(URIRef(CVOCAB_COMMUNICATION_METHOD))
                return {
                    "field_name": RangeValueConverter.ckan_field(clazz.iri, p),
                    "label": label_value,
                    "preset": "select",
                    "choices": RangeValueConverter.vocab_choices(g)
                }
            case DCTERMS.type:
                if clazz.is_iri(DCTERMS.RightsStatement):
                    g = ds.get_graph(URIRef(CVOCAB_RIGHTS_STATEMENT_TYPE))
                    return {
                        "field_name": RangeValueConverter.ckan_field(clazz.iri, p),
                        "label": 'Conditions for access and usage',
                        "preset": "select",
                        "choices": RangeValueConverter.vocab_choices(g)
                    }
            case DCTERMS.identifier:
                if clazz.is_iri(DCTERMS.LicenseDocument):
                    g = ds.get_graph(URIRef(CVOCAB_LICENSE_IDENTIFIER))
                    return {
                        "field_name": RangeValueConverter.ckan_field(clazz.iri, p),
                        "label": 'Standard license',
                        "preset": "select",
                        "choices": RangeValueConverter.vocab_choices(g)
                    }
            case MOBILITYDCATAP.applicationLayerProtocol:
                g = ds.get_graph(URIRef(CVOCAB_APPLICATION_LAYER_PROTOCOL))
                return {
                    "field_name": RangeValueConverter.ckan_field(clazz.iri, p),
                    "label": label_value,
                    "preset": "select",
                    "choices": RangeValueConverter.vocab_choices(g)
                }
            case MOBILITYDCATAP.grammar:
                g = ds.get_graph(URIRef(CVOCAB_GRAMMAR))
                return {
                    "field_name": RangeValueConverter.ckan_field(clazz.iri, p),
                    "label": label_value,
                    "preset": "select",
                    "choices": RangeValueConverter.vocab_choices(g)
                }
            case MOBILITYDCATAP.schema:
                g = ds.get_graph(URIRef(CVOCAB_MOBILITY_DATA_STANDARD))
                return {
                    "field_name": RangeValueConverter.ckan_field(clazz.iri, p),
                    "label": "Mobility data standard",
                    "preset": "select",
                    "choices": RangeValueConverter.vocab_choices(g)
                }
            case MOBILITYDCATAP.mobilityTheme:
                g = ds.get_graph(URIRef(CVOCAB_MOBILITY_THEME))
                return [{
                    "field_name": RangeValueConverter.ckan_field(clazz.iri, p, 'main'),
                    "label": "Data content category",
                    "preset": "select",
                    "choices": RangeValueConverter.vocab_choices(g, lambda s: (s, SKOS.broader, URIRef('https://w3id.org/mobilitydcat-ap/mobility-theme/data-content-category')) in g)
                },
                    {
                        "field_name": RangeValueConverter.ckan_field(clazz.iri, p, 'sub'),
                        "label": "Data content sub category",
                        "preset": "select",
                        "choices": RangeValueConverter.vocab_choices(g, lambda s: (s, SKOS.broader, URIRef('https://w3id.org/mobilitydcat-ap/mobility-theme/data-content-sub-category')) in g)
                    }
                ]