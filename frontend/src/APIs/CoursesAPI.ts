import FLASK_HTTPS from "./_FLASK_API";
import { Course } from "../models/Models";
import { ObjectId } from "bson";
import { ErrorHandler } from "../utils/error";

export namespace CoursesAPI {
    let route_name = "/courses";

    // Create a new Google Classroom course
    export const create_class = async (courseData: { name: string; course_code: string; teacher_email: string }): Promise<Course> => {
        try {
            const res = await FLASK_HTTPS.put(`${route_name}/`, {
                name: courseData.name,
                course_code: courseData.course_code,
                teacher_email: courseData.teacher_email
            });
            return new Course(res.data);
        } catch (error) {
            ErrorHandler.handleAPIError(error, 'Unable to create course');
        }
    };

    // Fetch a course by ID
    export const get_course = async (courseId: ObjectId): Promise<Course> => {
        try {
            const res = await FLASK_HTTPS.get(`${route_name}/${courseId}`);
            return new Course(res.data);
        } catch (error) {
            ErrorHandler.handleAPIError(error, `Unable to fetch course with ID: ${courseId}`);
        }
    };

    // Fetch all courses
    export const get_courses = async (): Promise<Course[]> => {
        try {
            const res = await FLASK_HTTPS.get(`${route_name}/list`);
            return res.data.map((courseData: any) => new Course(courseData));
        } catch (error) {
            ErrorHandler.handleAPIError(error, 'Unable to fetch courses');
        }
    };
}