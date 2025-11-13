import pytest
from ckan.tests import helpers


# ckan's clean_db fixture only resets the db before the tests
@pytest.fixture
def clean_db():
    helpers.reset_db()
    yield
    helpers.reset_db()
