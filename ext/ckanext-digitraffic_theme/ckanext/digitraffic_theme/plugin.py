# encoding: utf-8
import pprint
import ckan.plugins as plugins
import ckan.plugins.toolkit as toolkit
from typing import Callable
from ckan.lib.plugins import DefaultTranslation
from ckan.types import ActionResult, Context, DataDict
from ckanext.digitraffic_theme.views.user import DigitrafficEditView
from ckanext.digitraffic_theme.orm_model.digitraffic_user_info import DigitrafficUserInfo, DigitrafficUserInfoInput

from ckanext.digitraffic_theme.validators.dataset_validators import (
    mobility_theme_sub_validator,
    phone_number_validator,
    spatial_reference_validator,
)
from ckanext.digitraffic_theme.helpers.helpers import helpers
from flask import Blueprint

digitraffic_blueprint = Blueprint("digitraffic", __name__, template_folder="templates")

@toolkit.chained_action
def user_show(original_action: Callable, context: Context, data_dict: DataDict) -> ActionResult.UserShow:
    """
    Adds digitraffic user info to the user data returned by `user_show` action.

    Relies on the CKAN default action to add `user_obj` into context.

    TODO: The default authorization is to let any logged-in user to see user info. Should we keep this?
    """
    print("####################### user_show #####################")
    session = context['session']
    user_data = original_action(context, data_dict)

    user_id = context['user_obj'].id
    digitraffic_user_info = DigitrafficUserInfo.get(session, user_id)

    print(f'user_id: {user_id}')
    print('digitraffic_user_info')
    pprint.pprint(digitraffic_user_info)

    digitraffic_user = {
        'digitraffic_user': {
            'phone': getattr(digitraffic_user_info, 'phone', None),
            'first_name': getattr(digitraffic_user_info, 'first_name', None),
            'surname': getattr(digitraffic_user_info, 'surname', None),
            'country_of_residence': getattr(digitraffic_user_info, 'country_of_residence', None),
            'county': getattr(digitraffic_user_info, 'county', None),
            'post_code': getattr(digitraffic_user_info, 'post_code', None),
            'city': getattr(digitraffic_user_info, 'city', None),
            'street_address': getattr(digitraffic_user_info, 'street_address', None)
        }
    }
    return (user_data or {}) | digitraffic_user

@toolkit.chained_action
def user_update(original_action: Callable, context: Context, data_dict: DataDict) -> ActionResult.UserShow:
    """
    Updates digitraffic user info when user data is updated.

    Relies on the CKAN default action to add `user_obj` into context.
    """
    print("####################### user_update #####################")
    context['defer_commit'] = True
    user_data = original_action(context, data_dict)
    updated_user_id = context['user_obj'].id
    session = context['session']

    print(f'updated_user_id: {updated_user_id}')
    print('data_dict')
    pprint.pprint(data_dict)
    user_info_input_data = DigitrafficUserInfoInput(
        phone=data_dict.get('phone'),
        first_name=data_dict.get('first_name'),
        surname=data_dict.get('surname'),
        country_of_residence=data_dict.get('country_of_residence'),
        county=data_dict.get('county'),
        post_code=data_dict.get('post_code'),
        city=data_dict.get('city'),
        street_address=data_dict.get('street_address')
    )
    digitraffic_user_info = DigitrafficUserInfo.upsert(session, updated_user_id, user_info_input_data)
    session.commit()
    digitraffic_user = {
        'digitraffic_user': {
            'phone': getattr(digitraffic_user_info, 'phone', None),
            'first_name': getattr(digitraffic_user_info, 'first_name', None),
            'surname': getattr(digitraffic_user_info, 'surname', None),
            'country_of_residence': getattr(digitraffic_user_info, 'country_of_residence', None),
            'county': getattr(digitraffic_user_info, 'county', None),
            'post_code': getattr(digitraffic_user_info, 'post_code', None),
            'city': getattr(digitraffic_user_info, 'city', None),
            'street_address': getattr(digitraffic_user_info, 'street_address', None)
        }
    }
    return (user_data or {}) | digitraffic_user
    #user_data = original_action(context, data_dict)
    #return (user_data or {}) | digitraffic_user



class DigitrafficThemePlugin(plugins.SingletonPlugin, DefaultTranslation):
    """Digitraffic theme plugin."""

    plugins.implements(plugins.ITranslation)
    plugins.implements(plugins.IValidators)
    plugins.implements(plugins.ITemplateHelpers)
    plugins.implements(plugins.IBlueprint)
    plugins.implements(plugins.IActions)

    # Declare that this class implements IConfigurer.
    plugins.implements(plugins.IConfigurer)

    def get_validators(self):
        return {
            "mobility_theme_sub_validator": mobility_theme_sub_validator,
            "phone_number_validator": phone_number_validator,
            "spatial_reference_validator": spatial_reference_validator,
        }

    def update_config(self, config):
        # Add this plugin's templates dir to CKAN's extra_template_paths, so
        # that CKAN will use this plugin's custom templates.
        toolkit.add_template_directory(config, "templates")
        # Add this plugin's public dir to CKAN's extra_public_paths, so
        # that CKAN will use this plugin's custom static files.
        toolkit.add_public_directory(config, "public")
        # Register this plugin's assets directory with CKAN.
        # Here, 'assets' is the path to the webassets directory
        # (relative to this plugin.py file), and 'digitraffic_theme' is the name
        # that we'll use to refer to this assets directory from CKAN
        # templates.
        toolkit.add_resource("assets", "digitraffic_theme")
        toolkit.add_resource("assets", "digitraffic_web_component")

    def get_blueprint(self):
        #_edit_view = DigitrafficEditView.as_view('edit')
        #digitraffic_blueprint.add_url_rule('/user/edit', view_func=_edit_view)
        #digitraffic_blueprint.add_url_rule('/user/edit/<id>', view_func=_edit_view)
        return [digitraffic_blueprint]

    def get_actions(self):
        return {
            'user_show': user_show,
            'user_update': user_update
        }

    def get_helpers(self):
        return helpers
