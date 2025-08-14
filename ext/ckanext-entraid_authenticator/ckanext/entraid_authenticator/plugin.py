# encoding: utf-8
import logging
import base64
import uuid
import json
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
from enum import Enum

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

toolkit = plugins.toolkit

# str inheritance is used so that JSON serialization works
class AlertId(str, Enum):
    AUTH_FLOW = "AUTH_FLOW"
    AUTH_INVALID_SESSION = "AUTH_INVALID_SESSION"


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
        self.auth_failed_msg = "Authentication failed. Please try again later."
        self.AUTH_FLOW_SESSION_KEY = "auth_flow"
        logger.info(f"Redirect URI: {app_config.HOST}{app_config.REDIRECT_PATH}")

    def get_blueprint(self):
        # for registering custom routes in the application
        custom_blueprint = Blueprint("custom", __name__, template_folder="templates")
        # add route to application for handling Entra ID auth redirects
        custom_blueprint.add_url_rule(
            app_config.REDIRECT_PATH,
            view_func=self.handle_auth_redirect,
            methods=["GET"],
        )

        # override path for registering an account
        custom_blueprint.add_url_rule(
            "/user/register",
            view_func=self.register,
            methods=["GET"],
        )

        # override path for resetting a password
        custom_blueprint.add_url_rule(
            "/user/reset",
            view_func=self.redirect_to_home,
            methods=["GET"],
        )
        custom_blueprint.add_url_rule(
            "/user/reset/<id>",
            view_func=self.redirect_to_home,
            methods=["GET"],
        )

        return [custom_blueprint]

    def login(self):
        s = self._create_state()
        state, correlation_id = s['state'], s['correlation_id']
        logger.info(
            "Signin in. Starting Entra ID authentication flow",
            extra={
                'alert':{
                    'id': AlertId.AUTH_FLOW,
                    'correlation_id': correlation_id
                }
            }
        )

        try:
            session[self.AUTH_FLOW_SESSION_KEY] = (
                self.entraid_client.initiate_auth_code_flow(
                    scopes=app_config.SCOPE,
                    redirect_uri=f"{app_config.HOST}{app_config.REDIRECT_PATH}",
                    state=state,
                )
            )
        except Exception:
            logger.exception("Failed to initiate auth code flow")
            flash_error(self.auth_failed_msg)
            return self.redirect_to_home()

        return toolkit.redirect_to(session[self.AUTH_FLOW_SESSION_KEY]["auth_uri"])

    def redirect_to_home(self):
        return toolkit.redirect_to("home.index")

    def handle_auth_redirect(self):
        """
        After being redirected from Entra ID authentication,
        handle response containing ID token and access token granting
        read access (defined in app_config.SCOPE) to Microsoft Graph API.
        """

        logger.info("Handling Entra ID auth redirect")

        if self.AUTH_FLOW_SESSION_KEY not in session:
            logger.error(
                "Auth flow missing from session",
                extra={
                    'alert':{
                        'id': AlertId.AUTH_INVALID_SESSION
                    }
                }
            )
            return self.redirect_to_home()

        try:
            auth_flow = session.get(self.AUTH_FLOW_SESSION_KEY)

            token_response = self.entraid_client.acquire_token_by_auth_code_flow(
                auth_code_flow=(session.pop(self.AUTH_FLOW_SESSION_KEY, None)),
                auth_response=request.args,
            )

            if not is_auth_code_flow_token_response(token_response):
                logger.error(
                    f"Required fields missing from token response: {token_response}",
                    extra={
                        'alert':{
                            'id': AlertId.AUTH_INVALID_SESSION
                        }
                    }
                )
                return self.redirect_to_home()
        except Exception:
            logger.exception(
                "Error acquiring token by auth code flow",
                extra={
                    'alert':{
                        'id': AlertId.AUTH_INVALID_SESSION
                    }
                }
            )
            flash_error(self.auth_failed_msg)
            return self.redirect_to_home()

        # Parsing state only after validating the token response
        state_data = json.loads(base64.urlsafe_b64decode(auth_flow["state"].encode()).decode())
        correlation_id = state_data["correlation_id"]
        logger.info(f"Auth flow state parsed successfully: correlation_id={correlation_id}")
        try:
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
                    logger.error(
                        f"No email address found when trying to create user {user_info.get('id')}"
                    )
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

            logger.info(f"Authentication flow completed successfully for user={user.id}",
                        extra={
                            'alert':{
                                'id': AlertId.AUTH_FLOW,
                                'correlation_id': correlation_id
                            }
                        })
            return self.redirect_to_home()
        except Exception:
            logger.exception("Error during authentication flow: correlation_id=%s", correlation_id)
            flash_error(self.auth_failed_msg)
            return self.redirect_to_home()

    def _create_state(self):
        correlation_id = str(uuid.uuid4())
        state_data = {
            "correlation_id": correlation_id,
        }
        state = base64.urlsafe_b64encode(json.dumps(state_data).encode()).decode()
        return {'state': state, 'correlation_id': correlation_id}

    def register(self):
        s = self._create_state()
        state, correlation_id = s['state'], s['correlation_id']

        logger.info(
            "Registering a new user. Starting Entra ID authentication flow",
            extra={
                'alert':{
                    'id': AlertId.AUTH_FLOW,
                    'correlation_id': correlation_id
                }
            }
        )
        # start Entra ID auth flow with prompt=create for self-service sign-up
        session[self.AUTH_FLOW_SESSION_KEY] = (
            self.entraid_client.initiate_auth_code_flow(
                prompt="create",
                scopes=app_config.SCOPE,
                state=state,
                redirect_uri=f"{app_config.HOST}{app_config.REDIRECT_PATH}",
            )
        )
        return toolkit.redirect_to(session[self.AUTH_FLOW_SESSION_KEY]["auth_uri"])
