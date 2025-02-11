from typing import Dict, List

from rdflib import Dataset, URIRef
from rdflib.namespace import DCTERMS, ORG, FOAF


from dcat_schema_transpiler.rdfs.rdfs_class import RDFSClass
from dcat_schema_transpiler.rdfs.rdfs_property import RDFSProperty

from dcat_schema_transpiler.namespaces.LOCN import LOCN
from mobility_dcat_ap.dataset import CVOCAB_AGENT_TYPE

from ckan_schema.mobility_dcat_ap_converter.classes.organization import Organization
from ckan_schema.mobility_dcat_ap_converter.range_value_converter import (
    RangeValueConverter,
    AggregateRangeValueConverter,
)

class Agent(AggregateRangeValueConverter):
    iri = FOAF.Agent
    aggregate_field_name = "foaf_agent"
    sub_classes = {FOAF.Person, ORG.Organization}

    mandatory_properties = {
        FOAF.name,
    }

    recommended_properties = {
        DCTERMS.type,
    }

    optional_properties = {
        LOCN.address,
        ORG.memberOf,
        FOAF.mbox,
        FOAF.firstName,
        FOAF.phone,
        FOAF.surname,
        FOAF.workplaceHomepage,
    }

    def __init__(self, clazz: RDFSClass):
        super().__init__(clazz)
        self.__aggregate_schemas = []

    def ckan_field_by_id(self, p: URIRef, pointer: str = None) -> str:
        mappings = {
            FOAF.name: "name",
            DCTERMS.type: "type",
            LOCN.address: "address",
            ORG.memberOf: "member_of",
            FOAF.mbox: "mbox",
            FOAF.firstName: "first_name",
            FOAF.phone: "phone",
            FOAF.surname: "surname",
            FOAF.workplaceHomepage: "workplace_homepage",
        }
        return mappings.get(p)

    def ckan_field(self, p: RDFSProperty, pointer: str = None) -> str:
        return self.ckan_field_by_id(p.iri)

    def get_range_value(self, ds: Dataset, clazz_p: RDFSProperty) -> RDFSClass | None:
        return super().get_range_value(ds, clazz_p)

    def get_schema(
        self, ds: Dataset, clazz_p: RDFSProperty | None, is_required: bool = None
    ):
        if clazz_p.is_iri(DCTERMS.type):
            return self.controlled_vocab_field(clazz_p, ds, is_required)
        if clazz_p.is_iri(FOAF.mbox):
            return {
                "field_name": self.ckan_field(clazz_p, None),
                **super().get_label_with_help_text(clazz_p, ds),
                "required": is_required,
                "preset": "email",
            }
        if clazz_p.is_iri(FOAF.phone):
            return {
                "field_name": self.ckan_field(clazz_p, None),
                **super().get_label_with_help_text(clazz_p, ds),
                "required": is_required,
                "preset": "phone",
            }
        if clazz_p.is_iri(FOAF.workplaceHomepage):
            return {
                "field_name": self.ckan_field(clazz_p, None),
                **super().get_label_with_help_text(clazz_p, ds),
                "required": is_required,
                "preset": "url",
            }
        schema = super().get_schema(ds, clazz_p, False)
        return schema

    def controlled_vocab_field(
        self, p: RDFSProperty, ds: Dataset, is_required: bool
    ) -> List | Dict:
        match p.iri:
            case DCTERMS.type:
                g = ds.get_graph(URIRef(CVOCAB_AGENT_TYPE))
                return {
                    "field_name": self.ckan_field(p),
                    **super().get_label_with_help_text(p, ds),
                    "required": is_required,
                    "preset": "select",
                    "form_include_blank_choice": True,
                    "choices": RangeValueConverter.vocab_choices(g),
                }

    def get_aggregate_schema(self) -> Dict:
        return {
            "field_name": Agent.aggregate_field_name,
            "label": "Fieldset",
            "repeating_subfields": self.__aggregate_schemas,
        }

    def add_to_aggregate(self, schema: Dict) -> None:
        self.__aggregate_schemas.append(schema)

    def post_process_schema(self, schema: List[Dict]):
        def rename_field_names(field):
            if field.get("field_name") == Organization.aggregate_field_name:
                field["field_name"] = self.ckan_field_by_id(ORG.memberOf)
                field["label"] = {"en": "Member of", "fi": "Jäsenyydet"}
            return field

        for field in schema[0]["repeating_subfields"]:
            rename_field_names(field)
        return schema

    def is_property_required(self, property: RDFSProperty) -> bool:
        return property.iri in Agent.mandatory_properties
