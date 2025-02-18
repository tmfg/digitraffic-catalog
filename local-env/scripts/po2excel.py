import polib
import pandas as pd
import os
import sys


# Usage: python po2excel.py <source .po or .pot file> <target directory>
# e.g. python po2excel.py .../ext/ckanext-digitraffic_theme/ckanext/digitraffic_theme/i18n/ output


def po_to_excel(po_file_path, excel_file_path):
    po = polib.pofile(po_file_path)

    data = []
    for entry in po:
        data.append({"msgid": entry.msgid, "msgstr": entry.msgstr})

    df = pd.DataFrame(data)

    df.to_excel(excel_file_path, index=False)


current_dir = os.path.dirname(os.path.abspath(__file__))
os.makedirs(os.path.join(current_dir, sys.argv[2]), exist_ok=True)

po_file_path = os.path.join(current_dir, sys.argv[1])
excel_file_path = os.path.join(current_dir, f"{sys.argv[2]}/output.xlsx")

po_to_excel(po_file_path, excel_file_path)
