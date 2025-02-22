import os
from flask import Blueprint, request, jsonify
from mongoengine import ValidationError
from models import Course  # Assuming your Course model is in models.py
from utils.context import Ctx
from utils.googleapis.ClassroomAPI import GoogleClassroomFunctions

courses = Blueprint('courses', __name__)

@courses.route("/", methods=["PUT"])
@Ctx.ctx_required([])
def create_class(_ctx: Ctx):
    """
    Create a course using GoogleClassroomFunctions.create_course and
    store minimal data in MongoDB.
    Expected JSON payload: { "name": str, "course_code": str, "teacher_email": str }
    """
    try:
        data = request.json or {}
        name = data.get('name')
        course_code = data.get('course_code')
        teacher_email = data.get('teacher_email')

        if not name or not course_code or not teacher_email:
            return jsonify({"error": "Missing required fields: name, course_code, and teacher_email"}), 400

        # Create the course in Google Classroom
        # Our static function expects: name, course_code, teacher
        course_response = GoogleClassroomFunctions.create_course(name, course_code, teacher_email)
        # Assume the response is a requests.Response object with JSON content.
        response_data = course_response.json()
        google_classroom_id = response_data.get("id")
        if not google_classroom_id:
            return jsonify({"error": "Failed to create course in Google Classroom"}), 500

        # Store minimal data in MongoDB
        new_course = Course(
            google_classroom_id=google_classroom_id
        )
        new_course.save()

        return jsonify({
            "id": str(new_course.id),
            "google_classroom_id": google_classroom_id,
            "name": name,
            "course_code": course_code,
            "teacher_email": teacher_email,
            "created_at": new_course.created_at.isoformat()
        }), 201

    except ValidationError as ve:
        return jsonify({"error": "Invalid course data", "message": str(ve)}), 400
    except Exception as e:
        return jsonify({"error": "Unable to create course", "message": str(e)}), 500


@courses.route("/<course_id>", methods=["GET"])
@Ctx.ctx_required([])
def get_class(course_id, _ctx: Ctx):
    """
    Get details of a single course using GoogleClassroomFunctions.get_course.
    """
    try:
        # Call the API function to get course details
        course_response = GoogleClassroomFunctions.get_course(course_id)
        # Assume the response is a requests.Response object
        return jsonify(course_response.json()), 200
    except Exception as e:
        return jsonify({"error": "Unable to get course", "message": str(e)}), 500


@courses.route("/list", methods=["GET"])
@Ctx.ctx_required([])
def list_classes(_ctx: Ctx):
    """
    Get a list of courses using GoogleClassroomFunctions.get_courses.
    """
    try:
        courses_response = GoogleClassroomFunctions.get_courses()
        # Assume the response is a requests.Response object
        return jsonify(courses_response.json()), 200
    except Exception as e:
        return jsonify({"error": "Unable to list courses", "message": str(e)}), 500
