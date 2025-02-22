# """
# Context Handling
# """
from __future__ import annotations
from typing import Optional
from flask import g, request, jsonify
from functools import wraps
import models
from utils.googleapis.FirebaseAPI import FirebaseAPI


class Ctx:
    def __init__(self):
        self.user: Optional[models.User] = None
        self.firebase_user: Optional[dict] = None
        self.system: Optional[None] = None
        self.dev: bool = False

    @staticmethod
    def create_ctx_for_user(user: models.User, firebase_user) -> 'Ctx':
        ctx = Ctx()
        ctx.user = user
        ctx.firebase_user = firebase_user
        ctx.dev = False
        return ctx

    def has_any_permissions(self, required_permissions: list[models.Permissions]) -> bool:

        if models.Permissions.CAN_CREATE_SELF in required_permissions:
            return True # Account will not have any permissions yet while creating self

        if models.Permissions.SUPER_ADMIN in self.user.user_type.permissions:
            return True

        return any(perm in self.user.user_type.permissions for perm in required_permissions)

    def has_all_permissions(self, required_permissions: list[models.Permissions]) -> bool:

        if models.Permissions.CAN_CREATE_SELF in required_permissions:
            return True  # Account will not have any permissions yet while creating self


        if models.Permissions.SUPER_ADMIN in self.user.user_type.permissions:
            return True

        return all(perm in self.user.user_type.permissions for perm in required_permissions)

    @staticmethod
    def ctx_required(required_permissions: list[models.Permissions]):

        def decorator(f):
            @wraps(f)
            def decorated_function(*args, **kwargs):
                try:
                    # Fetch Authorization header
                    auth_header = request.headers.get('Authorization')

                    # Use FirebaseAPI to verify the token and get firebase_user
                    firebase_user = FirebaseAPI.verify_token(auth_header)
                    email = firebase_user.get("email")

                    # Lookup user in the local database
                    user = models.User.objects(email=email).first()
                    if not user:
                        if not required_permissions == [models.Permissions.CAN_CREATE_SELF]:
                            return jsonify({'error': 'User not found in the database'}), 404

                    # Create the context and assign it to Flask's `g` object
                    ctx = Ctx.create_ctx_for_user(user=user, firebase_user=firebase_user)

                    # Check if the user has the required permissions
                    if required_permissions and not ctx.has_any_permissions(required_permissions):
                        return jsonify({"error": "Permission denied"}), 403

                except ValueError as e:
                    return jsonify({'error': str(e)}), 401

                # Pass the `ctx` object directly to the wrapped function
                return f(ctx, *args, **kwargs)

            return decorated_function
        return decorator

    def has_override(self) -> bool:
        return self.has_all_permissions([models.Permissions.ROOT])
