import FLASK_HTTPS from "./_FLASK_API";
import {Course} from "../models/Models";
import {ErrorHandler} from "../utils/error";

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
    export const get_course = async (courseId: string): Promise<Course> => {
        try {
            const res = await FLASK_HTTPS.get(`${route_name}/${courseId}`);
            return new Course(res.data);
        } catch (error) {
            ErrorHandler.handleAPIError(error, `Unable to fetch course with ID: ${courseId}`);
        }
    };

    export const get_courses = async (): Promise<Course[]> => {
        try {
            const res = await FLASK_HTTPS.get(`${route_name}/list`);

            if (Array.isArray(res.data)) {
                return res.data.map((courseData: any) => new Course(courseData));
            } else {
                console.error("DEBUG: Expected an array from API but got:", res.data);
                return [];
            }
        } catch (error) {
            ErrorHandler.handleAPIError(error, 'Unable to fetch courses');
            return []; // Return an empty array on error.
        }
    };

    export const get_gclass_url = async (courseId: string): Promise<string> => {
        const res = await FLASK_HTTPS.get(`${route_name}/gclass_url/${courseId}`);
        return res.data as string
    };

    export const get_student = async (studentId: string): Promise<any> => {
        try {
            const res = await FLASK_HTTPS.get(`${route_name}/student/${studentId}`);

            if (res.data) {
                return res.data; // Return student data
            } else {
                console.error("DEBUG: Expected student data but got:", res.data);
                return null;
            }
        } catch (error) {
            ErrorHandler.handleAPIError(error, 'Unable to fetch student details');
            return null; // Return null on error
        }
    };

    export const get_teacher = async (teacherId: string): Promise<any> => {
        try {
            const res = await FLASK_HTTPS.get(`${route_name}/teacher/${teacherId}`);

            if (res.data) {
                return res.data;
            } else {
                console.error("DEBUG: Expected teacher data but got:", res.data);
                return null;
            }
        } catch (error) {
            ErrorHandler.handleAPIError(error, 'Unable to fetch teacher details');
            return null; // Return null on error
        }
    };
}