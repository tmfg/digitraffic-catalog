from typing import Dict

from rdflib import DCTERMS, Dataset, SKOS, RDFS, DCAT, FOAF, URIRef

from ckan_schema.mobility_dcat_ap_converter.range_value_converter import RangeValueConverter
from mobility_dcat_ap.dataset import CNT, ADMS, CVOCAB_COMMUNICATION_METHOD, CVOCAB_APPLICATION_LAYER_PROTOCOL
from mobility_dcat_ap.namespace import MOBILITYDCATAP
from dcat_schema_transpiler.rdfs.rdfs_class import RDFSClass
from dcat_schema_transpiler.rdfs.rdfs_property import RDFSProperty
from dcat_schema_transpiler.rdfs.rdfs_resource import RDFSResource


class Distribution(RangeValueConverter):
    mandatory_properties = {DCAT.accessURL, MOBILITYDCATAP.mobilityDataStandard, DCTERMS.format, DCTERMS.rights}
    recommended_properties = {MOBILITYDCATAP.applicationLayerProtocol, DCTERMS.description, DCTERMS.license}
    optional_properties = {  # DCAT.accessService,
        CNT.characterEncoding, MOBILITYDCATAP.communicationMethod,
        MOBILITYDCATAP.dataFormatNotes, DCAT.downloadURL, MOBILITYDCATAP.grammar,
        ADMS.sample, DCTERMS.temporal, DCTERMS.title}

    def __init__(self, clazz: RDFSClass):
        super().__init__(clazz)

    def ckan_field(self, p: RDFSProperty, pointer: str = None) -> str:
        mappings = {
            DCAT.accessURL: 'url',
            DCTERMS.format: 'format',
            DCTERMS.title: 'name',
            DCTERMS.description: 'description'
        }
        field_name = mappings.get(p.iri)

        if field_name is not None:
            return field_name
        else:
            raise ValueError(
                f'A mapping was not found between the class {self.clazz.iri} property {p.iri} and CKAN datamodel')

    def get_range_value(self, ds: Dataset, clazz_p: RDFSProperty) -> RDFSClass | None:
        return super().get_range_value(ds, clazz_p)

    def get_schema(self, ds: Dataset, clazz_p: RDFSProperty, is_required: bool = None):
        properties_union = Distribution.mandatory_properties | Distribution.recommended_properties | Distribution.optional_properties
        is_required_ = is_required if is_required is not None else clazz_p.iri in Distribution.mandatory_properties
        if clazz_p.iri in properties_union:
            if clazz_p.iri in MOBILITYDCATAP.communicationMethod:
                return self.controlled_vocab_field(clazz_p, ds, is_required_)
            if clazz_p.iri in MOBILITYDCATAP.applicationLayerProtocol:
                return self.controlled_vocab_field(clazz_p, ds, is_required_)
            if clazz_p.iri in MOBILITYDCATAP.grammar:
                return self.controlled_vocab_field(clazz_p, ds, is_required_)
            return super().get_schema(ds, clazz_p, is_required_)
        return None

    def controlled_vocab_field(self, p: RDFSProperty, ds: Dataset, is_required: bool) -> Dict:
        label_value = self.get_label(p, ds)
        match p.iri:
            case MOBILITYDCATAP.communicationMethod:
                g = ds.get_graph(URIRef(CVOCAB_COMMUNICATION_METHOD))
                return {
                    "field_name": self.ckan_field(p),
                    "label": label_value,
                    "required": is_required,
                    "preset": "select",
                    "form_include_blank_choice": True,
                    "choices": RangeValueConverter.vocab_choices(g)
                }
            case MOBILITYDCATAP.applicationLayerProtocol:
                g = ds.get_graph(URIRef(CVOCAB_APPLICATION_LAYER_PROTOCOL))
                return {
                    "field_name": self.ckan_field(p),
                    "label": label_value,
                    "required": is_required,
                    "preset": "select",
                    "form_include_blank_choice": True,
                    "choices": RangeValueConverter.vocab_choices(g)
                }
            case MOBILITYDCATAP.grammar:
                g = ds.get_graph(URIRef(CVOCAB_GRAMMAR))
                return {
                    "field_name": self.ckan_field(clazz.iri, p),
                    "label": label_value,
                    "required": is_required,
                    "preset": "select",
                    "form_include_blank_choice": True,
                    "choices": RangeValueConverter.vocab_choices(g)
                }
