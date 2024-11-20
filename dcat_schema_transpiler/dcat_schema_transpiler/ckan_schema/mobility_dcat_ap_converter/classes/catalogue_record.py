from rdflib import DCTERMS, Dataset, DCAT, FOAF, URIRef

from ckan_schema.mobility_dcat_ap_converter.range_value_converter import (
    RangeValueConverter,
)
from dcat_schema_transpiler.rdfs.rdfs_class import RDFSClass
from dcat_schema_transpiler.rdfs.rdfs_property import RDFSProperty
from dcat_schema_transpiler.rdfs.rdfs_resource import RDFSResource


class CatalogueRecord(RangeValueConverter):
    mandatory_properties = {
        DCTERMS.created,
        DCTERMS.language,
        FOAF.primaryTopic,
        DCTERMS.modified,
    }
    recommended_properties = {
    }

    optional_properties = {
        DCTERMS.publisher,
    }

    def __init__(self, clazz: RDFSClass):
        super().__init__(clazz)

    def ckan_field(self, p: RDFSProperty, pointer: str = None) -> str:
        mappings = {
            # DCTERMS.language: "metadata_language" <---- should be left out of the schema for now
        }
        field_name = mappings.get(p.iri)

        if field_name is not None:
            return field_name
        else:
            raise ValueError(
                f"A mapping was not found between the class {self.clazz.iri} property {p.iri} and CKAN datamodel"
            )

    def get_range_value(self, ds: Dataset, clazz_p: RDFSProperty) -> RDFSClass | None:
        if clazz_p.is_iri(FOAF.primaryTopic):
            r_value = RDFSResource.from_ds(DCAT.Dataset, ds)
        else:
            r_value = super().get_range_value(ds, clazz_p)
        return r_value

    def get_schema(self, ds: Dataset, clazz_p: RDFSProperty, is_required: bool = None):
        is_required_ = is_required and clazz_p.iri in CatalogueRecord.mandatory_properties
        if clazz_p.iri in CatalogueRecord.mandatory_properties:
            return super().get_schema(
                ds,
                clazz_p,
                (
                    is_required_
                    if is_required is not None
                    else clazz_p.iri in CatalogueRecord.mandatory_properties
                ),
            )
        return None
