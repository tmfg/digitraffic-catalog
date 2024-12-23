# encoding: utf-8
import ckan.plugins as plugins
import ckan.plugins.toolkit as toolkit
from ckan.lib.plugins import DefaultTranslation

from ckanext.digitraffic_theme.validators.dataset_validators import mobility_theme_sub_validator

class DigitrafficThemePlugin(plugins.SingletonPlugin, DefaultTranslation):
    '''Digitraffic theme plugin.
    '''

    plugins.implements(plugins.ITranslation)
    plugins.implements(plugins.IValidators)
    
    # Declare that this class implements IConfigurer.
    plugins.implements(plugins.IConfigurer)

    def get_validators(self):
        return {"mobility_theme_sub_validator": mobility_theme_sub_validator}

    def update_config(self, config):
        # Add this plugin's templates dir to CKAN's extra_template_paths, so
        # that CKAN will use this plugin's custom templates.
        toolkit.add_template_directory(config, 'templates')
        # Add this plugin's public dir to CKAN's extra_public_paths, so
        # that CKAN will use this plugin's custom static files.
        toolkit.add_public_directory(config, 'public')
        # Register this plugin's assets directory with CKAN.
        # Here, 'assets' is the path to the webassets directory
        # (relative to this plugin.py file), and 'digitraffic_theme' is the name
        # that we'll use to refer to this assets directory from CKAN
        # templates.
        toolkit.add_resource('assets', 'digitraffic_theme')
        toolkit.add_resource('assets', 'digitraffic_web_component')