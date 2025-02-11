from typing import Dict

from rdflib import Dataset, URIRef
from rdflib.namespace import DCTERMS, RDFS, SKOS

from ckan_schema.mobility_dcat_ap_converter.range_value_converter import (
    RangeValueConverter,
)
from dcat_schema_transpiler.rdfs.rdfs_class import RDFSClass
from dcat_schema_transpiler.rdfs.rdfs_property import RDFSProperty
from dcat_schema_transpiler.rdfs.rdfs_resource import RDFSResource
from mobility_dcat_ap.dataset import CVOCAB_LICENSE_IDENTIFIER


class LicenseDocument(RangeValueConverter):
    iri = DCTERMS.LicenseDocument
    mandatory_properties = set(DCTERMS.identifier)
    optional_properties = set(RDFS.label)

    def __init__(self, clazz: RDFSClass):
        super().__init__(clazz)

    def ckan_field(self, p: RDFSProperty, pointer: str = None) -> str:
        mappings = {DCTERMS.identifier: "license_id",
                    RDFS.label: "license_text"}
        field_name = mappings.get(p.iri)

        if field_name is not None:
            return field_name
        else:
            raise ValueError(
                f"A mapping was not found between the class {self.clazz.iri} property {p.iri} and CKAN datamodel"
            )

    def get_range_value(self, ds: Dataset, clazz_p: RDFSProperty) -> RDFSClass | None:
        if clazz_p.is_iri(DCTERMS.identifier):
            # TODO: Vapaateksti pitäisi olla myös mahdollinen listan sijasta
            r_value = RDFSResource.from_ds(SKOS.Concept, ds)
        else:
            r_value = super().get_range_value(ds, clazz_p)
        return r_value

    def get_schema(self, ds: Dataset, clazz_p: RDFSProperty, is_required: bool = None):
        if clazz_p.is_iri(DCTERMS.identifier):
            return self.controlled_vocab_field(clazz_p, ds, is_required)
        if clazz_p.is_iri(RDFS.label):
            return {
                "field_name": self.ckan_field(clazz_p),
                **super().get_label_with_help_text(clazz_p, ds),
                "preset": "markdown",
                "required": is_required,
            }

        return super().get_schema(ds, clazz_p, is_required)

    def controlled_vocab_field(
        self, p: RDFSProperty, ds: Dataset, is_required: bool
    ) -> Dict:
        match p.iri:
            case DCTERMS.identifier:
                g = ds.get_graph(URIRef(CVOCAB_LICENSE_IDENTIFIER))
                return {
                    "field_name": self.ckan_field(p),
                    "label": "Standard license",
                    "required": is_required,
                    "preset": "select",
                    "form_include_blank_choice": True,
                    "choices": RangeValueConverter.vocab_choices(g),
                }

    def is_property_required(self, property: RDFSProperty) -> bool:
        return property.iri in LicenseDocument.mandatory_properties
