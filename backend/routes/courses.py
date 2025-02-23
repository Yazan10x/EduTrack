import os
from flask import Blueprint, request, jsonify
from mongoengine import ValidationError
# from models import Course
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
        teacher_email: str = data.get('teacher_email')

        default_teacher_id = "63740d6ab87a3421810f2415"
        if "yazan" in teacher_email.lower():
            default_teacher_id = "63740d6ab87a3421810f2415"
        elif "anas" in teacher_email.lower():
            default_teacher_id = "63740d6ab87a3421810f2415"
        elif "bilal" in teacher_email.lower():
            default_teacher_id = "63740d6ab87a3421810f2415"

        if not name or not course_code or not teacher_email:
            return jsonify({"error": "Missing required fields: name, course_code, and teacher_email"}), 400

        # Create the course in Google Classroom
        course_response = GoogleClassroomFunctions.create_course(name, course_code, default_teacher_id)

        # If the response is already a dictionary, return it directly
        if isinstance(course_response, dict):
            return jsonify(course_response), 200

        # Otherwise, assume it's a requests.Response object and get its JSON
        return jsonify(course_response.json()), 200

    except ValidationError as ve:
        return jsonify({"error": "Invalid course data", "message": str(ve)}), 400
    except Exception as e:
        return jsonify({"error": "Unable to create course", "message": str(e)}), 500


@courses.route("/<course_id>", methods=["GET"])
@Ctx.ctx_required([])
def get_class(_ctx: Ctx, course_id: str):
    """
    Get details of a single course using GoogleClassroomFunctions.get_course.
    """
    try:
        course_response = GoogleClassroomFunctions.get_course(course_id)

        # If the response is already a dictionary, return it directly
        if isinstance(course_response, dict):
            return jsonify(course_response), 200

        # Otherwise, assume it's a requests.Response object and get its JSON
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
        # Retrieve the raw response from get_courses
        response = GoogleClassroomFunctions.get_courses()

        # Safely extract courses using .get() to avoid KeyError
        courses_response = response.get("courses", [])

        res_lst = []
        for course in courses_response:
            # Extract course ID correctly from '_id' -> '$oid'
            course_id = course.get("_id", {}).get("$oid")
            if not course_id:
                continue

            course_details = GoogleClassroomFunctions.get_course(course_id)
            res_lst.append(course_details)

        return jsonify(res_lst), 200

    except Exception as e:
        return jsonify({"error": "Unable to list courses", "message": str(e)}), 500


@courses.route("/gclass_url/<course_id>", methods=["GET"])
@Ctx.ctx_required([])
def get_gclass_url(_ctx: Ctx, course_id: str):
    """
    Get the Google Classroom URL for a given course using GoogleClassroomFunctions.get_gclass_url.
    """
    try:
        response: str = GoogleClassroomFunctions.get_gclass_url(course_id)

        return response, 200

    except Exception as e:
        return jsonify({"error": "Unable to get Google Classroom URL", "message": str(e)}), 500


@courses.route("/student/<student_id>", methods=["GET"])
@Ctx.ctx_required([])
def get_student(_ctx: Ctx, student_id: str):
    """
    Get details of a student using GoogleClassroomFunctions.get_student_id.
    """
    try:
        student_response = GoogleClassroomFunctions.get_student_by_id(student_id)

        # If the response is already a dictionary, return it directly
        if isinstance(student_response, dict):
            return jsonify(student_response), 200

        # Otherwise, assume it's a requests.Response object and get its JSON
        return jsonify(student_response.json()), 200

    except Exception as e:
        return jsonify({"error": "Unable to get student", "message": str(e)}), 500


@courses.route("/teacher/<teacher_id>", methods=["GET"])
@Ctx.ctx_required([])
def get_teacher(_ctx: Ctx, teacher_id: str):
    """
    Get details of a student using GoogleClassroomFunctions.get_student_id.
    """
    try:
        teacher_response = GoogleClassroomFunctions.get_teacher_by_id(teacher_id)

        # If the response is already a dictionary, return it directly
        if isinstance(teacher_response, dict):
            return jsonify(teacher_response), 200

        # Otherwise, assume it's a requests.Response object and get its JSON
        return jsonify(teacher_response.json()), 200

    except Exception as e:
        return jsonify({"error": "Unable to get teacher", "message": str(e)}), 500
