import os

import confiq
from flask import Flask, Response, redirect
from flask_cors import CORS
from routes import users, courses, db_firebase_service

app = Flask(__name__)
CORS(app)

# Services
app.register_blueprint(users, url_prefix="/users")
app.register_blueprint(courses, url_prefix="/courses")

# Developer Services
app.register_blueprint(db_firebase_service, url_prefix="/f")


@app.route("/")
def home() -> Response:
    return redirect(os.getenv("FRONTEND_DOMAIN"))


@app.route("/v")
def version() -> str:
    return "V22.02.2025"


if __name__ == '__main__':

    app.run(host='0.0.0.0', port=7070, debug=True)
