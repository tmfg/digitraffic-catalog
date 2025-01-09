from rdflib import Namespace

from ckanext.digitraffic_theme.model.vocabulary import Vocabulary

APPLICATION_LAYER_PROTOCOL = {
    'https://w3id.org/mobilitydcat-ap/application-layer-protocol/amqp',
    'https://w3id.org/mobilitydcat-ap/application-layer-protocol/ftp',
    'https://w3id.org/mobilitydcat-ap/application-layer-protocol/http-https',
    'https://w3id.org/mobilitydcat-ap/application-layer-protocol/mqtt',
    'https://w3id.org/mobilitydcat-ap/application-layer-protocol/ocit',
    'https://w3id.org/mobilitydcat-ap/application-layer-protocol/ots2',
    'https://w3id.org/mobilitydcat-ap/application-layer-protocol/other',
    'https://w3id.org/mobilitydcat-ap/application-layer-protocol/rss',
    'https://w3id.org/mobilitydcat-ap/application-layer-protocol/soap',
    'https://w3id.org/mobilitydcat-ap/application-layer-protocol/grpc',
}


class ApplicationLayerProtocol(Vocabulary):
    iris = APPLICATION_LAYER_PROTOCOL
    namespace = Namespace("https://w3id.org/mobilitydcat-ap/application-layer-protocol/")

    def __init__(self, iri):
        super().__init__(iri)
