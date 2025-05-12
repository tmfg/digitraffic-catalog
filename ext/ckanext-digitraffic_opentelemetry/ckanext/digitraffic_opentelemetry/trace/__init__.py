from opentelemetry.sdk.resources import Resource
from ckanext.digitraffic_opentelemetry.trace.configurer import Configurer, TraceConfig

def configure(resource: Resource, config: TraceConfig):
    configurer = Configurer(resource, config)
    configurer.configure()