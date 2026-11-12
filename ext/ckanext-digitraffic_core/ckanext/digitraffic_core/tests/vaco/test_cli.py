import logging

import pytest
from ckanext.digitraffic_core.vaco import cli as cli_module
from ckanext.digitraffic_core.vaco.login import TrivoreLoginError


class RecordingHandler(logging.Handler):
    def __init__(self):
        super().__init__(level=logging.ERROR)
        self.records: list[logging.LogRecord] = []

    def emit(self, record):
        self.records.append(record)


@pytest.fixture
def errors():
    handler = RecordingHandler()
    logger = logging.getLogger(cli_module.__name__)
    # Loading the logging settings of test.ini turns off loggers that already exist
    disabled = logger.disabled
    logger.disabled = False
    logger.addHandler(handler)
    yield handler.records
    logger.removeHandler(handler)
    logger.disabled = disabled


@pytest.mark.usefixtures("vaco_table")
@pytest.mark.ckan_config(cli_module.VACO_ENABLED, "true")
class TestCommandFailure:
    @pytest.mark.ckan_config(cli_module.API_BASE_URL, "https://vaco.example")
    @pytest.mark.ckan_config(cli_module.TOKEN_URL, "https://trivore.example/token")
    @pytest.mark.ckan_config(cli_module.CLIENT_ID, "client")
    @pytest.mark.ckan_config(cli_module.CLIENT_SECRET, "secret")
    def test_an_error_that_stops_the_job_is_logged(self, cli, errors, monkeypatch):
        def fail(client):
            raise TrivoreLoginError("Trivore token request returned 401")

        monkeypatch.setattr(cli_module, "poll_all", fail)

        result = cli.invoke(cli_module.poll, [])

        assert result.exit_code == 1
        [record] = errors
        assert record.exc_info[0] is TrivoreLoginError
