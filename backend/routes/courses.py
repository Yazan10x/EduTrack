from flask import Blueprint, request, jsonify
import json

from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

from models import Course, Permissions  # Assuming your Course model is in models.py
from mongoengine import ValidationError
from bson import ObjectId

from utils.context import Ctx
from utils.googleapis import ClassroomAPI

courses = Blueprint('courses', __name__)

@courses.route("/", methods=["PUT"])
@Ctx.ctx_required([])
def create_class(ctx: Ctx):
    try:
        data = request.json
        name = data.get('name')
        teacher_email = data.get('teacher_email')

        if not name or not teacher_email:
            return jsonify({"error": "Missing required fields: name and teacher_email"}), 400

        # Authenticate with Google Classroom API

        service = ClassroomAPI.GoogleAPI.get_service()

        # Create the course in Google Classroom
        course_body = {
            "name": name,
            "ownerId": f"teachers/{teacher_email}",
            "section": data.get('section', ""),
            "description": data.get('description', ""),
            "room": data.get('room', ""),
            "courseState": "ACTIVE"
        }

        try:
            course = service.courses().create(body=course_body).execute()
            google_classroom_id = course.get("id")

            # Store minimal data in MongoDB
            new_course = Course(
                google_classroom_id=google_classroom_id
            )
            new_course.save()

            return jsonify({
                "id": str(new_course.id),
                "google_classroom_id": google_classroom_id,
                "name": name,
                "teacher_email": teacher_email,
                "created_at": new_course.created_at.isoformat()
            }), 201

        except HttpError as e:
            return jsonify({"error": "Google Classroom API error", "message": str(e)}), 500

    except ValidationError as ve:
        return jsonify({"error": "Invalid course data", "message": str(ve)}), 400
    except Exception as e:
        return jsonify({"error": "Unable to create course", "message": str(e)}), 500
