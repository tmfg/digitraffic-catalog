from typing import Dict, Literal

import pytest
from ckan.tests import factories, helpers
from ckan import model
import ckan.plugins.toolkit as toolkit

class MockRequest:
    def __init__(self, method: Literal["GET", "POST"], form: Dict[str, str]):
        self.method = method
        self.form = form

@pytest.mark.usefixtures("clean_db", "with_plugins")
class TestUserAuth:
    def test_user_show_self(self):
        user = factories.User()
        context = {"model": model, "user": user["name"]}
        result = helpers.call_auth("user_show", id=user["id"], context=context)
        assert result == True

    def test_user_show_other(self):
        user = factories.User()
        other_user = factories.User()
        context = {"model": model, "user": user["name"]}
        with pytest.raises(toolkit.NotAuthorized):
            helpers.call_auth("user_show", id=other_user["id"], context=context)

    def test_user_show_update_self(self, monkeypatch):
        user = factories.User()
        context = {"model": model, "user": user["name"], "save": False}

        monkeypatch.setattr(toolkit, 'request', self._get_mock_request())

        result = helpers.call_auth("user_update", id=user["id"], context=context)
        assert result == True

    def test_user_show_update_other(self, monkeypatch):
        user = factories.User()
        other_user = factories.User()
        context = {"model": model, "user": user["name"], "save": False}

        monkeypatch.setattr(toolkit, 'request', self._get_mock_request())

        with pytest.raises(toolkit.NotAuthorized):
            helpers.call_auth("user_update", id=other_user["id"], context=context)

    def test_user_update_self(self, monkeypatch):
        user = factories.User()
        context = {"model": model, "user": user["name"]}

        monkeypatch.setattr(toolkit, 'request', self._get_mock_request("POST", {"email": user["email"], "name": user["name"]}))

        result = helpers.call_auth("user_update", id=user["id"], context=context)
        assert result == True

    def test_user_update_self_email(self, monkeypatch):
        user = factories.User()
        context = {"model": model, "user": user["name"]}

        monkeypatch.setattr(toolkit, 'request', self._get_mock_request("POST", {"email": user["email"] + "wrong", "name": user["name"]}))

        with pytest.raises(toolkit.NotAuthorized):
            helpers.call_auth("user_update", id=user["id"], context=context)

    def test_user_update_self_name(self, monkeypatch):
        user = factories.User()
        context = {"model": model, "user": user["name"]}

        monkeypatch.setattr(toolkit, 'request', self._get_mock_request("POST", {"email": user["email"], "name": user["name"] + "wrong"}))

        with pytest.raises(toolkit.NotAuthorized):
            helpers.call_auth("user_update", id=user["id"], context=context)

    def test_user_update_other(self, monkeypatch):
        user = factories.User()
        other_user = factories.User()
        context = {"model": model, "user": user["name"]}

        monkeypatch.setattr(toolkit, 'request', self._get_mock_request("POST", {"first_name": other_user["name"]}))

        with pytest.raises(toolkit.NotAuthorized):
            helpers.call_auth("user_update", id=other_user["id"], context=context)

    def test_sysadmin_update_other(self, monkeypatch):
        admin = factories.Sysadmin()
        other_user = factories.User()
        context = {"model": model, "user": admin["name"]}

        monkeypatch.setattr(toolkit, 'request', self._get_mock_request("POST", {"first_name": other_user["name"]}))

        with pytest.raises(toolkit.NotAuthorized):
            helpers.call_auth("user_update", id=other_user["id"], context=context)

    def _get_mock_request(self, method: Literal["GET","POST"] = None, form: Dict[str, str] = None) -> MockRequest:
        if method is None:
            method: Literal["GET"] = "GET"
        if form is None:
            form = {}
        return MockRequest(method, form)
