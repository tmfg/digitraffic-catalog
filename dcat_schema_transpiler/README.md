# Usage

## Schema

Run `poetry run python dcat_schema_transpiler/transpiler.py`

This generates the output into `output/schema.yaml`

Also generates a cache into `vocabularies` directory so that subsequent runs do not need to download all the
used vocabularies from the internet.

## Vocabulary CSV

First, check the variable name of the vocabulary you want to generate from the `dataset.py` file, 
e.g. CVOCAB_MOBILITY_THEME

Run `poetry run python scripts/rdf_to_csv.py VOCAB_NAME`

This generates the output into `output/VOCAB_NAME.csv`
