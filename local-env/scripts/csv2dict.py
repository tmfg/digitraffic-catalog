import csv
import os, sys


def parse_csv_to_dict(file_path):
    result = {}
    current_heading = None

    with open(file_path, "r", encoding="utf-8") as file:
        reader = csv.reader(file, delimiter=";")
        for row in reader:
            if row[0].startswith("http"):
                current_heading = row[0]
                result[current_heading] = (
                    {} if not result.get(current_heading) else result[current_heading]
                )
            elif len(row) == 3 and current_heading:
                en_text, fi_text, sv_text = row
                if en_text:
                    result[current_heading][en_text] = {"fi": fi_text}

    return result


current_dir = os.path.dirname(os.path.abspath(__file__))
os.makedirs(
    os.path.join(
        current_dir,
    ),
    exist_ok=True,
)
file_path = "vocabulary_translations.csv"
po_file_path = os.path.join(current_dir, file_path)
# Example usage

parsed_dict = parse_csv_to_dict(po_file_path)

import pprint

# pprint.pprint(parsed_dict)
print(parsed_dict)
