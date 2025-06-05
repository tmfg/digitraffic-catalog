import ckan.plugins.toolkit as toolkit
from ckan.types import Context, DataDict
from ckan.model.user import User
from enum import Enum

from typing import Callable

# Create enum for user actions
class UserAction(Enum):
    SHOW = "show"
    SHOW_UPDATE = "show_update"
    UPDATE = "update"

def _is_user_accessing_own_data(user_triggering_action: User, acted_on_user: User) -> bool:
    """
    Users can only access and modify their own data. No one else is allowed.
    """
    return user_triggering_action.id == acted_on_user.id

def _is_fixed_fields_unmodified(acted_on_user: User) -> bool:
    """
    Users are not allowed to modify email or username fields.
    """
    try:
        form_values = toolkit.request.form
        is_email_same = form_values.get("email") == acted_on_user.email
        is_name_same = form_values.get("name") == acted_on_user.name
        return is_email_same and is_name_same
    except Exception:
        return False

def _get_acting_and_acted_on_user(context: Context, data_dict: DataDict) -> (User, User):
    user_triggering_action = context.get("auth_user_obj")
    acted_on_user_id_or_name = data_dict.get("id")
    acted_on_user = context["model"].User.get(acted_on_user_id_or_name)

    if user_triggering_action is None:
        raise ValueError("User triggering action is None")

    if acted_on_user is None:
        raise ValueError("Acted on user is None")

    return user_triggering_action, acted_on_user

def _is_user_action_allowed(context: Context, data_dict: DataDict, user_action: UserAction) -> bool:
    try:
        user_triggering_action, acted_on_user = _get_acting_and_acted_on_user(context, data_dict)
        if user_action in {UserAction.SHOW, UserAction.SHOW_UPDATE}:
            return _is_user_accessing_own_data(user_triggering_action, acted_on_user)
        if user_action == UserAction.UPDATE:
            return (_is_user_accessing_own_data(user_triggering_action, acted_on_user) and
                    _is_fixed_fields_unmodified(acted_on_user))
        return False
    except ValueError:
        return False



@toolkit.chained_auth_function
def user_show(next_auth: Callable, context: Context, data_dict: DataDict):
    is_user_action_allowed = _is_user_action_allowed(context, data_dict, UserAction.SHOW)
    if is_user_action_allowed:
        return next_auth(context, data_dict)
    return {"success": False, "msg": "Action is not allowed"}


@toolkit.chained_auth_function
@toolkit.auth_sysadmins_check
def user_update(next_auth: Callable, context: Context, data_dict: DataDict):
    if toolkit.request.method == "GET" and context.get('save', False) == False:
        user_action = UserAction.SHOW_UPDATE
    else:
        user_action = UserAction.UPDATE
    is_user_action_allowed = _is_user_action_allowed(context, data_dict, user_action)
    if is_user_action_allowed:
        return next_auth(context, data_dict)
    return {"success": False, "msg": "Action is not allowed"}
