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
    google_classroom_id: string;

    constructor(data: any) {
        this._id = new ObjectId(data._id.$oid);
        this.google_classroom_id = data.google_classroom_id;
    }
}

export class GoogleClassroom {
    google_classroom_id: string;
    name: string;

    constructor(data: any) {
        this.google_classroom_id = data.google_classroom_id;
        this.name = data.name;
    }
}
