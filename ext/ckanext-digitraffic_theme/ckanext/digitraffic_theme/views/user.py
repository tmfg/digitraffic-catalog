from ckan.views.user import EditView
from typing import Optional
from ckan.types import Context, Schema
from ckan.plugins.toolkit import get_validator

class DigitrafficEditView(EditView):
    def _prepare(self, id: Optional[str]) -> tuple[Context, str]:
        context, id = super()._prepare(id)
        context['schema'] = context['schema'] | {
            'dui_phone': [get_validator('remove_whitespace'), get_validator('ignore_missing'), get_validator('unicode_safe'), get_validator('phone_number_validator')],
            'dui_first_name': [get_validator('remove_whitespace'), get_validator('ignore_missing'), get_validator('unicode_safe')],
            'dui_surname': [get_validator('remove_whitespace'), get_validator('ignore_missing'), get_validator('unicode_safe')],
            'dui_country_of_residence': [get_validator('remove_whitespace'), get_validator('ignore_missing'), get_validator('unicode_safe')],
            'dui_county': [get_validator('remove_whitespace'), get_validator('ignore_missing'), get_validator('unicode_safe')],
            'dui_post_code': [get_validator('remove_whitespace'), get_validator('ignore_missing'), get_validator('unicode_safe')],
            'dui_city': [get_validator('remove_whitespace'), get_validator('ignore_missing'), get_validator('unicode_safe')],
            'dui_street_address': [get_validator('remove_whitespace'), get_validator('ignore_missing'), get_validator('unicode_safe')],
        }
        return context, id
