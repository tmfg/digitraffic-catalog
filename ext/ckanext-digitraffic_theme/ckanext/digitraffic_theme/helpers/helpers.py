import pprint
import copy

from typing import List, Dict, Any
from ckanext.scheming.errors import SchemingException
from ckanext.scheming.helpers import scheming_get_presets


def expand_field_group_fields(fields: List[Dict[str, Any]]):

    def expand(field):
        preset = field.get('preset')
        defined_presets = scheming_get_presets()
        if preset:
            if preset not in defined_presets:
                raise SchemingException('preset \'{}\' not defined'.format(preset))
            field = dict(defined_presets[preset], **field)
        return field

    return [expand(field) for field in fields]

def print_field_and_data(field_name: str, data: dict):
    print('FIELD NAME AND DATA ------>')
    print(f'field_name: {field_name}')
    pprint.pprint(data)
    print('<----- FIELD NAME AND DATA')

def get_subfield_group_data(data: Dict, subfield_data_path: List[str|int]):
    print('get_subfield_group_data --->')
    print(f'subfield_data_path: {subfield_data_path}')
    subfield_data = data
    for element in subfield_data_path:
        print('subfield_data')
        pprint.pprint(subfield_data)
        print(f'is dict: {isinstance(subfield_data, dict)}')
        print(f'is list: {isinstance(subfield_data, list)}')
        if isinstance(subfield_data, dict):
            if subfield_data.get(element) is None:
                return []
            else:
                subfield_data = subfield_data[element]
        elif isinstance(subfield_data, list):
            index = int(element)
            if len(subfield_data) < index:
                return []
            else:
                subfield_data = subfield_data[index]
    print('<-------- get_subfield_group_data')
    return subfield_data

def deep_copy(data: Any):
    return copy.deepcopy(data)


helpers = {
    'expand_field_group_schemas': expand_field_group_fields,
    'print_field_and_data': print_field_and_data,
    'get_subfield_group_data': get_subfield_group_data,
    'deep_copy': deep_copy
}
