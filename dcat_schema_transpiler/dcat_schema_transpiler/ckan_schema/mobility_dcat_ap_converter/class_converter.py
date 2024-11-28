from typing import Dict, Set, Literal

from rdflib import Dataset, URIRef
from rdflib.namespace import DCAT, DCTERMS

from ckan_schema.mobility_dcat_ap_converter.classes.catalogue_record import (
    CatalogueRecord,
)
from ckan_schema.mobility_dcat_ap_converter.classes.dataset import DCATDataset
from ckan_schema.mobility_dcat_ap_converter.classes.distribution import Distribution
from ckan_schema.mobility_dcat_ap_converter.classes.frequency import Frequency
from ckan_schema.mobility_dcat_ap_converter.classes.license_document import (
    LicenseDocument,
)
from ckan_schema.mobility_dcat_ap_converter.classes.linguistic_system import (
    LinguisticSystem,
)
from ckan_schema.mobility_dcat_ap_converter.classes.media_type_or_extent import (
    MediaTypeOrExtent,
)
from ckan_schema.mobility_dcat_ap_converter.classes.rights_statement import (
    RightsStatement,
)
from ckan_schema.mobility_dcat_ap_converter.range_value_converter import (
    RangeValueConverter,
    AggregateRangeValueConverter,
)
from ckan_schema.mobility_dcat_ap_converter.classes.kind import Kind
from ckan_schema.mobility_dcat_ap_converter.classes.assessment import Assessment

from ckan_schema.mobility_dcat_ap_converter.classes.vcard_address import VCARDAddress
from dcat_schema_transpiler.namespaces.DCAT_AP import DCATAP
from mobility_dcat_ap.namespace import MOBILITYDCATAP_NS_URL, MOBILITYDCATAP
from dcat_schema_transpiler.rdfs.rdfs_class import RDFSClass
from dcat_schema_transpiler.rdfs.util import ClassPropertiesAggregator
from dcat_schema_transpiler.namespaces.VCARD import VCARD
from rdfs.rdfs_property import RDFSProperty


class ClassConverter:

    def __init__(
        self,
        clazz: RDFSClass,
        ds: Dataset,
    ):
        self.clazz = clazz
        self.ds = ds
        self.__schema_fields = []

    def convert(
        self,
        omit_: Dict[URIRef, Set[URIRef] | Literal["all"]] = None,
        is_required: bool = None,
    ):
        if omit_ is None:
            omit = {}
        else:
            omit = omit_

        if self.clazz.iri in omit and omit[self.clazz.iri] == "all":
            return []

        converter = self._get_converter()
        class_properties = self._get_class_properties()

        if not class_properties:
            # These are vocabularies
            schema = self._get_vocabulary_schema(converter, is_required)
            self._append_schema(schema)
        else:
            property_schemas = []
            for p in class_properties:
                is_property_omitted = (
                    self.clazz.iri in omit and p.iri in omit[self.clazz.iri]
                )
                if is_property_omitted:
                    continue
                is_property_required = converter.is_property_required(p)
                is_required_ = is_required and is_property_required
                schema = self._get_property_schema(p, converter, omit, is_required_)

                if isinstance(converter, AggregateRangeValueConverter):
                    self._append_aggregate(schema, converter)
                else:
                    if isinstance(schema, list):
                        for field in schema:
                            property_schemas.append(field)
                    else:
                        property_schemas.append(schema)
            if isinstance(converter, AggregateRangeValueConverter):
                property_schemas = converter.get_aggregate_schema()
            self._append_schema(property_schemas)

        self.__schema_fields = converter.post_process_schema(self.__schema_fields)
        return self.__schema_fields

    def _get_vocabulary_schema(self, converter: RangeValueConverter, is_required: bool):
        schema = converter.get_schema(self.ds, None, is_required)
        if schema is None:
            print("WARNING: Schema is None when converting a class")
        return schema

    def _get_property_schema(
        self, p: RDFSProperty, converter: RangeValueConverter, omit, is_required: bool
    ):
        schema = converter.get_schema(self.ds, p, is_required)

        if schema is None:
            rdf_range = converter.get_range_value(self.ds, p)
            print(
                f"""
Schema was not defined for class {self.clazz.iri} range value converter for property {p.iri}.
Trying to find a converter for the property'f's range value {rdf_range.iri}"""
            )
            range_range_value_converter = ClassConverter(rdf_range, self.ds)
            schema = range_range_value_converter.convert(omit, is_required)
        return schema

    def _append_schema(self, schema):
        if isinstance(schema, list):
            for field in schema:
                self.__schema_fields.append(field)
        else:
            self.__schema_fields.append(schema)

    def _append_aggregate(self, schema, converter: AggregateRangeValueConverter):
        if isinstance(schema, list):
            for field in schema:
                converter.add_to_aggregate(field)
        else:
            converter.add_to_aggregate(schema)

    def _get_class_properties(self) -> Set[RDFSProperty]:
        graph_namespace = URIRef(MOBILITYDCATAP_NS_URL)
        clazz_aggregate_mobilitydcatap = ClassPropertiesAggregator.from_ds_with_graph(
            self.clazz, self.ds, graph_namespace
        )
        # We do not want to take into account properties set by DCAT or DCATAP.
        # This is because MobilityDCAT-AP has done some modifications based on those vocabularies, including removal
        # of properties
        if self.clazz.namespace == DCAT._NS or self.clazz.namespace == DCATAP._NS:
            clazz_aggregate_clazz = None
        else:
            clazz_aggregate_clazz = ClassPropertiesAggregator.from_ds_with_graph(
                self.clazz, self.ds, URIRef(self.clazz.namespace)
            )
        properties = (clazz_aggregate_mobilitydcatap.properties or set()) | (
            (clazz_aggregate_clazz.properties or set())
            if clazz_aggregate_clazz is not None
            else set()
        )
        properties_includes = (
            clazz_aggregate_mobilitydcatap.properties_includes or set()
        ) | (
            (clazz_aggregate_clazz.properties_includes or set())
            if clazz_aggregate_clazz is not None
            else set()
        )
        return properties | properties_includes

    def _get_converter(self) -> RangeValueConverter:
        iri_to_converter: Dict[URIRef, type[RangeValueConverter]] = {
            DCAT.CatalogRecord: CatalogueRecord,
            DCAT.Dataset: DCATDataset,
            DCAT.Distribution: Distribution,
            DCTERMS.Frequency: Frequency,
            DCTERMS.LicenseDocument: LicenseDocument,
            DCTERMS.LinguisticSystem: LinguisticSystem,
            DCTERMS.MediaTypeOrExtent: MediaTypeOrExtent,
            DCTERMS.RightsStatement: RightsStatement,
            VCARD.Kind: Kind,
            VCARD.Address: VCARDAddress,
            MOBILITYDCATAP.Assessment: Assessment,
        }

        if self.clazz.iri in iri_to_converter:
            return iri_to_converter.get(self.clazz.iri)(self.clazz)
        else:
            raise ValueError(
                f"Cannot find a range value converter for class {self.clazz.iri}"
            )
