from mobility_dcat_ap.namespace import MOBILITYDCATAP_NS_URL
from rdfs.rdfs_resource import RDFSResource
from rdfs.util import get_rdf_object

from rdflib import Dataset, URIRef, Graph

from rdflib.namespace import RDF, RDFS, DCTERMS, DCAM, SKOS

from mobility_dcat_ap.dataset import CVOCAB_COMMUNICATION_METHOD, CVOCAB_RIGHTS_STATEMENT_TYPE, CVOCAB_LICENSE_IDENTIFIER, CVOCAB_APPLICATION_LAYER_PROTOCOL, CVOCAB_GRAMMAR
from mobility_dcat_ap.namespace import MOBILITYDCATAP
from rdfs.rdfs_class import RDFSClass
from rdfs.rdfs_literal import RDFSLiteral
from rdfs.rdfs_property import RDFSProperty

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
            field_name = RangeValueConverter.ckan_field(label_value)
            return {
                "field_name": field_name,
                "label": label_value
            }
        elif isinstance(rdf_range, RDFSResource) and rdf_range.iri == RDFS.Resource:
            # Resurssi tyyppiset näyttää olevan URLeja
            label_value = RangeValueConverter.get_label(clazz_p, ds)
            return {
                "field_name": RangeValueConverter.ckan_field(label_value),
                "label": label_value,
                "help_text": 'The value should be URL'
            }
        elif isinstance(rdf_range, RDFSResource) and rdf_range.iri == SKOS.Concept:
            # SKOS.Concept tyyppiset on kontrolloituja sanastoja. RDF:llä ei saane tarkemmin tuota määritettyä.
            # OWL:illa ehkä saisi
            return RangeValueConverter.controlled_vocab_field(clazz_p, clazz, ds)
        else:
            return None

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
        label_value = RangeValueConverter.get_label(p, ds)

        match p.iri:
            case MOBILITYDCATAP.communicationMethod:
                g = ds.get_graph(URIRef(CVOCAB_COMMUNICATION_METHOD))
                return {
                    "field_name": RangeValueConverter.ckan_field(label_value),
                    "label": label_value,
                    "preset": "select",
                    "choices": RangeValueConverter.vocab_choices(g)
                }
            case DCTERMS.type:
                if clazz.is_iri(DCTERMS.RightsStatement):
                    g = ds.get_graph(URIRef(CVOCAB_RIGHTS_STATEMENT_TYPE))
                    return {
                        "field_name": RangeValueConverter.ckan_field('rights_statement_type'),
                        "label": 'Conditions for access and usage',
                        "preset": "select",
                        "choices": RangeValueConverter.vocab_choices(g)
                    }
            case DCTERMS.identifier:
                if clazz.is_iri(DCTERMS.LicenseDocument):
                    g = ds.get_graph(URIRef(CVOCAB_LICENSE_IDENTIFIER))
                    return {
                        "field_name": RangeValueConverter.ckan_field('standard_license'),
                        "label": 'Standard license',
                        "preset": "select",
                        "choices": RangeValueConverter.vocab_choices(g)
                    }
            case MOBILITYDCATAP.applicationLayerProtocol:
                g = ds.get_graph(URIRef(CVOCAB_APPLICATION_LAYER_PROTOCOL))
                return {
                    "field_name": RangeValueConverter.ckan_field(label_value),
                    "label": label_value,
                    "preset": "select",
                    "choices": RangeValueConverter.vocab_choices(g)
                }
            case MOBILITYDCATAP.grammar:
                g = ds.get_graph(URIRef(CVOCAB_GRAMMAR))
                return {
                    "field_name": RangeValueConverter.ckan_field(label_value),
                    "label": label_value,
                    "preset": "select",
                    "choices": RangeValueConverter.vocab_choices(g)
                }