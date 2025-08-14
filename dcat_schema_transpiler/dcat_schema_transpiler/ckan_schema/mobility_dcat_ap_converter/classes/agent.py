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

    def __init__(self, clazz: RDFSClass, parent_class_iri: URIRef = None):
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
        def common_fields():
            return {
                "field_name": self.ckan_field(clazz_p, None),
                "required": is_required,
            }

        if clazz_p.is_iri(DCTERMS.type):
            schema = self._controlled_vocab_field(clazz_p, ds, is_required)
        elif clazz_p.is_iri(FOAF.mbox):
            schema = {
                **common_fields(),
                "preset": "email",
            }
        elif clazz_p.is_iri(FOAF.phone):
            schema = {
                **common_fields(),
                "preset": "phone",
            }
        elif clazz_p.is_iri(FOAF.workplaceHomepage):
            schema = {
                **common_fields(),
                "preset": "url",
            }
        elif clazz_p.is_iri(FOAF.name):
            schema = super().get_schema(ds, clazz_p, True)
        else:
            schema = super().get_schema(ds, clazz_p, False)

        if schema is None:
            return None
        return {
            **schema,
            **super().get_property_label_with_help_text(clazz_p.iri),
            **super().get_necessity_mapping(clazz_p.iri),
        }

    def _controlled_vocab_field(
        self, p: RDFSProperty, ds: Dataset, is_required: bool
    ) -> List | Dict:
        match p.iri:
            case DCTERMS.type:
                g = ds.get_graph(URIRef(CVOCAB_AGENT_TYPE))
                return {
                    "field_name": self.ckan_field(p),
                    "required": is_required,
                    "preset": "select",
                    "sorted_choices": True,
                    "form_include_blank_choice": True,
                    "choices": RangeValueConverter.vocab_choices(
                        g, vocab=CVOCAB_AGENT_TYPE
                    ),
                }

    def get_aggregate_schema(self) -> Dict:
        return {
            "field_name": Agent.aggregate_field_name,
            **super().get_class_label_with_help_text(),
            "repeating_subfields": self.__aggregate_schemas,
        }

    def add_to_aggregate(self, schema: Dict) -> None:
        self.__aggregate_schemas.append(schema)

    def post_process_schema(self, schema: List[Dict]):
        def rename_field_names(field):
            if field.get("field_name") == Organization.aggregate_field_name:
                field |= {
                    "field_name": self.ckan_field_by_id(ORG.memberOf)
                } | self.get_property_label_with_help_text(ORG.memberOf)
            return field

        for field in schema[0]["repeating_subfields"]:
            rename_field_names(field)
        return schema

    def is_property_required(self, property: RDFSProperty) -> bool:
        return property.iri in Agent.mandatory_properties
