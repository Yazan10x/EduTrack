import FLASK_HTTPS from "./_FLASK_API";
import { User } from "../models/Models";
import { ObjectId } from "bson";
import { ErrorHandler } from "../utils/error";


export namespace UsersAPI {
    let route_name = "/users";

    // Get the current user (self)
    export const get_self = async (): Promise<User> => {
        try {
            const res = await FLASK_HTTPS.get(`${route_name}/get_self`);
            return new User(res.data);
        } catch (error) {
            ErrorHandler.handleAPIError(error, 'Unable to fetch current user');
        }
    };

    // Create a new user
    export const create_user = async (userProfile: Partial<User>): Promise<User> => {
        try {
            const res = await FLASK_HTTPS.put(`${route_name}/`, {
                full_name: userProfile.full_name,
                email: userProfile.email,
                phone_number: userProfile.phone_number,
                dob: userProfile.dob,
                gender: userProfile.gender,
                photo_url: userProfile.photo_url,
            });
            return new User(res.data);
        } catch (error) {
            ErrorHandler.handleAPIError(error, 'Unable to create user');
        }
    };

    // Update the profile of the current user
    export const update_user_profile = async (userProfile: Partial<User>): Promise<User> => {
        try {
            const res = await FLASK_HTTPS.patch(`${route_name}/`, userProfile);
            return new User(res.data);
        } catch (error) {
            ErrorHandler.handleAPIError(error, 'Unable to update user profile');
        }
    };

    // Fetch a single user by ID
    export const get_user = async (userId: ObjectId): Promise<User> => {
        try {
            const res = await FLASK_HTTPS.get(`${route_name}/${userId}`);
            return new User(res.data);
        } catch (error) {
            ErrorHandler.handleAPIError(error, `Unable to fetch user with ID: ${userId}`);
        }
    };

    // Fetch all users
    export const get_users = async (): Promise<User[]> => {
        try {
            const res = await FLASK_HTTPS.post(`${route_name}/users`);
            return res.data.map((userData: any) => new User(userData));
        } catch (error) {
            ErrorHandler.handleAPIError(error, 'Unable to fetch users');
        }
    };

    export const subscribe_to_newsletter = async (email: string): Promise<string> => {
        return "success"
    }
}