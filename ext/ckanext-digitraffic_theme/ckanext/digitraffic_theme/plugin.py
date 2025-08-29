# encoding: utf-8
from typing import Union
import logging

import ckan.plugins as plugins
import ckan.plugins.toolkit as toolkit
from ckan.lib.plugins import DefaultTranslation

import ckanext.digitraffic_theme.actions.digitraffic_user_info as dui_actions
import ckanext.digitraffic_theme.actions.package as package_actions
import ckanext.digitraffic_theme.actions.organization as organization_actions
import ckanext.digitraffic_theme.actions.group as group_actions
import ckanext.digitraffic_theme.actions.user as user_actions
import ckanext.digitraffic_theme.auth.user as user_auth
from ckanext.digitraffic_theme.validators.dataset_validators import (
    value_to_list,
    mobility_theme_sub_validator,
    phone_number_validator,
    spatial_reference_validator,
    dataset_reference_validator,
    is_referenced_by_validator,
    mobility_theme_validator,
    frequency_validator,
    transport_mode_validator,
    theme_validator,
    location_validator,
    language_validator,
    georeferencing_method_validator,
    intended_information_service_validator,
    network_coverage_validator,
    country_validator,
)
from ckanext.digitraffic_theme.validators.common_validators import (
    url_error_message_formatting,
)
from ckanext.digitraffic_theme.validators.resource_validators import (
    set_format_iri,
    data_grammar_validator,
    standard_license_validator,
    communication_method_validator,
    rights_type_validator,
    mobility_data_standard_validator,
    application_layer_protocol_validator,
    character_encoding_validator,
)
from ckanext.digitraffic_theme.helpers.helpers import helpers
from ckanext.digitraffic_theme.search.search import before_dataset_index

from flask import Blueprint

from ckanext.digitraffic_theme.views.digitraffic_edit_view import DigitrafficEditView
from ckanext.digitraffic_theme.views.removed_view import RemovedView


class DigitrafficThemePlugin(plugins.SingletonPlugin, DefaultTranslation):
    """Digitraffic theme plugin."""

    plugins.implements(plugins.ITranslation)
    plugins.implements(plugins.IValidators)
    plugins.implements(plugins.ITemplateHelpers)
    plugins.implements(plugins.IActions)
    plugins.implements(plugins.IAuthFunctions)
    plugins.implements(plugins.IBlueprint)
    plugins.implements(plugins.IPackageController, inherit=True)
    plugins.implements(plugins.IConfigurer)

    def get_validators(self):
        return {
            "value_to_list": value_to_list,
            "mobility_theme_sub_validator": mobility_theme_sub_validator,
            "phone_number_validator": phone_number_validator,
            "spatial_reference_validator": spatial_reference_validator,
            "dataset_reference_validator": dataset_reference_validator,
            "mobility_theme_validator": mobility_theme_validator,
            "is_referenced_by_validator": is_referenced_by_validator,
            "set_format_iri": set_format_iri,
            "frequency_validator": frequency_validator,
            "transport_mode_validator": transport_mode_validator,
            "intended_information_service_validator": intended_information_service_validator,
            "georeferencing_method_validator": georeferencing_method_validator,
            "language_validator": language_validator,
            "location_validator": location_validator,
            "theme_validator": theme_validator,
            "network_coverage_validator": network_coverage_validator,
            "data_grammar_validator": data_grammar_validator,
            "mobility_data_standard_validator": mobility_data_standard_validator,
            "rights_type_validator": rights_type_validator,
            "communication_method_validator": communication_method_validator,
            "standard_license_validator": standard_license_validator,
            "application_layer_protocol_validator": application_layer_protocol_validator,
            "character_encoding_validator": character_encoding_validator,
            "country_validator": country_validator,
            "url_error_message_formatting": url_error_message_formatting,
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

    def before_dataset_index(self, data_dict):
        return before_dataset_index(data_dict)

    def get_actions(self):
        return {
            "user_show": dui_actions.user_show,
            "user_update": dui_actions.user_update,
            "package_create": package_actions.package_create,
            "package_update": package_actions.package_update,
            "package_patch": package_actions.package_patch,
            "organization_create": organization_actions.organization_create,
            "organization_update": organization_actions.organization_update,
            "group_create": group_actions.group_create,
            "group_update": group_actions.group_update,
            "user_create": user_actions.user_create,
            "user_update": user_actions.user_update,
        }

    def get_auth_functions(self):
        return {"user_show": user_auth.user_show, "user_update": user_auth.user_update, "user_list": user_auth.user_list}

    def get_helpers(self):
        return helpers

    def instructions_page(self):
        return toolkit.render("home/instructions.html")

    def logged_out_page(self) -> str:
        return toolkit.redirect_to("home.index")

    def get_blueprint(self) -> Union[list[Blueprint], Blueprint]:
        _remove_routes_blueprint = Blueprint(
            "digitraffic_remove_routes", __name__, template_folder="templates"
        )
        _password_routes_blueprint = Blueprint(
            "digitraffic_password_routes", __name__, template_folder="templates"
        )
        _digitraffic_pages_blueprint = Blueprint(
            "digitraffic_pages", __name__, template_folder="templates"
        )
        _digitraffic_overrides_blueprint = Blueprint(
            "digitraffic_overrides", __name__, template_folder="templates"
        )
        # Override CKAN's default blueprint for /ckan-admin as defined in https://github.com/ckan/ckan/blob/d9a9f8a2cc8ed637cf26f244d3f46877000a4757/ckan/views/admin.py
        _removed_view = RemovedView.as_view("removed")
        _remove_routes_blueprint.add_url_rule(
            "/ckan-admin/config",
            view_func=_removed_view,
            methods=["GET"],
        )
        _remove_routes_blueprint.add_url_rule(
            "/ckan-admin/reset_config",
            view_func=_removed_view,
            methods=["GET"],
        )
        if not toolkit.asbool(toolkit.config.get("debug", False)):
            _remove_routes_blueprint.add_url_rule(
                "/testing/primer",
                view_func=_removed_view,
                methods=["GET"],
            )

        _edit_view = DigitrafficEditView.as_view("edit_user")

        _password_routes_blueprint.add_url_rule("/user/edit", view_func=_edit_view)
        _password_routes_blueprint.add_url_rule("/user/edit/<id>", view_func=_edit_view)

        _digitraffic_pages_blueprint.add_url_rule(
            "/help/instructions",
            view_func=self.instructions_page,
            methods=["GET"],
        )

        _digitraffic_overrides_blueprint.add_url_rule(
            "/user/logged_out_redirect", view_func=self.logged_out_page
        )

        return [
            _remove_routes_blueprint,
            _password_routes_blueprint,
            _digitraffic_pages_blueprint,
            _digitraffic_overrides_blueprint,
        ]
