# Python Imports
from flask import Blueprint, render_template


db_firebase_service = Blueprint('/f', __name__)


# This is just for testing
# 127.0.0.1:6020/f/google
@db_firebase_service.route("/google")
def test_login_with_google() -> str:
    return render_template("google_login.html")


