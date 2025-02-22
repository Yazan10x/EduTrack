import os

from flask import Blueprint, request, jsonify
from googleapiclient.errors import HttpError
from mongoengine import ValidationError

from models import Course  # Assuming your Course model is in models.py
from utils.context import Ctx
from utils.googleapis.ClassroomAPI import GoogleAPI

courses = Blueprint('courses', __name__)

@courses.route("/", methods=["PUT"])
@Ctx.ctx_required([])
def create_class(_ctx: Ctx):
    try:
        data = request.json
        name = data.get('name')
        teacher_email = data.get('teacher_email')

        if not name or not teacher_email:
            return jsonify({"error": "Missing required fields: name and teacher_email"}), 400

        # Create the course in Google Classroom
        course_body = {
            "name": name,
            "ownerId": teacher_email,
            "section": data.get('section', ""),
            "description": data.get('description', ""),
            "room": data.get('room', ""),
            "courseState": "ACTIVE"
        }

        print(course_body)

        try:
            course = GoogleAPI.create_course(course_body)
            google_classroom_id = course.get("id")

            # Add the provided teacher to the course
            GoogleAPI.add_teacher(google_classroom_id, teacher_email)

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

        except RuntimeError as e:
            return jsonify({"error": "Google Classroom API error", "message": str(e)}), 500

    except ValidationError as ve:
        return jsonify({"error": "Invalid course data", "message": str(ve)}), 400
    except Exception as e:
        return jsonify({"error": "Unable to create course", "message": str(e)}), 500
