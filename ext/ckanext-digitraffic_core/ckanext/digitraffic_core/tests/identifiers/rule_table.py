"""The identifier rule table shared with the FINAP migration, read for LDK's expectations."""

import csv
from pathlib import Path

RULE_CASES_CSV = Path(__file__).with_name("identifier_rule_cases.csv")


def read_rule_cases(*kinds):
    """`(kind, input, expected)` for the rows of the given kinds; `expected` is the stored value or `ERROR`."""
    with RULE_CASES_CSV.open(encoding="utf-8", newline="") as file:
        rows = csv.DictReader(line for line in file if not line.startswith("#"))
        return [(row["kind"], row["input"], row["ckan"]) for row in rows if row["kind"] in kinds]
