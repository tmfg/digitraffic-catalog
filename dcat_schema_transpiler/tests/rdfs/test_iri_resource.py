from typing import Tuple, List, Dict

from dcat_schema_transpiler.rdfs.iri_resource import iri_resource_factory
from rdflib import Dataset, Namespace, URIRef, Literal
from rdflib.namespace import DefinedNamespace, RDFS, RDF, DCTERMS


def test_iri_resource_factory():
    class MAMMAL(DefinedNamespace):
        _NS = Namespace("http://mammal.example.com#")

        # Classes
        Neocortex: URIRef

    class DOG(DefinedNamespace):
        _NS = Namespace("http://dog.example.com#")

    class CAT(DefinedNamespace):
        _NS = Namespace("http://cat.example.com#")

    class Neocortex:
        def __init__(
            self,
            namespace: Namespace,
            iri: URIRef,
            types: Tuple[URIRef, ...],
            additional_properties: Dict[
                URIRef, List[Tuple[URIRef | Literal, Namespace]]
            ] = None,
            comment: Tuple[Literal, ...] = None,
        ):
            self.namespace = namespace
            self.iri = iri
            self.types = types
            self.additional_properties = additional_properties
            self.comment = comment

    ds = Dataset()

    mammal_neocortex_comment = Literal("Part of brain", "en")
    dog_neocortex_comment = Literal("Smart one", "en")
    cat_neocortex_comment = Literal("Evil one", "en")

    g_mammal = ds.graph(str(MAMMAL._NS))
    g_mammal.add((MAMMAL.Neocortex, RDF.type, RDFS.Class))
    g_mammal.add((MAMMAL.Neocortex, RDFS.comment, mammal_neocortex_comment))

    g_dogs = ds.graph(str(DOG._NS))
    g_dogs.add((URIRef(str(DOG._NS)), DCTERMS.conformsTo, URIRef(str(MAMMAL._NS))))
    g_dogs.add((MAMMAL.Neocortex, RDFS.comment, dog_neocortex_comment))

    g_dogs = ds.graph(str(CAT._NS))
    g_dogs.add((URIRef(str(CAT._NS)), DCTERMS.conformsTo, URIRef(str(MAMMAL._NS))))
    g_dogs.add((MAMMAL.Neocortex, RDFS.comment, cat_neocortex_comment))

    dog_neocortex = iri_resource_factory(
        Neocortex,
        MAMMAL.Neocortex,
        ds,
        properties_from_graph=URIRef(str(DOG._NS)),
        comment=RDFS.comment,
    )

    assert mammal_neocortex_comment in dog_neocortex.comment
    assert dog_neocortex_comment in dog_neocortex.comment
    assert (cat_neocortex_comment, CAT._NS) in dog_neocortex.additional_properties.get(
        RDFS.comment
    )
