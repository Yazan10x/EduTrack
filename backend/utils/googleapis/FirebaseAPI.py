import json
import os
import firebase_admin
from firebase_admin import credentials, auth

firebase_cert = {
  "type": os.getenv("type"),
  "project_id": os.getenv("project_id"),
  "private_key_id": os.getenv("private_key_id"),
  "private_key": os.getenv("private_key").replace("\\n", "\n"),
  "client_email": os.getenv("client_email"),
  "client_id": os.getenv("client_id"),
  "auth_uri": os.getenv("auth_uri"),
  "token_uri": os.getenv("token_uri"),
  "auth_provider_x509_cert_url": os.getenv("auth_provider_x509_cert_url"),
  "client_x509_cert_url": os.getenv("client_x509_cert_url"),
  "universe_domain": os.getenv("universe_domain")
}

firebase_cert_json = json.dumps(firebase_cert)
firebase_cert_dict = json.loads(firebase_cert_json)
cred = credentials.Certificate(firebase_cert_dict)
APP = firebase_admin.initialize_app(cred)


class FirebaseAPI:

    @staticmethod
    def verify_token(auth_header: str) -> dict:
        # Check if the Authorization header is missing
        if not auth_header:
            raise ValueError('Authorization header is missing')

        # Extract and verify the token
        token = auth_header.split(" ")[1]
        try:
            firebase_user = auth.verify_id_token(token)  # Verifies token with Firebase
            return firebase_user
        except Exception as e:
            raise ValueError(f'Invalid token: {str(e)}')
