# encoding: utf-8
from typing import Union

import ckan.plugins as plugins
import ckan.plugins.toolkit as toolkit
from ckan.lib.plugins import DefaultTranslation

import ckanext.digitraffic_theme.actions.digitraffic_user_info as dui_actions
import ckanext.digitraffic_theme.auth.user as user_auth
from ckanext.digitraffic_theme.validators.dataset_validators import (
    mobility_theme_sub_validator,
    phone_number_validator,
    spatial_reference_validator,
    dataset_reference_validator,
    is_referenced_by_validator,
)
from ckanext.digitraffic_theme.validators.resource_validators import set_format_iri
from ckanext.digitraffic_theme.helpers.helpers import helpers
from flask import Blueprint

from ckanext.digitraffic_theme.views.digitraffic_edit_view import DigitrafficEditView
from ckanext.digitraffic_theme.views.removed_view import RemovedView

_remove_routes_blueprint = Blueprint('digitraffic_remove_routes', __name__, template_folder="templates")

_password_routes_blueprint = Blueprint('digitraffic_password_routes', __name__, template_folder="templates")

class DigitrafficThemePlugin(plugins.SingletonPlugin, DefaultTranslation):
    """Digitraffic theme plugin."""

    plugins.implements(plugins.ITranslation)
    plugins.implements(plugins.IValidators)
    plugins.implements(plugins.ITemplateHelpers)
    plugins.implements(plugins.IActions)
    plugins.implements(plugins.IAuthFunctions)
    plugins.implements(plugins.IBlueprint)

    # Declare that this class implements IConfigurer.
    plugins.implements(plugins.IConfigurer)

    def get_validators(self):
        return {
            "mobility_theme_sub_validator": mobility_theme_sub_validator,
            "phone_number_validator": phone_number_validator,
            "spatial_reference_validator": spatial_reference_validator,
            "dataset_reference_validator": dataset_reference_validator,
            "is_referenced_by_validator": is_referenced_by_validator,
            "set_format_iri": set_format_iri,
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

    def get_actions(self):
        return {
            "user_show": dui_actions.user_show,
            "user_update": dui_actions.user_update,
        }

    def get_auth_functions(self):
        return {"user_show": user_auth.user_show, "user_update": user_auth.user_update}

    def get_helpers(self):
        return helpers

    def get_blueprint(self) -> Union[list[Blueprint], Blueprint]:
        # Override CKAN's default blueprint for /ckan-admin as defined in https://github.com/ckan/ckan/blob/d9a9f8a2cc8ed637cf26f244d3f46877000a4757/ckan/views/admin.py
        _remove_routes_blueprint.add_url_rule(
            "/ckan-admin/config",
            view_func=RemovedView.as_view("remove_admin_config"),
            methods=["GET"],
        )
        _remove_routes_blueprint.add_url_rule(
            "/ckan-admin/reset_config",
            view_func=RemovedView.as_view("remove_admin_reset_config"),
            methods=["GET"],
        )
        if not toolkit.asbool(toolkit.config.get("debug", False)):
            _remove_routes_blueprint.add_url_rule(
                "/testing/primer",
                view_func=RemovedView.as_view("remove_testing_primer"),
                methods=["GET"],
            )


        _edit_view = DigitrafficEditView.as_view("edit_user")

        _password_routes_blueprint.add_url_rule('/user/edit', view_func=_edit_view)
        _password_routes_blueprint.add_url_rule('/user/edit/<id>', view_func=_edit_view)
        return [_remove_routes_blueprint, _password_routes_blueprint]
