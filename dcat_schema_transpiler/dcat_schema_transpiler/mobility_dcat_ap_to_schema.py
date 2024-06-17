from rdflib import Dataset, URIRef, Graph
from typing import List

from rdflib.namespace import RDF, RDFS, DCTERMS, DCAM, DCAT, OWL, SKOS

from mobility_dcat_ap.dataset import ADMS, CVOCAB_MOBILITY_DATA_STANDARD, CVOCAB_FORMAT, CVOCAB_COMMUNICATION_METHOD, \
    CVOCAB_RIGHTS_STATEMENT_TYPE, CVOCAB_LICENSE_IDENTIFIER, CVOCAB_APPLICATION_LAYER_PROTOCOL, CVOCAB_GRAMMAR
from mobility_dcat_ap.namespace import MOBILITYDCATAP
from rdfs.rdfs_class import RDFSClass
from rdfs.rdfs_literal import RDFSLiteral
from rdfs.rdfs_property import RDFSProperty
from rdfs.rdfs_resource import RDFSResource
from rdfs.util import ClassPropertiesAggregator, get_rdf_object


class MobilityDCATAPToSchema:
    @staticmethod
    def fields_from_aggregator(cps: ClassPropertiesAggregator, ds: Dataset, graph_namespace: URIRef) -> List:
        if MobilityDCATAPToSchema.is_resource_class(cps.clazz):
            schema_fields = []
            for p in cps.properties | cps.properties_includes:
                # TODO: Warn if more than one range
                r = get_rdf_object(p, RDFS.range, ds) or ()
                if p.is_iri(DCTERMS.format):
                    # Check comments from https://mobilitydcat-ap.github.io/mobilityDCAT-AP/releases/index.html#distribution-format
                    r_includes = (RDFSClass.from_ds(DCTERMS.MediaTypeOrExtent, ds),)
                else:
                    r_includes = get_rdf_object(p, DCAM.rangeIncludes, ds) or ()
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
                        label_value = MobilityDCATAPToSchema.get_label(p, ds)
                        field_name = MobilityDCATAPToSchema.ckan_field(label_value)
                    schema_fields.append({
                        "field_name": field_name,
                        "label": label_value
                    })
                elif isinstance(rdf_range, RDFSResource) and rdf_range.iri == RDFS.Resource:
                    # Resurssi tyyppiset näyttää olevan URLeja
                    label_value = MobilityDCATAPToSchema.get_label(p, ds)
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
                    label_value = MobilityDCATAPToSchema.get_label(p, ds)
                    g_cvocab_mobility_data_standard = ds.get_graph(URIRef(CVOCAB_MOBILITY_DATA_STANDARD))
                    # TODO: Option for a custom schema
                    schema_fields.append({
                        "field_name": MobilityDCATAPToSchema.ckan_field(label_value),
                        "label": label_value,
                        "preset": "select",
                        "choices": MobilityDCATAPToSchema.vocab_choices(g_cvocab_mobility_data_standard)
                    })
                    version_resource = RDFSProperty.from_ds(OWL.versionInfo, ds)
                    label_value = MobilityDCATAPToSchema.get_label(version_resource, ds)
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
    def get_label(p: RDFSProperty, ds: Dataset):
        label = [label for label in get_rdf_object(p, RDFS.label, ds) if (label.is_language_string() and (label.language() == 'en') or not label.is_language_string())]
        if not label:
            print("LABEL NOT KNOWN")
            print(str(get_rdf_object(p, RDFS.label, ds)))
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
        label_value = MobilityDCATAPToSchema.get_label(p, ds)

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