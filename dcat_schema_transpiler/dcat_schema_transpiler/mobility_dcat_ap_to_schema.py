from rdflib import Dataset
from rdflib.namespace import DCAT, DCTERMS, OWL, FOAF, ORG, SKOS
from typing import List, Dict, Any

from functools import partial

from ckan_schema.mobility_dcat_ap_converter.class_converter import ClassConverter
from ckan_schema.mobility_dcat_ap_converter.classes.dataset import DCATDataset
from ckan_schema.mobility_dcat_ap_converter.classes.agent import Agent
from ckan_schema.mobility_dcat_ap_converter.classes.organization import Organization
from ckan_schema.mobility_dcat_ap_converter.classes.distribution import Distribution
from dcat_schema_transpiler.mobility_dcat_ap.dataset import CNT, OA


from ckan_schema.mobility_dcat_ap_converter.classes.license_document import (
    LicenseDocument,
)
from ckan_schema.mobility_dcat_ap_converter.classes.rights_statement import (
    RightsStatement,
)

from dcat_schema_transpiler.namespaces.DQV import DQV

from ckan_schema.mobility_dcat_ap_converter.classes.locn_address import LOCNAddress

from dcat_schema_transpiler.namespaces.ADMS import ADMS
from dcat_schema_transpiler.namespaces.LOCN import LOCN
from dcat_schema_transpiler.rdfs.rdfs_class import RDFSClass
from mobility_dcat_ap.namespace import MOBILITYDCATAP


def sort_by_field_name(order_list: List[str], field: Dict[str, Any]):
    try:
        return order_list.index(field["field_name"])
    except:
        return 9999


def sort_by_label(field: Dict[str, Any]):
    return field["label"]


def sort_location(field: Dict[str, Any]):
    return (
        0 if "http://data.europa.eu/nuts/code" in field["value"] else 1,
        field["label"],
    )


def sort_dropdowns(schemas: List[Dict[str, Any]]):
    for schema in schemas:
        if schema.get("preset", "") == "select":
            if schema.get("field_name") == "spatial":
                schema["choices"].sort(key=sort_location)
            else:
                schema["choices"].sort(key=sort_by_label)


def sort_repeating_subfields(schemas: List[Dict[str, Any]]):
    for schema in schemas:
        if schema.get("repeating_subfields") is not None:
            schema["repeating_subfields"].sort(key=sort_by_label)


def sort_dataset_fields(dataset_fields: List[Dict[str, Any]]):
    order = [
        "owner_org",
        "title_translated",
        "name",
        "notes_translated",
        "frequency",
        "mobility_theme",
        "mobility_theme_sub",
        "spatial",
        "version",
        "version_notes_translated",
        "language",
        "georeferencing_method",
        "contact_point",
        "network_coverage",
        "conforms_to",
        "intended_information_service",
        "quality_description",
        "assessment",
        "related_resource",
        "is_referenced_by",
    ]
    dataset_fields.sort(key=partial(sort_by_field_name, order))
    sort_repeating_subfields(dataset_fields)
    sort_dropdowns(dataset_fields)


def sort_resource_fields(resource_fields: List[Dict[str, Any]]):
    order = [
        "url",
        "download_url",
        "name_translated",
        "description_translated",
        "format",
        "data_grammar",
        "data_format_notes_translated",
        "character_encoding",
        "communication_method",
        "mobility_data_standard",
        "mobility_data_standard_schema",
        "mobility_data_standard_version",
        "rights_type",
        "license_id",
        "data_service_endpoint_url",
        "data_service_endpoint_description",
        "data_service_title",
        "data_service_description_translated",
        "sample",
    ]
    resource_fields.sort(key=partial(sort_by_field_name, order))
    sort_dropdowns(resource_fields)


def resource_fields(ds: Dataset) -> List:
    print(" # Creating Distribution fields...")
    distribution = RDFSClass.from_ds(DCAT.Distribution, ds)

    ckan_defaults = {DCTERMS.license, DCTERMS.title, DCTERMS.description}

    distribution_fields_to_omit = (
        Distribution.recommended_properties
        | Distribution.optional_properties
        - {
            ADMS.sample,
            CNT.characterEncoding,
            DCAT.accessService,
            DCAT.downloadURL,
            MOBILITYDCATAP.communicationMethod,
            MOBILITYDCATAP.dataFormatNotes,
            MOBILITYDCATAP.grammar,
        }
    ) - ckan_defaults

    class_converter = ClassConverter(distribution, ds)
    resource_fields = class_converter.convert(
        {
            DCAT.Distribution: distribution_fields_to_omit,
            DCTERMS.RightsStatement: RightsStatement.recommended_properties,
            DCTERMS.LicenseDocument: LicenseDocument.optional_properties,
            DCAT.DataService: {
                DCAT.servesDataset,
                DCTERMS.license,
                DCTERMS.accessRights,
            },
        },
        True,
    )

    # append custom field needed to store format iri in ckan
    resource_fields.append(
        {
            "field_name": "format_iri",
            "required": False,
            "form_snippet": None,
            "validators": "set_format_iri",
        }
    )

    sort_resource_fields(resource_fields)

    print(" # Distribution fields created!")

    return resource_fields


def dataset_fields(ds: Dataset) -> List:
    print(" # Creating Dataset fields...")
    catalog_record = RDFSClass.from_ds(DCAT.CatalogRecord, ds)

    class_converter = ClassConverter(catalog_record, ds)

    omitted_catalog_record_fields = {
        # Generated by CKAN
        DCTERMS.created,
        # Generated by CKAN
        DCTERMS.modified,
        # Should be omitted for now
        DCTERMS.language,
        DCTERMS.publisher,
    }

    omitted_dataset_fields = (
        {
            # Dataset publisher is set to the organization
            DCTERMS.publisher
        }
        | (
            DCATDataset.recommended_properties
            - {
                MOBILITYDCATAP.georeferencingMethod,
                DCAT.contactPoint,
                MOBILITYDCATAP.networkCoverage,
                DCTERMS.conformsTo,
                DCTERMS.rightsHolder,
                DCTERMS.temporal,
            }
        )
        | (
            DCATDataset.optional_properties
            - {
                OWL.versionInfo,
                ADMS.versionNotes,
                MOBILITYDCATAP.assessmentResult,
                MOBILITYDCATAP.intendedInformationService,
                DQV.hasQualityAnnotation,
                DCTERMS.language,
                DCTERMS.relation,
                DCTERMS.isReferencedBy,
            }
        )
    )

    all_FOAF_properties = {
        FOAF[name] for name in FOAF.__annotations__.keys() if not name[0].isupper()
    }
    all_ORG_properties = {
        ORG[name] for name in ORG.__annotations__.keys() if not name[0].isupper()
    } | {FOAF.name}
    all_LOCN_properties = {
        LOCN[name] for name in LOCN.__annotations__.keys() if not name[0].isupper()
    }
    relevant_agent_properties = (
        Agent.mandatory_properties
        | Agent.recommended_properties
        | Agent.optional_properties
    )
    relevant_organization_properties = (
        Organization.mandatory_properties
        | Organization.recommended_properties
        | Organization.optional_properties
    )
    relevant_locn_properties = (
        LOCNAddress.mandatory_properties
        | LOCNAddress.recommended_properties
        | LOCNAddress.optional_properties
    )

    omitted_agent_fields = (
        all_FOAF_properties | all_ORG_properties
    ) - relevant_agent_properties
    # org:Organization is a subclass of foaf:Agent. Therefore, it would be correct to include all properties
    # from foaf:Agent class. However, if we did that, it would create an infinite loop when creating fields
    omitted_organization_fields = all_ORG_properties - relevant_organization_properties
    omitted_locn_address_fields = all_LOCN_properties - relevant_locn_properties

    dataset_fields_schema_map = class_converter.convert(
        {
            DCAT.CatalogRecord: omitted_catalog_record_fields,
            DCAT.Distribution: "all",
            DCAT.Dataset: omitted_dataset_fields,
            DQV.QualityAnnotation: {OA.hasTarget},
            FOAF.Agent: omitted_agent_fields,
            ORG.Organization: omitted_organization_fields,
            LOCN.Address: omitted_locn_address_fields,
        },
        True,
    )

    dataset_fields_required_by_ckan = [
        {
            "field_name": "owner_org",
            "label": "Organization",
            "preset": "dataset_organization",
            "required": True,
        },
        {
            "field_name": "name",
            "label": "URL",
            "preset": "dataset_slug",
            "form_placeholder": "eg. my-dataset",
            "required": True,
        },
    ]

    dataset_fields = dataset_fields_required_by_ckan + dataset_fields_schema_map

    sort_dataset_fields(dataset_fields)

    print(" # Dataset fields created!")

    return dataset_fields


def schema(ds: Dataset):
    return {
        "scheming_version": 2,
        "dataset_type": "dataset",
        "dataset_fields": dataset_fields(ds),
        "resource_fields": resource_fields(ds),
    }
