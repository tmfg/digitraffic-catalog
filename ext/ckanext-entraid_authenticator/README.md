# ckanext-entraid_authenticator

This extension replaces the default login functionality of CKAN with _auth code flow_ authentication via Microsoft Entra ID.

For the authentication process to work, you must have an Azure App registration for your CKAN application with corresponding redirect URI(s) and a client secret.

You need to set the appropriate values for your Python application either via `dotenv` or another way of setting environment variables.

```
ENTRA_CLIENT_ID=<client-id>
ENTRA_CLIENT_SECRET=<client-secret>
ENTRA_AUTHORITY=https://login.microsoftonline.com/<tenant-id>
CKAN_SITE_URL=http://localhost:8080
```
