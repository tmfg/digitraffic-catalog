# Developing

Run `poetry run python dcat_schema_transpiler/transpiler.py`

This generates the output into `output/schema.yaml`

Also generates a cache into `vocabularies` directory so that subsequent runs do not need to download all the
used vocabularies from the internet.