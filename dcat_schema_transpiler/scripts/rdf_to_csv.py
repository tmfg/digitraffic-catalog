#!/usr/bin/env python3

import sys
import os
import csv
import traceback

from rdflib import Graph, Literal
from rdflib.namespace import SKOS, RDF

import dcat_schema_transpiler.mobility_dcat_ap.dataset as dataset

VOCAB = sys.argv[1]

DATASET_VOCAB = getattr(dataset, VOCAB)

if DATASET_VOCAB is None:
    raise ValueError(f'{VOCAB} does not exist in dataset')

g = Graph()


# fetch_info = dataset.ns_fetch_info(URIRef(VOCAB))


def cvocab_lau_handling(g):
    def is_finnish_lau(lau):
        lau_nuts = g.value(lau, SKOS.broadMatch)
        return str(lau_nuts).startswith("http://data.europa.eu/nuts/code/FI")

    for lau in g.subjects(RDF.type, SKOS.Concept):
        if not is_finnish_lau(lau):
            g.remove((lau, RDF.type, SKOS.Concept))

def cvocab_language_handling(g):
    def is_supported_language(language):
        return str(language) in {'http://publications.europa.eu/resource/authority/language/ENG', 'http://publications.europa.eu/resource/authority/language/FIN', 'http://publications.europa.eu/resource/authority/language/SWE'}
    for language in g.subjects(RDF.type, SKOS.Concept):
        if not is_supported_language(language):
            g.remove((language, RDF.type, SKOS.Concept))


def vocab_specific_handling(g):
    if VOCAB == 'CVOCAB_LAU':
        cvocab_lau_handling(g)
    if VOCAB == 'CVOCAB_LANGUAGE':
        cvocab_language_handling(g)


try:
    fetch_info = dataset.ns_fetch_info(DATASET_VOCAB)
    g.parse(fetch_info.graph_url, format=fetch_info.get_mime_type())

    vocab_specific_handling(g)

    vocab_subjects = list(g.subjects(RDF.type, SKOS.Concept))
    vocab_all_labels = [list(g.objects(subject, SKOS.prefLabel)) for subject in vocab_subjects]

    file_abspath = os.path.abspath(f"./output/{VOCAB}.csv")
    unsupported_file_abspath = os.path.abspath(f"./output/{VOCAB}_unsupported.csv")
    file_dirname = os.path.dirname(file_abspath)
    os.makedirs(file_dirname, exist_ok=True)

    # None is assumed to be english
    supported_languages_order = {
        'en': 0,
        None: 0,
        'fi': 1,
        'sv': 2
    }


    def sort_languages(labels):
        return sorted(labels, key=lambda label: supported_languages_order.get(label.language, None))


    def is_supported_language(label):
        return str(label.language) in {str(key) for key in supported_languages_order.keys()}


    def contains_supported_language(labels):
        return len(list(filter(lambda label: is_supported_language(label), labels))) != 0


    all_used_labels = [sort_languages([label for label in labels if is_supported_language(label)]) for labels in
                       vocab_all_labels]
    labels_without_supported_language = [labels for labels in vocab_all_labels if
                                         not contains_supported_language(labels)]

    most_labels = max(all_used_labels, key=len)


    def add_empty_cells(labels):
        return [labels[index] if len(labels) > index else None for index in range(len(most_labels))]


    print(f'Creating file {file_abspath}')
    with open(file_abspath, 'w', newline='', encoding='utf-8') as csv_file:
        writer = csv.writer(csv_file, delimiter=';')
        writer.writerow([f'Vocabularies for {fetch_info.graph_url}\n\nGenerated using "rdf_to_csv.py {VOCAB}"'])
        writer.writerow([])
        writer.writerow([str(label.language or '-- Language is not known --') for label in most_labels])
        writer.writerows(
            [add_empty_cells([str(label) for label in labels]) for labels in all_used_labels if len(labels) > 0])
    if len(labels_without_supported_language) > 0:
        print(f'Creating file {unsupported_file_abspath}')
        with open(unsupported_file_abspath, 'w', newline='', encoding='utf-8') as csv_file:
            writer = csv.writer(csv_file, delimiter=';')
            writer.writerow([f'Vocabularies for {fetch_info.graph_url}\n\nGenerated using "rdf_to_csv.py {VOCAB}"'])
            writer.writerow([])
            writer.writerow(["word", "language"])
            writer.writerow(["---"])
            for labels in labels_without_supported_language:
                writer.writerows([[str(label), str(label.language)] for label in labels])
                writer.writerow(["---"])
except Exception:
    print(f'ERROR: Failed to create CSV for vocab {VOCAB}')
    print('--->')
    print(traceback.format_exc())
    print('<---')
