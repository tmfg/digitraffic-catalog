#!/usr/bin/env python3

import subprocess

VOCABS = [
    "CVOCAB_MOBILITY_THEME",
    "CVOCAB_FORMAT",
    "CVOCAB_MOBILITY_DATA_STANDARD",
    "CVOCAB_GRAMMAR",
    "CVOCAB_APPLICATION_LAYER_PROTOCOL",
    "CVOCAB_COMMUNICATION_METHOD",
    "CVOCAB_RIGHTS_STATEMENT_TYPE",
    "CVOCAB_LICENSE_IDENTIFIER",
    "CVOCAB_EUV_FREQUENCY",
    "CVOCAB_MOBILITY_DCAT_AP_FREQUENCY",
    "CVOCAB_LANGUAGE",
    "CVOCAB_NUTS",
    "CVOCAB_LAU",
]

for VOCAB_NAME in VOCABS:
    subprocess.run(['poetry', 'run', 'python', 'scripts/rdf_to_csv.py', VOCAB_NAME])