import mongoengine as me
from datetime import datetime, timezone
from bson import ObjectId

from utils.context import Ctx


class Course(me.Document):

    id = me.ObjectIdField(primary_key=True, default=ObjectId, required=True)
    google_classroom_id = me.StringField(required=True, unique=True)
    created_at = me.DateTimeField(default=lambda: datetime.now(timezone.utc))
    updated_at = me.DateTimeField(default=lambda: datetime.now(timezone.utc))

    meta = {
        'collection': 'courses',
        'indexes': [
            'google_classroom_id',
            'created_at'
        ],
        'ordering': ['-created_at']
    }

    def can_access(self, ctx: Ctx) -> None:
        # TODO: Implement access control logic
        pass

    def can_modify(self, ctx: Ctx) -> None:
        # TODO: Implement modification control logic
        pass

    def save(self, *args, **kwargs):
        if not self.created_at:
            self.created_at = datetime.now(timezone.utc)
        self.updated_at = datetime.now(timezone.utc)

        return super(Course, self).save(*args, **kwargs)
