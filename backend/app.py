import os

import confiq
from flask import Flask, Response, redirect
from flask_cors import CORS
from routes import users, db_firebase_service

app = Flask(__name__)
CORS(app)

# Services
app.register_blueprint(users, url_prefix="/users")

# Developer Services
app.register_blueprint(db_firebase_service, url_prefix="/f")


@app.route("/")
def home() -> Response:
    return redirect(os.getenv("FRONTEND_DOMAIN"))


@app.route("/v")
def version() -> str:
    return "V21.02.2025"


if __name__ == '__main__':

    app.run(host='0.0.0.0', port=7070, debug=True)
