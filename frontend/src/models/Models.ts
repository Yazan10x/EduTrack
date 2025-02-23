import {ObjectId} from "bson";

export enum GenderEnum {
    Male = 'Male',
    Female = 'Female',
    RatherNotSay = 'Rather not say',
}

export class User {
    _id: ObjectId;
    full_name: string;
    email: string;
    phone_number?: string;
    dob?: Date;
    gender: GenderEnum;
    photo_url?: string;
    user_type: ObjectId;
    created_at: Date;
    updated_at: Date;

    constructor(data: any) {
        this._id = new ObjectId(data._id.$oid);
        this.full_name = data.full_name;
        this.email = data.email;
        this.phone_number = data.phone_number;
        this.dob = data.dob ? new Date(data.dob.$date) : undefined;
        this.gender = data.gender || GenderEnum.RatherNotSay;
        this.photo_url = data.photo_url;
        this.user_type = new ObjectId(data.user_type.$oid);
        this.created_at = new Date(data.created_at.$date);
        this.updated_at = new Date(data.updated_at.$date);
    }

    is_admin(): boolean {
        return this.user_type.equals(ObjectId.createFromHexString("000000000000000000000001"));
    }
}

export class Course {
    _id: ObjectId;
    archived: boolean;
    name: string;
    course_code: string;
    homeroom: any;
    teacher_id: string;

    constructor(data: any) {
        // Accept either _id or id property.
        // If the id object has a $oid field, use that; otherwise, use the value directly.
        const idData = data._id || data.id;
        this._id = new ObjectId(idData?.$oid || idData);

        // Map the remaining fields.
        this.archived = data.archived;
        this.name = data.name;
        // Prefer courseCode (camelCase) from the API, falling back to course_code.
        this.course_code = data.courseCode || data.course_code;
        this.homeroom = data.homeroom;
        this.teacher_id = data.teacherIds[0].id || "";
    }
}

export function getTeacherEmail(input: any): string {
    const teacherMap: Record<string, string> = {
        "63740d6ab87a3421810f2415": "yazan@armoush.com",
        "63740d6ab87a3421810f2414": "anas@almasri.com"
    };

    const key = typeof input === "string" ? input : String(input);
    return teacherMap[key] || "No Teacher";
}