# encoding: utf-8
from typing import Optional
from flask import Response
from ckan import plugins


class EntraIdOidcPlugin(plugins.SingletonPlugin):
    plugins.implements(plugins.IAuthenticator)

    def identify(self) -> Optional[Response]:
        # Check if the user has a valid Entra ID JWT
        # If they do, set g.user and g.userobj
        # If they don't, redirect them to the login page
        print("Identifying...")

    def login(self) -> Optional[Response]:
        # Redirect the user to the Entra ID login page
        # return redirect(url_for("entra_id_login"))
        print("Logging in...")

    def logout(self) -> Optional[Response]:
        # Clear the user's Entra ID JWT
        pass

    def abort(self, status_code: int, detail: str, headers=None, comment=None):
        # Handle any errors that occur during the authentication process
        pass
