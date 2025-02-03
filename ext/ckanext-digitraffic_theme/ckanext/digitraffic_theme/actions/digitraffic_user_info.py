from typing import Callable, cast
from ckan.types import ActionResult, Context, DataDict, ContextValidator
from ckanext.digitraffic_theme.orm_model.digitraffic_user_info import DigitrafficUserInfo, DigitrafficUserInfoInput
import ckan.plugins.toolkit as toolkit


@toolkit.chained_action
def user_show(original_action: Callable, context: Context, data_dict: DataDict) -> ActionResult.UserShow:
    """
    Adds digitraffic user info to the user data returned by `user_show` action.

    Relies on the CKAN default action to add `user_obj` into context.
    """
    session = context['session']
    user_data = original_action(context, data_dict)

    user_id = context['user_obj'].id
    digitraffic_user_info = DigitrafficUserInfo.get(session, user_id)

    digitraffic_user = {
        'dui_phone': getattr(digitraffic_user_info, 'phone', None),
        'dui_first_name': getattr(digitraffic_user_info, 'first_name', None),
        'dui_surname': getattr(digitraffic_user_info, 'surname', None),
        'dui_country_of_residence': getattr(digitraffic_user_info, 'country_of_residence', None),
        'dui_county': getattr(digitraffic_user_info, 'county', None),
        'dui_post_code': getattr(digitraffic_user_info, 'post_code', None),
        'dui_city': getattr(digitraffic_user_info, 'city', None),
        'dui_street_address': getattr(digitraffic_user_info, 'street_address', None)
    }
    return (user_data or {}) | digitraffic_user


@toolkit.chained_action
def user_update(original_action: Callable, context: Context, data_dict: DataDict) -> ActionResult.UserShow:
    """
    Updates digitraffic user info when user data is updated.

    Relies on the CKAN default action to add `user_obj` into context.
    """
    # The commit is deferred so that both, the original action and this specific action gets to update the database
    # before commit is done
    context['defer_commit'] = True
    session = context['session']

    _add_user_info_schema_fields(context)

    # The original action is called first as it does several things for us. It validates the input and raises an error
    # if some of the inputs are wrong. The data_dict is kept unchanged and error object is filled so the user interface
    # still holds the data the user input and also show the errors. The original action also does authorization. And
    # if everything goes well, it updates the user database record.
    try:
        user_data = original_action(context, data_dict)
    except toolkit.ValidationError as e:
        _remove_dui_prefix_from_error(e)
        raise e
    user_id_of_updated_user = context['user_obj'].id

    user_info_input_data = DigitrafficUserInfoInput(
        phone=data_dict.get('dui_phone'),
        first_name=data_dict.get('dui_first_name'),
        surname=data_dict.get('dui_surname'),
        country_of_residence=data_dict.get('dui_country_of_residence'),
        county=data_dict.get('dui_county'),
        post_code=data_dict.get('dui_post_code'),
        city=data_dict.get('dui_city'),
        street_address=data_dict.get('dui_street_address')
    )
    DigitrafficUserInfo.upsert(session, user_id_of_updated_user, user_info_input_data)
    session.commit()

    return user_data


def _add_user_info_schema_fields(context: Context):
    """
    The context object has a 'schema' field that is used to validate and convert the user inputs. However, the schema
    set by CKAN's default user view only contains the default fields. We need to add digitraffic user info fields into
    this schema.
    """
    schema_validator_names = {
        'dui_phone': ['remove_whitespace', 'ignore_missing', 'unicode_safe', 'phone_number_validator'],
        'dui_first_name': ['remove_whitespace', 'ignore_missing', 'unicode_safe'],
        'dui_surname': ['remove_whitespace', 'ignore_missing', 'unicode_safe'],
        'dui_country_of_residence': ['remove_whitespace', 'ignore_missing', 'unicode_safe'],
        'dui_county': ['remove_whitespace', 'ignore_missing', 'unicode_safe'],
        'dui_post_code': ['remove_whitespace', 'ignore_missing', 'unicode_safe'],
        'dui_city': ['remove_whitespace', 'ignore_missing', 'unicode_safe'],
        'dui_street_address': ['remove_whitespace', 'ignore_missing', 'unicode_safe'],
    }
    dui_schemas = {
        schema_name: [toolkit.get_validator(validator_name) for validator_name in validator_names]
        for schema_name, validator_names
        in schema_validator_names.items()
    }
    context['schema'] = context['schema'] | dui_schemas

def _remove_dui_prefix_from_error(e: toolkit.ValidationError):
    """
    ValidationErrors are shown on the UI. The keys of the error objects are displayed as well. The keys being form input
    names. Digitraffic user info field names are prefixed with 'dui_'. We want to remove that prefix so that the
    error message shown to the user makes more sense.
    """
    error_dict = e.error_dict
    e.error_dict = {
        (str(key).removeprefix('dui_') if str(key).startswith("dui_") else key): msg
        for key, msg
        in error_dict.items()
    }
