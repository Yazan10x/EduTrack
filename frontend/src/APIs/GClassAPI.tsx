import {ObjectId} from "bson";
import axios from "axios";

const REACT_APP_GCLASS_API_ADDRESS = process.env.REACT_APP_GCLASS_API_ADDRESS;
const REACT_APP_YAZAN_BEARER_TOKEN = process.env.REACT_APP_YAZAN_BEARER_TOKEN;


const LocalApi = axios.create({
    baseURL: REACT_APP_GCLASS_API_ADDRESS,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${REACT_APP_YAZAN_BEARER_TOKEN}` // Always include the token
    },
    withCredentials: true  // Include credentials like cookies and tokens
});


export const get_gclass_course_submissions = async (student: string, course: string): Promise<any[]> => {
    return LocalApi.post(
        "/students/get_gclass_course_submissions", {
            student,
            course
        }).then((res) => {
        return res.data;
    })
}