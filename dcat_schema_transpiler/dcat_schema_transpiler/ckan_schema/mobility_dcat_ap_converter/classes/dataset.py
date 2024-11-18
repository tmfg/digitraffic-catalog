from typing import List, Dict

from rdflib import Dataset, URIRef
from rdflib.namespace import DCTERMS, SKOS, DCAT, FOAF, OWL
from rdflib.term import Node

from ckan_schema.mobility_dcat_ap_converter.range_value_converter import (
    RangeValueConverter,
)
from mobility_dcat_ap.dataset import CVOCAB_MOBILITY_THEME, CVOCAB_NUTS, CVOCAB_LAU
from mobility_dcat_ap.namespace import MOBILITYDCATAP
from dcat_schema_transpiler.asset_description_metadata_schema.namespace import ADMS
from dcat_schema_transpiler.rdfs.rdfs_class import RDFSClass
from dcat_schema_transpiler.rdfs.rdfs_property import RDFSProperty
from dcat_schema_transpiler.rdfs.rdfs_resource import RDFSResource


class DCATDataset(RangeValueConverter):

    mandatory_properties = {
        DCTERMS.description,
        DCAT.distribution,
        DCTERMS.accrualPeriodicity,
        MOBILITYDCATAP.mobilityTheme,
        DCTERMS.spatial,
        DCTERMS.title,
        DCTERMS.publisher,
    }

    optional_properties = {OWL.versionInfo, ADMS.versionNotes}

    def __init__(self, clazz: RDFSClass):
        super().__init__(clazz)

    def ckan_field(self, p: RDFSProperty, pointer: str = None) -> str:
        mappings = {
            DCTERMS.description: "notes_translated",
            DCTERMS.accrualPeriodicity: "frequency",
            MOBILITYDCATAP.mobilityTheme: {
                "main": "mobility_theme",
                "sub": "mobility_theme_sub",
            },
            DCTERMS.title: "title_translated",
            DCTERMS.spatial: "spatial",
            OWL.versionInfo: "version",
            ADMS.versionNotes: "version_notes_translated",
        }
        field_value = mappings.get(p.iri)
        if isinstance(field_value, dict):
            field_name = field_value.get(pointer)
        else:
            field_name = field_value

        if field_name is not None:
            return field_name
        else:
            raise ValueError(
                f"A mapping was not found between the class {self.clazz.iri} property {p.iri} and CKAN datamodel using pointer {pointer}"
            )

    def get_label(self, p: RDFSProperty, ds: Dataset):
        if p.is_iri(OWL.versionInfo):
            return "Dataset version"
        if p.is_iri(ADMS.versionNotes):
            return "Version notes"
        return super().get_label(p, ds)

    def get_range_value(self, ds: Dataset, clazz_p: RDFSProperty) -> RDFSClass | None:
        if clazz_p.is_iri(DCTERMS.publisher):
            r_value = RDFSResource.from_ds(FOAF.Agent, ds)
        else:
            r_value = super().get_range_value(ds, clazz_p)
        return r_value

    def get_schema(self, ds: Dataset, clazz_p: RDFSProperty, is_required: bool = None):
        is_required_ = (
            is_required
            if is_required is not None
            else clazz_p.iri in DCATDataset.mandatory_properties
        )
        if clazz_p.iri in DCATDataset.optional_properties:
            is_required_ = False
        properties_union = (
            DCATDataset.mandatory_properties | DCATDataset.optional_properties
        )

        """
        Controlled vocabulary fields.
        """
        if clazz_p.is_iri(MOBILITYDCATAP.mobilityTheme) or clazz_p.is_iri(
            DCTERMS.spatial
        ):
            return self.controlled_vocab_field(clazz_p, ds, is_required_)

        """
        Multilingual fields should have "required: false" at the field level.
        Required input languages are given in separate field "required_languages".
        """
        if (
            clazz_p.is_iri(DCTERMS.title)
            or clazz_p.is_iri(DCTERMS.description)
            or clazz_p.is_iri(ADMS.versionNotes)
        ):
            r_value = super().get_schema(ds, clazz_p, is_required=False)
            return {
                **(
                    r_value
                    | RangeValueConverter.get_translated_field_properties(is_required_)
                )
            }
        if clazz_p.iri in properties_union:
            return super().get_schema(ds, clazz_p, is_required_)
        return None

    def controlled_vocab_field(
        self, p: RDFSProperty, ds: Dataset, is_required: bool
    ) -> List | Dict:
        match p.iri:
            case MOBILITYDCATAP.mobilityTheme:
                g = ds.get_graph(URIRef(CVOCAB_MOBILITY_THEME))
                return [
                    {
                        "field_name": self.ckan_field(p, "main"),
                        "label": "Data content category",
                        "required": is_required,
                        "preset": "select",
                        "form_include_blank_choice": True,
                        "choices": RangeValueConverter.vocab_choices(
                            g,
                            lambda s: (
                                s,
                                SKOS.broader,
                                URIRef(
                                    "https://w3id.org/mobilitydcat-ap/mobility-theme/data-content-category"
                                ),
                            )
                            in g,
                        ),
                    },
                    {
                        "field_name": self.ckan_field(p, "sub"),
                        "label": "Data content sub category",
                        "required": False,
                        "preset": "select",
                        "form_include_blank_choice": True,
                        "validators": "scheming_required scheming_choices mobility_theme_sub_validator",
                        "choices": RangeValueConverter.vocab_choices(
                            g,
                            lambda s: (
                                s,
                                SKOS.broader,
                                URIRef(
                                    "https://w3id.org/mobilitydcat-ap/mobility-theme/data-content-sub-category"
                                ),
                            )
                            in g,
                        ),
                    },
                ]
            case DCTERMS.spatial:
                g_nuts = ds.get_graph(URIRef(CVOCAB_NUTS))
                g_lau = ds.get_graph(URIRef(CVOCAB_LAU))

                def find_top_nuts(concept: Node) -> Node:
                    broader_concept = g_nuts.value(concept, SKOS.broader)
                    if broader_concept is not None:
                        return find_top_nuts(broader_concept)
                    return concept

                def is_finnish_nuts(nuts):
                    if (nuts, None, None) in g_nuts:
                        return (
                            (
                                nuts,
                                URIRef(
                                    "http://publications.europa.eu/ontology/euvoc#status"
                                ),
                                URIRef(
                                    "http://publications.europa.eu/resource/authority/concept-status/CURRENT"
                                ),
                            )
                            in g_nuts
                            and (
                                nuts,
                                URIRef("http://www.w3.org/ns/adms#status"),
                                URIRef(
                                    "http://publications.europa.eu/resource/authority/concept-status/DEPRECATED"
                                ),
                            )
                            not in g_nuts
                            and find_top_nuts(nuts)
                            == URIRef("http://data.europa.eu/nuts/code/FI")
                        )
                    else:
                        return False

                def is_finnish_lau(lau: URIRef):
                    if (lau, None, None) in g_lau:
                        lau_nuts = g_lau.value(lau, SKOS.broadMatch)
                        return find_top_nuts(lau_nuts) == URIRef(
                            "http://data.europa.eu/nuts/code/FI"
                        )
                    return False

                def is_finnish_place(concept: URIRef):
                    return is_finnish_nuts(concept) or is_finnish_lau(concept)

                return {
                    "field_name": self.ckan_field(p),
                    "label": "Location",
                    "required": is_required,
                    "preset": "select",
                    "form_include_blank_choice": True,
                    "choices": RangeValueConverter.vocab_choices(
                        g_nuts + g_lau, is_finnish_place
                    ),
                }
