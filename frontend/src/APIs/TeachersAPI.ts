import FLASK_HTTPS from "./_FLASK_API";
import { User } from "../models/Models";
import { ObjectId } from "bson";
import { ErrorHandler } from "../utils/error";


export namespace TeachersAPI {
    let route_name = "/teachers";

    // Get the current user (self)
    export const get_teacher_name = async (teacher_id: ObjectId): Promise<ObjectId> => {
        try {
            const _res = await FLASK_HTTPS.get(`${route_name}/get_self`);
            return new ObjectId();
        } catch (error) {
            ErrorHandler.handleAPIError(error, 'Unable to fetch current user');
        }
    };

}