from dotenv import load_dotenv
import os

load_dotenv()

AUTHORITY = os.getenv("AUTHORITY")
CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")
HOST = os.getenv("HOST")
REDIRECT_PATH = "/user/login/auth_redirect"
GRAPH_ENDPOINT = "https://graph.microsoft.com/v1.0/me"
SCOPE = ["User.Read"]
