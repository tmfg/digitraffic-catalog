import inspect

from typing import Dict, Set, Literal, List

from rdflib import Dataset, URIRef
from rdflib.namespace import DCAT

from ckan_schema.mobility_dcat_ap_converter.range_value_converter import (
    RangeValueConverter,
    AggregateRangeValueConverter,
)
from ckan_schema.mobility_dcat_ap_converter.classes.kind import Kind
from ckan_schema.mobility_dcat_ap_converter.classes.assessment import Assessment

from ckan_schema.mobility_dcat_ap_converter.classes.vcard_address import VCARDAddress
from ckan_schema.mobility_dcat_ap_converter.classes.quality_annotation import (
    QualityAnnotation,
)
from dcat_schema_transpiler.namespaces.DCAT_AP import DCATAP
from mobility_dcat_ap.namespace import MOBILITYDCATAP, MOBILITYDCATAP_NS_URL
from dcat_schema_transpiler.rdfs.rdfs_class import RDFSClass
from dcat_schema_transpiler.rdfs.util import ClassPropertiesAggregator
from dcat_schema_transpiler.namespaces.VCARD import VCARD
from dcat_schema_transpiler.namespaces.LOCN import LOCN
from dcat_schema_transpiler.namespaces.DQV import DQV
from rdfs.rdfs_property import RDFSProperty


class ClassConverter:
    """
    A class used to extract info from an RDF class for Ckanext Scheming plugin.

    Attributes:
        clazz (RDFSClass): RDF class that is used to generate necessary info for the scheming plugin
        ds (Dataset): An RDF Dataset that contains all the properties for the given clazz and the
                      RDF classes that the given clazz depends on.

    Methods:
        convert(omit=None, is_required=None) -> list: Returns the info for Ckanext Scheming plugin
    """

    def __init__(self, clazz: RDFSClass, ds: Dataset):
        self.clazz = clazz
        self.ds = ds
        self.__schema_fields = []

    def convert(
        self,
        omit_: Dict[URIRef, Set[URIRef] | Literal["all"]] = None,
        is_required: bool = None,
        parent_class_iri: URIRef = None,
    ) -> List[Dict]:
        """
        Returns the info for Ckanext Scheming plugin.

        Uses the given dataset to find all the relevant RDF properties for the given clazz.
        Uses the clazz to find a proper converter. If the converter returns None for some property, tries to find a new
        converter for the given property based on it's range. Depending on the type of the converter, the results of the
        new converter are either concatenated to existing list of schema, or a nested schema is created. Former for
        RangeValueConverter types and latter for AggregateRangeValueConverter types.

        :param omit_: A dictionary telling which properties to omit. Keys should be RDF classes and the values either
                      the string "all" to omit all properties of the class or a set of URIRefs that tell which
                      properties to omit.
        :param is_required: Tells, if the clazz operated on is considered compulsory
        :return: A list of dictionaries. Each dictionary contains info that is needed by the Ckanext Scheming plugin
        """
        print(f" # Converting {str(self.clazz.iri)} ...")
        if omit_ is None:
            omit = {}
        else:
            omit = omit_

        if self.clazz.iri in omit and omit[self.clazz.iri] == "all":
            return []

        converter = self._get_converter(parent_class_iri)
        class_properties = self._get_main_class_properties()
        sub_class_properties = self._get_sub_class_properties(converter)
        all_properties = class_properties | sub_class_properties
        included_properties = [
            p
            for p in all_properties
            if not (self.clazz.iri in omit and p.iri in omit[self.clazz.iri])
        ]

        if not all_properties:
            # These are vocabularies
            schema = self._get_vocabulary_schema(converter, is_required)
            if schema is not None:
                self._append_schema(schema)
        elif isinstance(converter, AggregateRangeValueConverter):
            for p in included_properties:
                schema = self._get_property_schema(p, converter, omit, is_required)
                self._append_aggregate(schema, converter)
            property_schemas = converter.get_aggregate_schema()
            self._append_schema(property_schemas)
        else:
            for p in included_properties:
                schema = self._get_property_schema(p, converter, omit, is_required)
                self._append_schema(schema)
        self.__schema_fields = converter.post_process_schema(self.__schema_fields)
        print(f" # {str(self.clazz.iri)} converted!")
        return self.__schema_fields

    def _get_vocabulary_schema(self, converter: RangeValueConverter, is_required: bool):
        schema = converter.get_schema(self.ds, None, is_required)
        if schema is None:
            print("WARNING: Schema is None when converting a class")
        return schema

    def _get_property_schema(
        self, p: RDFSProperty, converter: RangeValueConverter, omit, is_required: bool
    ):
        is_property_required = converter.is_property_required(p)
        is_required_ = is_required and is_property_required
        schema = converter.get_schema(self.ds, p, is_required_)

        if schema is None:
            rdf_range = converter.get_range_value(self.ds, p)
            print(
                f"""
Schema was not defined for class {self.clazz.iri} range value converter for property {p.iri}.
Trying to find a converter for the property'f's range value {rdf_range.iri}"""
            )
            range_range_value_converter = ClassConverter(rdf_range, self.ds)
            schema = range_range_value_converter.convert(
                omit, is_required_, parent_class_iri=self.clazz.iri
            )
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

    def _get_class_properties(
        self, clazz: RDFSClass, namespace: URIRef
    ) -> Set[RDFSProperty]:
        aggregator = ClassPropertiesAggregator(self.ds)
        clazz_aggregate = aggregator.class_properties(clazz.iri, namespace)
        return clazz_aggregate.properties | clazz_aggregate.properties_includes

    def _get_class_properties_from_mobility_and_class_ns(self, clazz: RDFSClass):
        graph_namespace = URIRef(MOBILITYDCATAP_NS_URL)
        clazz_aggregate_mobilitydcatap = self._get_class_properties(
            clazz, graph_namespace
        )
        # We do not want to take into account properties set by DCAT or DCATAP.
        # This is because MobilityDCAT-AP has done some modifications based on those vocabularies, including removal
        # of properties
        if clazz.namespace == DCAT._NS or clazz.namespace == DCATAP._NS:
            clazz_aggregate_clazz = None
        else:
            clazz_aggregate_clazz = self._get_class_properties(
                clazz, URIRef(clazz.namespace)
            )

        properties = clazz_aggregate_mobilitydcatap | (
            clazz_aggregate_clazz if clazz_aggregate_clazz is not None else set()
        )
        return properties

    def _get_main_class_properties(self) -> Set[RDFSProperty]:
        return self._get_class_properties_from_mobility_and_class_ns(self.clazz)

    def _get_sub_class_properties(
        self, converter: RangeValueConverter
    ) -> Set[RDFSProperty]:
        all_properties = set()
        if converter.sub_classes:
            for sub_class_iri in converter.sub_classes:
                sub_class = RDFSClass.from_ds(sub_class_iri, self.ds)
                sub_class_properties = (
                    self._get_class_properties_from_mobility_and_class_ns(sub_class)
                )
                all_properties = all_properties | sub_class_properties
        return all_properties

    def _get_converter(self, parent_class_iri: URIRef = None) -> RangeValueConverter:
        def converter_subclasses(clazz: type = None) -> Set[type(RangeValueConverter)]:
            if clazz is None:
                clazz = RangeValueConverter
            subclasses = set()
            for c in clazz.__subclasses__():
                subclasses.add(c)
                sub_subclasses = converter_subclasses(c)
                subclasses = subclasses | sub_subclasses
            return subclasses

        iri_to_converter = {
            converter.iri: converter
            for converter in converter_subclasses()
            if not inspect.isabstract(converter)
        }

        if self.clazz.iri in iri_to_converter:
            return iri_to_converter.get(self.clazz.iri)(self.clazz, parent_class_iri)
        else:
            raise ValueError(
                f"Cannot find a range value converter for class {self.clazz.iri}"
            )
