#!/usr/bin/env python3

import sys
import os
import csv

from rdflib import Graph
from rdflib.namespace import SKOS, RDF

import dcat_schema_transpiler.mobility_dcat_ap.dataset as dataset

VOCAB = sys.argv[1]

DATASET_VOCAB = getattr(dataset, VOCAB)

if DATASET_VOCAB is None:
    raise ValueError(f'{VOCAB} does not exist in dataset')

g = Graph()
#fetch_info = dataset.ns_fetch_info(URIRef(VOCAB))

fetch_info = dataset.ns_fetch_info(DATASET_VOCAB)
g.parse(fetch_info.graph_url, format=fetch_info.get_mime_type())

vocab_subjects = list(g.subjects(RDF.type, SKOS.Concept))
vocab_labels = [g.value(subject, SKOS.prefLabel) for subject in vocab_subjects]

file_abspath = os.path.abspath(f"./output/{VOCAB}.csv")
print(f'Creating file {file_abspath}')
file_dirname = os.path.dirname(file_abspath)
os.makedirs(file_dirname, exist_ok=True)
with open(file_abspath, 'w', newline='') as csv_file:
    writer = csv.writer(csv_file)
    writer.writerow([f'Vocabularies for {fetch_info.graph_url}\n\nGenerated using "rdf_to_csv.py {VOCAB}"'])
    writer.writerows([[label] for label in vocab_labels])

