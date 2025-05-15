import logging

import ckan.plugins.toolkit as toolkit
from opentelemetry import trace

logger = logging.getLogger(__name__)

class SpanEventHandler(logging.Handler):
    """
    Handler to add the log message into current span as event
    """
    def emit(self, record: logging.LogRecord) -> None:
        span = trace.get_current_span()
        if record.exc_info:
            span.set_status(trace.status.Status(trace.status.StatusCode.ERROR))
            span.record_exception(record.exc_info[1])
            is_pdb_started = toolkit.config.get("digitraffic_opentelemetry.enter_pdb_on_error")
            if is_pdb_started:
                logger.error("Exception happened. Entering pdb...")
                span.end()
                import pdb
                def all_exceptions(e: BaseException) -> list[BaseException]:
                    exceptions = []
                    higher_e = e.__cause__ or e.__context__
                    if higher_e:
                        es = all_exceptions(higher_e)
                        exceptions.extend(es)
                    exceptions.append(e)
                    return exceptions
                exceptions = all_exceptions(record.exc_info[1])
                logger.info(f"FOUND {len(exceptions)} errors! Starting pdb for each of them one at the time.")
                for e in reversed(exceptions):
                    if e == record.exc_info[1]:
                        tb = record.exc_info[2]
                    else:
                        tb = e.__traceback__
                    if tb is None:
                        logger.info("Traceback is None. Cannot open pdb.")
                    else:
                        print(f"Starting pdb for {e} ...")
                        print(e.__traceback__)
                        pdb.post_mortem(e.__traceback__)
        if span.is_recording():
            span.add_event(
                name=record.getMessage(),
                attributes={
                    "logger_name": record.name,
                    "level": record.levelname,
                },
            )
