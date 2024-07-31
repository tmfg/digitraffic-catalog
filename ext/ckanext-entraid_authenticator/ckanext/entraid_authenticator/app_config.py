from dotenv import load_dotenv
import os

load_dotenv()

AUTHORITY = os.getenv("ENTRA_AUTHORITY")
CLIENT_ID = os.getenv("ENTRA_CLIENT_ID")
CLIENT_SECRET = os.getenv("ENTRA_CLIENT_SECRET")
HOST = os.getenv("CKAN_SITE_URL")
REDIRECT_PATH = "/user/login/auth_redirect"
GRAPH_ENDPOINT = "https://graph.microsoft.com/v1.0/me"
SCOPE = ["User.Read"]
