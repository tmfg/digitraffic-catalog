from ckan.model import User
from ckanext.entraid_authenticator.model.entra_id import GraphApiUserInfo
import uuid


def get_full_name_from_user_info(user_info: GraphApiUserInfo) -> str:
    return f"{'' if user_info.get('givenName') is None else user_info.get('givenName')} {'' if user_info.get('surname') is None else user_info.get('surname')}"


def create_user_from_graph_api_info(user_info: GraphApiUserInfo) -> User:
    return User(
        # user's OID in Entra
        id=user_info["id"],
        email=user_info.get("mail", ""),
        # username must be unique and there is no guarantee that user's name and/or surname are available for example
        name=uuid.uuid4(),
        # this is the displayed name, can be edited by user
        fullname=f"{user_info.get('displayName') if user_info.get('displayName') is not None else get_full_name_from_user_info(user_info)}".strip(),
    )
