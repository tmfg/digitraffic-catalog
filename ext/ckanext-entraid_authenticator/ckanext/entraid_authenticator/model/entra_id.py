from typing import Any, TypedDict, Optional


# "Required" type is not available before Python 3.11 so fields which should always
# be present are expressed here using inheritance as below.
# Refactor to use Required when updating Python
class RequiredIdTokenClaims(TypedDict, total=True):
    aud: str
    idp: str
    iss: str
    oid: str  # Object ID of authenticated user
    nbf: int
    iat: int
    exp: int
    sub: str
    nonce: str
    tid: str
    ver: str


class IdTokenClaims(RequiredIdTokenClaims, total=False):
    name: Optional[str]
    preferred_username: Optional[str]


class RequiredGraphApiUserInfoFields(TypedDict, total=True):
    id: str  # Object ID of user


class GraphApiUserInfo(RequiredGraphApiUserInfoFields, total=False):
    displayName: Optional[str]
    givenName: Optional[str]
    surname: Optional[str]
    mail: Optional[str]
    userPrincipalName: Optional[str]


class AuthCodeFlowTokenResponse(TypedDict, total=True):
    token_type: str
    scope: str
    expires_in: int
    ext_expires_in: int
    access_token: str
    refresh_token: str
    id_token: str
    id_token_claims: IdTokenClaims
    client_info: str
    token_source: str


def is_auth_code_flow_token_response(obj: Any) -> bool:
    required_keys = ["access_token", "id_token_claims"]
    return all(key in obj for key in required_keys) and isinstance(obj, dict)
