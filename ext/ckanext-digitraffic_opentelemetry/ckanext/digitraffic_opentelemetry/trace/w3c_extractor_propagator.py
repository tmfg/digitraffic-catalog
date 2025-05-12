from opentelemetry.trace.propagation.tracecontext import TraceContextTextMapPropagator
from opentelemetry.propagators import textmap

class W3CExtractorPropagator(TraceContextTextMapPropagator):
    """
    Only do the extraction part of the TraceContextTextMapPropagator.
    """
    def inject(
            self,
            carrier: textmap.CarrierT,
            context = None,
            setter: textmap.Setter[textmap.CarrierT] = textmap.default_setter,
    ) -> None:
        pass