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

helpers = {
    'expand_field_group_schemas': expand_field_group_fields
}
