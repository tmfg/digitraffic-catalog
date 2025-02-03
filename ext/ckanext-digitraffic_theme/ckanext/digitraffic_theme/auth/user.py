import ckan.plugins.toolkit as toolkit
from ckan.types import Context, DataDict

from typing import Callable


def _is_user_action_allowed(context: Context, data_dict: DataDict) -> bool:
    """
    Users can only access and modify their own data. No one else is allowed.
    """
    user_triggering_action = context.get('auth_user_obj')
    if user_triggering_action is None:
        return False
    acted_on_user_id_or_name = data_dict.get('id')
    acted_on_user = context['model'].User.get(acted_on_user_id_or_name)
    if user_triggering_action.id != acted_on_user.id:
        return False
    return True

@toolkit.chained_auth_function
def user_show(next_auth: Callable, context: Context, data_dict: DataDict):
    is_user_action_allowed = _is_user_action_allowed(context, data_dict)
    if is_user_action_allowed:
        return next_auth(context, data_dict)
    return {'success': False, 'msg': "Action is not allowed"}

@toolkit.chained_auth_function
def user_update(next_auth: Callable, context: Context, data_dict: DataDict):
    is_user_action_allowed = _is_user_action_allowed(context, data_dict)
    if is_user_action_allowed:
        return next_auth(context, data_dict)
    return {'success': False, 'msg': "Action is not allowed"}