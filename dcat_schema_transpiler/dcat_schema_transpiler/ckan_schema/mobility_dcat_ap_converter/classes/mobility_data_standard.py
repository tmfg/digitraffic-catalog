from typing import Dict

from rdflib import Dataset, OWL, URIRef

from ckan_schema.mobility_dcat_ap_converter.range_value_converter import RangeValueConverter
from mobility_dcat_ap.dataset import CVOCAB_MOBILITY_DATA_STANDARD
from mobility_dcat_ap.namespace import MOBILITYDCATAP
from dcat_schema_transpiler.rdfs.rdfs_class import RDFSClass
from dcat_schema_transpiler.rdfs.rdfs_property import RDFSProperty


class MobilityDataStandard(RangeValueConverter):
    def __init__(self, clazz: RDFSClass):
        super().__init__(clazz)

    def ckan_field(self, p: RDFSProperty, pointer: str = None) -> str:
        mappings = {
            MOBILITYDCATAP.schema: 'mobility_data_standard_schema',
            OWL.versionInfo: 'mobility_data_standard_version'
        }
        field_name = mappings.get(p.iri)

        if field_name is not None:
            return field_name
        else:
            raise ValueError(f'A mapping was not found between the class {self.clazz.iri} property {p.iri} and CKAN datamodel')

    def get_range_value(self, ds: Dataset, clazz_p: RDFSProperty) -> RDFSClass | None:
        return super().get_range_value(ds, clazz_p)

    def get_schema(self, ds: Dataset, clazz_p: RDFSProperty, is_required: bool = False):
        # TODO MobilityDataStandard has some special rules. It has a controlled vocabulary as an option
        # but a custom schema should also be supported
        label_value = RangeValueConverter.get_label(clazz_p, ds)

        if clazz_p.is_iri(OWL.versionInfo):
            return {
                "field_name": self.ckan_field(clazz_p),
                "label": label_value,
                "required": is_required,
                "help_text": 'Version of the mobility data standard. Use only short version identifiers, e.g., only  "3.2", without redundant acronyms such as "v", underscores etc.'
            }
        if clazz_p.is_iri(MOBILITYDCATAP.schema):
            return self.controlled_vocab_field(clazz_p, ds, is_required)
        raise Exception('Should not get to this point')

    def controlled_vocab_field(self, p: RDFSProperty, ds: Dataset, is_required: bool) -> Dict:
        match p.iri:
            case MOBILITYDCATAP.schema:
                g = ds.get_graph(URIRef(CVOCAB_MOBILITY_DATA_STANDARD))
                return {
                    "field_name": self.ckan_field(p),
                    "label": "Mobility data standard",
                    "required": is_required,
                    "preset": "select",
                    "form_include_blank_choice": True,
                    "choices": RangeValueConverter.vocab_choices(g)
                }
