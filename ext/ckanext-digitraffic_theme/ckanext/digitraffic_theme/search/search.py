FIELDS_WITH_REPEATING_SUBFIELDS = ["contact_point", "assessment", "rights_holder"]


def before_dataset_index(data_dict):
    # For indexing purposes, join the texts of repeating subfields into a single string
    # under the key of the containing field. CKAN's default indexing code expects extra
    # fields to contain simple string values which means that indexing will fail
    # if the dict values are left as is.
    for field in FIELDS_WITH_REPEATING_SUBFIELDS:
        if field in data_dict.keys():
            field_texts = []
            for entry in data_dict[field]:
                for key, value in entry.items():
                    if value and isinstance(value, str):
                        field_texts.append(value)
            data_dict[field] = "\n".join(field_texts)
    return data_dict
