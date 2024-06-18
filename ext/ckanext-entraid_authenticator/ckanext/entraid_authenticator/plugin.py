# encoding: utf-8
import logging
from ckanext.entraid_authenticator import app_config
from ckan import plugins
from ckan.model.user import User
from flask import Blueprint, request, session
from msal import ConfidentialClientApplication
import requests

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

toolkit = plugins.toolkit

# for registering custom routes in the application
custom_blueprint = Blueprint("custom", __name__, template_folder="templates")


class EntraIdAuthenticator(plugins.SingletonPlugin):
    plugins.implements(plugins.IAuthenticator, inherit=True)
    plugins.implements(plugins.IBlueprint)

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.entraid_client = ConfidentialClientApplication(
            client_id=app_config.CLIENT_ID,
            authority=app_config.AUTHORITY,
            client_credential=app_config.CLIENT_SECRET,
        )

    def get_blueprint(self):
        # add route to application for handling Entra ID auth redirects
        custom_blueprint.add_url_rule(
            app_config.REDIRECT_PATH,
            view_func=self.handle_auth,
            methods=["GET"],
        )
        return [custom_blueprint]

    def login(self):
        # auth flow object should be instantiated again for each login attempt
        # store auth flow object in flask session (managed by ckan cookie - name is set in beaker.session.key in ckan.ini)
        session["auth_flow"] = self.entraid_client.initiate_auth_code_flow(
            scopes=app_config.SCOPE,
            redirect_uri=f"{app_config.HOST}{app_config.REDIRECT_PATH}",
        )
        return toolkit.redirect_to(session["auth_flow"]["auth_uri"])

    def handle_auth(self):
        """
        After being redirected from Entra ID authentication,
        handle response containing ID token and access token granting
        read access (defined in app_config.SCOPE) to Microsoft Graph API.
        """
        token_response = self.entraid_client.acquire_token_by_auth_code_flow(
            auth_code_flow=session["auth_flow"], auth_response=request.args
        )

        if "access_token" in token_response:
            access_token = token_response["access_token"]
            headers = {
                "Authorization": f"Bearer {access_token}",
                "Content-Type": "application/json",
            }

            graph_response = requests.get(app_config.GRAPH_ENDPOINT, headers=headers)

            if graph_response.status_code == 200:
                user_info = graph_response.json()
                # identify and log in user based on user data from Graph API

                # create CKAN user if first time logging in (user not found)
            else:
                logger.error("Failed to retrieve user info from Microsoft Graph API")
        else:
            logger.error("No access token found in token response")

        return toolkit.redirect_to("home.index")
