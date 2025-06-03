from opentelemetry.sdk.resources import Resource
from ckanext.digitraffic_opentelemetry.log.configurer import Configurer, LogConfig

def configure(resource: Resource, config: LogConfig):
    configurer = Configurer(resource, config)
    configurer.configure()