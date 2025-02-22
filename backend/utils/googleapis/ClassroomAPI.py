import os
import json

from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build

# Load API Credentials from environment variables
google_api_json = {
    "type": os.getenv("type_gc"),
    "project_id": os.getenv("project_id_gc"),
    "private_key_id": os.getenv("private_key_id_gc"),
    "private_key": os.getenv("private_key_gc").replace("\\n", "\n"),
    "client_email": os.getenv("client_email_gc"),
    "client_id": os.getenv("client_id_gc"),
    "auth_uri": os.getenv("auth_uri_gc"),
    "token_uri": os.getenv("token_uri_gc"),
    "auth_provider_x509_cert_url": os.getenv("auth_provider_x509_cert_url_gc"),
    "client_x509_cert_url": os.getenv("client_x509_cert_url_gc"),
    "universe_domain": os.getenv("universe_domain_gc"),
}


class GoogleAPI:
    _credentials = None
    _service = None

    @staticmethod
    def initialize():
        """Initialize Google API authentication and create a service client."""
        if GoogleAPI._service is None:
            creds = Credentials.from_service_account_info(
                google_api_json,
                scopes=[
                    "https://www.googleapis.com/auth/classroom.courses",
                    "https://www.googleapis.com/auth/classroom.rosters",
                ],
            )
            GoogleAPI._credentials = creds
            GoogleAPI._service = build("classroom", "v1", credentials=creds)

    @staticmethod
    def get_service():
        """Return the authenticated Google Classroom API service."""
        if GoogleAPI._service is None:
            GoogleAPI.initialize()
        return GoogleAPI._service
