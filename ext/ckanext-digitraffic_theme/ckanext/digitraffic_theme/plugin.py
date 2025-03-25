# encoding: utf-8
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
    mobility_theme_validator,
    frequency_validator,
    transport_mode_validator,
    theme_validator,
    location_validator,
    language_validator,
    georeferencing_method_validator,
    intended_information_service_validator,
    network_coverage_validator,
)
from ckanext.digitraffic_theme.validators.resource_validators import (
    set_format_iri,
    data_grammar_validator,
    standard_license_validator,
    communication_method_validator,
    rights_type_validator,
    mobility_data_standard_validator,
    application_layer_protocol_validator,
)
from ckanext.digitraffic_theme.helpers.helpers import helpers
from ckanext.digitraffic_theme.search.search import before_dataset_index

from flask import Blueprint

digitraffic_blueprint = Blueprint("digitraffic", __name__, template_folder="templates")


class DigitrafficThemePlugin(plugins.SingletonPlugin, DefaultTranslation):
    """Digitraffic theme plugin."""

    plugins.implements(plugins.ITranslation)
    plugins.implements(plugins.IValidators)
    plugins.implements(plugins.ITemplateHelpers)
    plugins.implements(plugins.IActions)
    plugins.implements(plugins.IAuthFunctions)
    plugins.implements(plugins.IPackageController, inherit=True)

    # Declare that this class implements IConfigurer.
    plugins.implements(plugins.IConfigurer)

    def get_validators(self):
        return {
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
        }

    def get_auth_functions(self):
        return {"user_show": user_auth.user_show, "user_update": user_auth.user_update}

    def get_helpers(self):
        return helpers
