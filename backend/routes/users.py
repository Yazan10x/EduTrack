from bson import ObjectId
from models import Permissions, User
import json
from mongoengine.errors import ValidationError
from flask import Blueprint, jsonify, request
from mongoengine.errors import DoesNotExist

from utils.context import Ctx

users = Blueprint("users", __name__)


@users.route("/get_self", methods=["GET"])
@Ctx.ctx_required([Permissions.CAN_ACCESS_USER])
def get_self(ctx: Ctx):
    user = ctx.user

    if user:
        user_json = json.loads(user.to_json())
        return jsonify(user_json), 200
    else:
        return jsonify({"error": "User not found"}), 404



@users.route("/dashboard", methods=["GET"])
@Ctx.ctx_required([Permissions.CAN_ACCESS_USER])
def get_self_dashboard(ctx: Ctx):
    user = ctx.user

    if user:
        user_json = json.loads(user.to_json())
        res = {
            "user": user_json
        }
        return jsonify(res), 200
    else:
        return jsonify({"error": "User not found"}), 404


# Create a new user
@users.route("/", methods=["PUT"])
@Ctx.ctx_required([Permissions.CAN_CREATE_SELF])
def create_user(ctx: Ctx):
    try:
        data = request.json

        if data.get('email') != ctx.firebase_user.get('email'):
            return jsonify({"error": "Permission denied"}), 403

        user = User(
            full_name=data.get('full_name'),
            email=data.get('email'),
            phone_number=data.get('phone_number', None),
            dob=data.get('dob', None),
            gender=data.get('gender', None),
            photo_url=ctx.firebase_user.get('photo_url', data.get('picture', None)),
            user_type = ObjectId("000000000000000000000002")
        )
        user.save()
        user_json = json.loads(user.to_json())
        return jsonify(user_json), 201
    except ValidationError as ve:
        return jsonify({"error": "Invalid user data", "message": str(ve)}), 400
    except Exception as e:
        return jsonify({"error": "Unable to create user", "message": str(e)}), 500

# Update a user's profile
@users.route("/", methods=["PATCH"])
@Ctx.ctx_required([Permissions.CAN_MODIFY_USER])
def update_user_profile(ctx: Ctx):
    try:
        user = ctx.user
        data = request.json
        user.update(
            full_name=data.get('full_name', user.full_name),
            phone_number=data.get('phone_number', user.phone_number),
            dob=data.get('dob', user.dob),
            gender=data.get('gender', user.gender),
            photo_url=ctx.firebase_user.get('picture', user.photo_url)
        )
        user.reload()  # Reload the user to get updated data
        user_json = json.loads(user.to_json())
        return jsonify(user_json), 200
    except DoesNotExist:
        return jsonify({"error": "User not found"}), 404
    except ValidationError as ve:
        return jsonify({"error": "Invalid user data", "message": str(ve)}), 400
    except Exception as e:
        return jsonify({"error": "Unable to update user profile", "message": str(e)}), 500


# ======================================== Staff Methods ========================================
# Get a single user by ID
@users.route("/<user_id>", methods=["GET"])
@Ctx.ctx_required([Permissions.CAN_ACCESS_ALL_USERS])
def get_user(ctx: Ctx, user_id: str):
    try:
        user = User.objects.get(id=user_id)
        user.can_access(ctx)
        user_json = json.loads(user.to_json())
        return jsonify(user_json), 200
    except DoesNotExist:
        return jsonify({"error": "User not found"}), 404
    except ValidationError:
        return jsonify({"error": "Invalid user ID"}), 400
    except PermissionError:
        return jsonify({"error": "Permission Error"}), # add correct code
    except Exception as e:
        return jsonify({"error": "Unable to fetch user", "message": str(e)}), 500


# Get multiple users
@users.route("/users", methods=["POST"])
@Ctx.ctx_required([Permissions.CAN_ACCESS_ALL_USERS])
def get_users(_: Ctx):
    try:
        # Optionally, add filtering, pagination, or sorting logic if needed
        users_lst = User.objects.all()
        users_json = json.loads(users_lst.to_json())[::-1]
        return jsonify(users_json), 200
    except Exception as e:
        return jsonify({"error": "Unable to fetch users", "message": str(e)}), 500
