import csv
from abc import ABC, abstractmethod
from copy import deepcopy
from typing import Callable, Dict, List, Set

from ckan_schema.mobility_dcat_ap_converter.i18n.translations import TRANSLATIONS
from mobility_dcat_ap.namespace import MOBILITYDCATAP_NS_URL
from rdflib import Dataset, Graph, URIRef
from rdflib.namespace import DCAM, RDF, RDFS, SKOS

from dcat_schema_transpiler.cache.vocabularies import get_cached_file_path
from dcat_schema_transpiler.rdfs.rdfs_class import RDFSClass
from dcat_schema_transpiler.rdfs.rdfs_literal import RDFSLiteral
from dcat_schema_transpiler.rdfs.rdfs_property import RDFSProperty
from dcat_schema_transpiler.rdfs.rdfs_resource import RDFSResource
from dcat_schema_transpiler.rdfs.util import get_rdf_object


class RangeValueConverter(ABC):
    sub_classes: Set[URIRef] = None
    iri: URIRef

    def __init__(self, clazz: RDFSClass):
        if not clazz.is_iri(self.__class__.iri):
            raise ValueError(
                f"The given RDF Class must be of correct type. Was given RDFSClass {clazz.iri} and expected {self.__class__.iri}"
            )
        self.clazz = clazz

    @abstractmethod
    def get_range_value(self, ds: Dataset, clazz_p: RDFSProperty) -> RDFSClass | None:
        r = get_rdf_object(clazz_p, RDFS.range, ds) or ()
        r_includes = get_rdf_object(clazz_p, DCAM.rangeIncludes, ds) or ()
        range_inculdes_info = clazz_p.additional_properties.get(
            URIRef(DCAM.rangeIncludes)
        )
        if range_inculdes_info:
            mobility_dcatap_defined_range = [
                r for r in range_inculdes_info if str(r[1]) == MOBILITYDCATAP_NS_URL
            ]
            is_range_include_defined_in_mobility_dcatap = (
                len(mobility_dcatap_defined_range) > 0
            )
            if is_range_include_defined_in_mobility_dcatap:
                return list(
                    filter(
                        lambda p: p.iri == mobility_dcatap_defined_range[0][0],
                        r_includes,
                    )
                )[0]
        obj = r + r_includes
        if not obj:
            print("#### COULD NOT FIND AN OBJECT")
            return None
        r_defined_by_mobility_dcat_ap = tuple(
            o for o in obj if (URIRef(MOBILITYDCATAP_NS_URL) in o.is_defined_by)
        )
        r_defined_by_original = tuple(
            o
            for o in obj
            if URIRef(o.namespace).defrag()
            in map(lambda defined_by: defined_by.defrag(), o.is_defined_by)
        )
        r_defined_by_clazz_ns = tuple(
            o for o in obj if URIRef(self.clazz.namespace) in o.is_defined_by
        )

        r_ordered = (
            r_defined_by_mobility_dcat_ap
            + r_defined_by_original
            + r_defined_by_clazz_ns
            + obj
        )
        return r_ordered[0] if len(r_ordered) > 0 else None

    @abstractmethod
    def get_schema(
        self, ds: Dataset, clazz_p: RDFSProperty | None, is_required: bool = False
    ) -> Dict | None:
        rdf_range = self.get_range_value(ds, clazz_p)
        is_literal = isinstance(rdf_range, RDFSResource) and (
            rdf_range.iri == RDFS.Literal or RDFSLiteral.is_literal_type(rdf_range.iri)
        )
        if is_literal:
            label_value = self.get_label(clazz_p, ds)
            field_name = self.ckan_field(clazz_p)
            return {
                "field_name": field_name,
                "label": label_value,
                "required": is_required,
            } | self.get_label_with_help_text(clazz_p, ds)
        elif isinstance(rdf_range, RDFSResource) and rdf_range.iri == RDFS.Resource:
            # Resurssi tyyppiset näyttää olevan URLeja
            label_value = self.get_label(clazz_p, ds)
            return {
                "field_name": self.ckan_field(clazz_p),
                "label": label_value,
                "required": is_required,
                "help_text": "The value should be URL",
            } | self.get_label_with_help_text(clazz_p, ds)
        else:
            return None

    def get_label(self, p: RDFSProperty, ds: Dataset):
        label = [
            label
            for label in get_rdf_object(p, RDFS.label, ds)
            if (
                label.is_language_string()
                and (label.language() == "en")
                or not label.is_language_string()
            )
        ]
        if not label:
            print("LABEL NOT KNOWN")
            print(str(get_rdf_object(p, RDFS.label, ds)))
            return "not known"
        else:
            return label[0].value()

    @abstractmethod
    def ckan_field(self, p: RDFSProperty, pointer: str = None) -> str:
        """

        :param p: Property of the class for which we want to have a field
        :param pointer: Optional. Some properties might need more than one field on UI to be represented properly.
                        Pointer is used to select the correct one.
        :return:
        """
        pass

    @staticmethod
    def vocab_choices(g: Graph, filter: Callable[[URIRef], bool] = lambda s: True):
        def get_label(s):
            labels = [pl for pl in g.objects(s, SKOS.prefLabel)]
            if labels:
                english = [
                    pl for pl in labels if pl.language is None or pl.language == "en"
                ]
                if english:
                    picked_label = english[0]
                else:
                    picked_label = labels[0]
                return RDFSLiteral(picked_label).value()
            print(f"Could not find label for {s}")
            return None

        return list(
            [
                {"value": str(s), "label": get_label(s)}
                for s, _, _ in g.triples((None, RDF.type, SKOS.Concept))
                if filter(URIRef(s))
            ]
        )

    @staticmethod
    def choices_from_cached_csv(file_name: str, column: str, alternate_column: str):
        with open(get_cached_file_path(file_name), "r") as file:
            reader = csv.DictReader(file)
            column_values = [
                row[column] if column in row and row[column] else row[alternate_column]
                for row in reader
            ]
            return [{"value": value, "label": value} for value in column_values]

    @staticmethod
    def get_translated_field_properties(is_required: bool, is_core_field: bool = True):
        translated_field_properties = {
            "preset": "fluent_core_translated" if is_core_field else "fluent_text",
            "form_languages": ["fi", "en", "sv"],
        }

        if is_required:
            return {
                **deepcopy(translated_field_properties),
                "required_languages": ["en"],
            }
        else:
            return deepcopy(translated_field_properties)

    def get_label_with_help_text(
        self, p: RDFSProperty, ds: Dataset, pointer: str | None = None
    ) -> dict:
        translations = TRANSLATIONS.get(self.iri, {}).get(p.iri, None)
        if pointer and translations.get(pointer):
            return translations.get(pointer)
        return translations if translations else {"label": self.get_label(p, ds)}

    def post_process_schema(self, schema: List[Dict]) -> List[Dict]:
        """
        Acts as a hook to post process the complete schema of the class

        :param schema:
        :return: List[Dict]
        """
        return schema

    @abstractmethod
    def is_property_required(self, property: RDFSProperty) -> bool:
        pass


class AggregateRangeValueConverter(RangeValueConverter):

    @abstractmethod
    def get_aggregate_schema(self) -> Dict | None:
        """
        If the range value is represented as a group of fields, this method can be used
        to create the aggregate part of the schema

        :return: Dict | None
        """
        return None

    @abstractmethod
    def add_to_aggregate(self, shema: Dict) -> None:
        """
        Add schema to the aggregate
        """
        pass
