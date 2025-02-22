from __future__ import annotations
from enum import Enum
import mongoengine as me
from bson import ObjectId
from datetime import datetime, timezone
from utils.context import Ctx


class Permissions(Enum):
    ROOT = "ROOT"
    SUPER_ADMIN = "SUPER_ADMIN"

    CAN_CREATE_SELF = "CAN_CREATE_SELF"
    CAN_ACCESS_USER = "CAN_ACCESS_USER"
    CAN_MODIFY_USER = "CAN_MODIFY_USER"
    CAN_ACCESS_ALL_USERS = "CAN_ACCESS_ALL_USERS"
    CAN_MODIFY_ALL_USERS = "CAN_MODIFY_ALL_USERS"


class PermissionsGroupEnum(Enum):
    Executive_User = ObjectId("000000000000000000000001")
    Basic_Plan = ObjectId("000000000000000000000002")


class PermissionsGroup(me.Document):
    id = me.ObjectIdField(primary_key=True, default=ObjectId, required=True)
    name = me.StringField(required=True, max_length=1024, min_length=1)
    permissions = me.ListField(me.EnumField(Permissions), required=True)
    level = me.IntField(required=True, min_value=0)
    created_at = me.DateTimeField(default=lambda: datetime.now(timezone.utc))
    updated_at = me.DateTimeField(default=lambda: datetime.now(timezone.utc))

    meta = {
        'collection': 'permissions_groups',
        'db_alias': 'default',
        'indexes': [
            'created_at'
        ],
        'ordering': ['-created_at']
    }

    def save(self, *args, **kwargs):
        if not self.created_at:
            self.created_at = datetime.now(timezone.utc)
        self.updated_at = datetime.now(timezone.utc)
        return super(PermissionsGroup, self).save(*args, **kwargs)


class User(me.Document):

    id = me.ObjectIdField(primary_key=True, default=ObjectId, required=True)
    full_name = me.StringField(required=True, max_length=255, default="", min_length=1)
    email = me.EmailField(required=True, unique=True, lowercase=True)
    phone_number = me.StringField(required=False)
    dob = me.DateField(required=False)
    gender = me.StringField(required=False, choices=('Male', 'Female', 'Rather not say'), default='Rather not say')
    photo_url = me.StringField(required=False)
    user_type = me.ReferenceField(PermissionsGroup, required=True)
    last_logged_in = me.ListField(me.DateTimeField(), default=list)
    created_at = me.DateTimeField(default=lambda: datetime.now(timezone.utc))
    updated_at = me.DateTimeField(default=lambda: datetime.now(timezone.utc))

    meta = {
        'collection': 'users',
        'indexes': [
            'email',
            'created_at'
        ],
        'ordering': ['-created_at']
    }

    def can_access(self, ctx: Ctx) -> None:
        if ctx.has_any_permissions([Permissions.CAN_ACCESS_ALL_USERS]):
            return None
        elif ctx.has_any_permissions([Permissions.CAN_ACCESS_USER]):
            if ctx.user.id == self.id:
                return None
        raise PermissionError

    def can_modify(self, ctx: Ctx) -> None:
        if ctx.has_any_permissions([Permissions.CAN_MODIFY_ALL_USERS]):
            return None
        elif ctx.has_any_permissions([Permissions.CAN_MODIFY_USER]):
            if ctx.user.id == self.id:
                return None
        raise PermissionError

    def save(self, *args, **kwargs):
        if not self.created_at:
            self.created_at = datetime.now(timezone.utc)
        self.updated_at = datetime.now(timezone.utc)

        return super(User, self).save(*args, **kwargs)
