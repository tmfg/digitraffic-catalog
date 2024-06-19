from ckan.model import User
from ckanext.entraid_authenticator.model.entra_id import GraphApiUserInfo
import uuid


def create_user_from_graph_api_info(user_info: GraphApiUserInfo) -> User:
    return User(
        id=user_info["id"],
        email=user_info.get("mail", ""),
        # username must be unique
        name=uuid.uuid4(),
        # this is the displayed name
        fullname=f"{user_info.get('givenName', '')} {user_info.get('surname', '')}".strip(),
    )
