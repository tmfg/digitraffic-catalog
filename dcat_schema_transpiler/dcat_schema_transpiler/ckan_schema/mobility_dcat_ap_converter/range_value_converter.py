import csv
from abc import ABC, abstractmethod
from copy import deepcopy
from enum import Enum
from inspect import signature
from typing import Callable, Dict, List, Optional, Set, Union, Literal

from ckan_schema.mobility_dcat_ap_converter.i18n.translations import (
    VOCABULARY_PATCH_TRANSLATIONS,
    TRANSLATIONS,
)
from mobility_dcat_ap.namespace import MOBILITYDCATAP_NS_URL
from rdflib import Dataset, Graph, URIRef
from rdflib.namespace import DCAM, RDF, RDFS, SKOS

from dcat_schema_transpiler.cache.vocabularies import get_cached_file_path
from dcat_schema_transpiler.rdfs.rdfs_class import RDFSClass
from dcat_schema_transpiler.rdfs.rdfs_literal import RDFSLiteral
from dcat_schema_transpiler.rdfs.rdfs_property import RDFSProperty
from dcat_schema_transpiler.rdfs.rdfs_resource import RDFSResource
from dcat_schema_transpiler.rdfs.util import get_rdf_object


class Necessity(Enum):
    MANDATORY = "mandatory"
    RECOMMENDED = "recommended"
    OPTIONAL = "optional"


class RangeValueConverter(ABC):
    sub_classes: Set[URIRef] = None
    iri: URIRef

    mandatory_properties: Set[URIRef] = set()
    recommended_properties: Set[URIRef] = set()
    optional_properties: Set[URIRef] = set()

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

    @classmethod
    def get_necessity_mapping(cls, property: URIRef) -> Dict[Literal["necessity"], str]:
        """
        Returns the necessity mapping for the given property.
        """
        if property in cls.mandatory_properties:
            return {"necessity": Necessity.MANDATORY.value}
        elif property in cls.recommended_properties:
            return {"necessity": Necessity.RECOMMENDED.value}
        elif property in cls.optional_properties:
            return {"necessity": Necessity.OPTIONAL.value}
        else:
            print(f"mandatory_properties: {cls.mandatory_properties}")
            print(f"recommended_properties: {cls.recommended_properties}")
            print(f"optional_properties: {cls.optional_properties}")
            raise ValueError(
                f"Property {property} is not defined in class {cls.__name__}"
            )

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
                **self.get_necessity_mapping(clazz_p.iri),
            } | self.get_property_label_with_help_text(clazz_p.iri)
        elif isinstance(rdf_range, RDFSResource) and rdf_range.iri == RDFS.Resource:
            # Resurssi tyyppiset näyttää olevan URLeja
            label_value = self.get_label(clazz_p, ds)
            return {
                "field_name": self.ckan_field(clazz_p),
                "label": label_value,
                "required": is_required,
                "help_text": "The value should be URL",
                **self.get_necessity_mapping(clazz_p.iri),
            } | self.get_property_label_with_help_text(clazz_p.iri)
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
    def vocab_choices(
        graph: Graph,
        filter: Union[
            Callable[[URIRef], bool], Callable[[URIRef, Graph], bool]
        ] = lambda s: True,
        iri: URIRef | None = None,
    ):
        def get_label(s):
            labels = [pl for pl in graph.objects(s, SKOS.prefLabel)]
            if labels:
                english = next(
                    (
                        RDFSLiteral(pl).value()
                        for pl in labels
                        if pl.language is None or pl.language == "en"
                    ),
                    None,
                )
                finnish = next(
                    (RDFSLiteral(pl).value() for pl in labels if pl.language == "fi"),
                    None,
                )
                swedish = next(
                    (RDFSLiteral(pl).value() for pl in labels if pl.language == "sv"),
                    None,
                )

                if english:
                    """
                    If the vocabulary itself contains a translation in the appropriate language, use that.
                    If not, see if there is available a patch translation provided by us. If not, use English.
                    """

                    # "Other" appears in many vocabularies and might be the only string needing translation in it
                    # Translate it here to avoid having to separately insert the same string for multiple IRIs
                    if english == "Other" and not finnish:
                        finnish = "Muu"

                    return {
                        "en": english,
                        "fi": (
                            finnish
                            if finnish
                            else (
                                VOCABULARY_PATCH_TRANSLATIONS.get(iri, {})
                                .get(english, {})
                                .get("fi", english)
                                if iri
                                else english
                            )
                        ),
                        "sv": (
                            swedish
                            if swedish
                            else (
                                VOCABULARY_PATCH_TRANSLATIONS.get(iri, {})
                                .get(english, {})
                                .get("sv", english)
                                if iri
                                else english
                            )
                        ),
                    }
                else:
                    print(f"Could not find label for {s}")
                    return RDFSLiteral(labels[0]).value()
            return None

        filter_arg_count = len(signature(filter).parameters)

        return list(
            [
                {"value": str(s), "label": get_label(s)}
                for s, _, _ in graph.triples((None, RDF.type, SKOS.Concept))
                if (
                    filter(URIRef(s), graph)
                    if filter_arg_count == 2
                    else filter(URIRef(s))
                )
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
    def get_translated_field_properties(
        labels: dict,
        is_required: bool,
        is_core_field: bool = True,
    ):
        en_label = labels["en"]
        fi_label = labels.get("fi")
        sv_label = labels.get("sv")

        # labels for multilingual input fields
        fluent_form_label = {
            "en": {
                "en": f"{en_label} in English",
                "fi": (
                    f"{fi_label} englanniksi" if fi_label else f"{en_label} in English"
                ),
                "sv": (
                    f"{sv_label} på engelska" if sv_label else f"{en_label} in English"
                ),
            },
            "fi": {
                "en": f"{en_label} in Finnish",
                "fi": f"{fi_label} suomeksi" if fi_label else f"{en_label} in Finnish",
                "sv": f"{sv_label} på finska" if sv_label else f"{en_label} in Finnish",
            },
            "sv": {
                "en": f"{en_label} in Swedish",
                "fi": f"{fi_label} ruotsiksi" if fi_label else f"{en_label} in Swedish",
                "sv": (
                    f"{sv_label} på svenska" if sv_label else f"{en_label} in Swedish"
                ),
            },
        }
        translated_field_properties = {
            "preset": "fluent_core_translated" if is_core_field else "fluent_text",
            "form_languages": ["en", "fi", "sv"],
            "fluent_form_label": fluent_form_label,
        }

        if is_required:
            return {
                **deepcopy(translated_field_properties),
                "required_languages": ["en"],
            }
        else:
            return deepcopy(translated_field_properties)

    @staticmethod
    def get_validators(validators: List[str] = []):
        validators.insert(0, "scheming_required")
        return " ".join(validators)

    @staticmethod
    def country_filter(country: URIRef, graph: Graph):
        """
        Filters member states from an EU vocabulary of countries and includes or excludes other
        separately specified country IRIs.
        """

        # list here included countries that are not EU members
        included = {
            URIRef("http://publications.europa.eu/resource/authority/country/ISL"),
            URIRef("http://publications.europa.eu/resource/authority/country/NOR"),
        }

        excluded = {
            # not sure what this is but it's not a country
            URIRef("http://publications.europa.eu/resource/authority/country/OP_DATPRO")
        }

        # add EU members here
        for _, _, obj in graph.triples(
            (
                # describes EU member countries
                URIRef("http://publications.europa.eu/resource/authority/country/0005"),
                SKOS.hasTopConcept,
                None,
            )
        ):
            if obj == country and obj not in excluded:
                included.add(obj)

        if country in included:
            return True

        return False

    def get_property_label_with_help_text(
        self, property_iri: URIRef, pointer: str | None = None
    ) -> dict:
        translations = TRANSLATIONS.get(self.iri, {}).get(property_iri, {})
        if pointer:
            return translations.get(pointer, {})
        return translations

    def get_class_label_with_help_text(self) -> dict:
        """
        In some cases a class name might be used as a header/title under which its
        property fields are grouped on the input form. In this case we will just return
        specific fields since there will also be fields representing the properties of the class.
        """
        translations = {
            "label": TRANSLATIONS.get(self.iri, {}).get("label", None),
            **(
                {"help_text": TRANSLATIONS.get(self.iri, {}).get("help_text", None)}
                if TRANSLATIONS.get(self.iri, {}).get("help_text", None)
                else {}
            ),
        }
        return translations

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
