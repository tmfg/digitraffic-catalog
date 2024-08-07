# encoding: utf-8
import logging
from ckanext.entraid_authenticator import app_config
from ckanext.entraid_authenticator.model.entra_id import (
    GraphApiUserInfo,
    IdTokenClaims,
    is_auth_code_flow_token_response,
)
from ckanext.entraid_authenticator.util.user import create_user_from_graph_api_info
from ckan import plugins
import ckan.model as model
from flask import Blueprint, request, session
from msal import ConfidentialClientApplication
from ckan.lib.helpers import flash_error
import requests

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

toolkit = plugins.toolkit

# for registering custom routes in the application
custom_blueprint = Blueprint("custom", __name__, template_folder="templates")


class EntraIdAuthenticator(plugins.SingletonPlugin):
    """
    Replaces CKAN's default login functionality with Microsoft Entra ID authentication
    using OAuth 2.0 authorization code flow.
    https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-auth-code-flow
    """

    plugins.implements(plugins.IAuthenticator, inherit=True)
    plugins.implements(plugins.IBlueprint)

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.entraid_client = ConfidentialClientApplication(
            client_id=app_config.CLIENT_ID,
            authority=app_config.AUTHORITY,
            client_credential=app_config.CLIENT_SECRET,
        )
        self.AUTH_FLOW_SESSION_KEY = "auth_flow"
        logger.info(f"Redirect URI: {app_config.HOST}{app_config.REDIRECT_PATH}")

    def get_blueprint(self):
        # add route to application for handling Entra ID auth redirects
        custom_blueprint.add_url_rule(
            app_config.REDIRECT_PATH,
            view_func=self.handle_auth_redirect,
            methods=["GET"],
        )

        # override path for registering an account
        custom_blueprint.add_url_rule(
            "/user/register",
            view_func=self.redirect_to_home,
            methods=["GET"],
        )

        # override path for resetting a password
        custom_blueprint.add_url_rule(
            "/user/reset",
            view_func=self.redirect_to_home,
            methods=["GET"],
        )

        return [custom_blueprint]

    def login(self):
        # auth flow object should be instantiated again for each login attempt
        # store auth flow object in Flask session (managed by CKAN cookie - name is set in field beaker.session.key in ckan.ini)

        session[self.AUTH_FLOW_SESSION_KEY] = (
            self.entraid_client.initiate_auth_code_flow(
                scopes=app_config.SCOPE,
                redirect_uri=f"{app_config.HOST}{app_config.REDIRECT_PATH}",
            )
        )
        return toolkit.redirect_to(session[self.AUTH_FLOW_SESSION_KEY]["auth_uri"])

    def redirect_to_home(self):
        return toolkit.redirect_to("home.index")

    def handle_auth_redirect(self):
        """
        After being redirected from Entra ID authentication,
        handle response containing ID token and access token granting
        read access (defined in app_config.SCOPE) to Microsoft Graph API.
        """

        if self.AUTH_FLOW_SESSION_KEY not in session:
            return self.redirect_to_home()

        token_response = self.entraid_client.acquire_token_by_auth_code_flow(
            auth_code_flow=(session.pop(self.AUTH_FLOW_SESSION_KEY, None)),
            auth_response=request.args,
        )

        if not is_auth_code_flow_token_response(token_response):
            logger.error(
                f"Required fields missing from token response: {token_response}"
            )
            return self.redirect_to_home()

        id_token_claims: IdTokenClaims = token_response["id_token_claims"]

        # get user info via Microsoft Graph API
        access_token = token_response["access_token"]
        headers = {
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json",
        }
        graph_response = requests.get(app_config.GRAPH_ENDPOINT, headers=headers)
        if graph_response.status_code == 200:
            user_info: GraphApiUserInfo = graph_response.json()
        else:
            logger.error("Failed to retrieve user info from Microsoft Graph API")

        # the ID of a CKAN user in the database should be the user's Entra ID object ID
        user = model.User.get(id_token_claims["oid"])

        # create new CKAN user if one does not exist for this id
        if user is None:
            # email address is a required field
            if user_info.get("mail") is None:
                logger.error(f"No email address found when trying to create user {user_info.get("id")}")
                flash_error(
                    "No email address found. Please make sure your Entra ID login account has an email address."
                )
                return self.redirect_to_home()
            user = create_user_from_graph_api_info(user_info)
            logger.info(f"Creating new CKAN user {user.id}")
            model.Session.add(user)
            model.Session.commit()

        if user is not None:
            # update changed email address
            if (
                user_info.get("mail") is not None
                and user_info.get("mail") != user.email
            ):
                user.email = user_info["mail"]  # type: ignore
                model.Session.add(user)
                model.Session.commit()
            toolkit.login_user(user)

        return self.redirect_to_home()
