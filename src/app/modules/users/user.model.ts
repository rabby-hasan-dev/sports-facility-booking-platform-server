import { Schema, model } from "mongoose";
import { USER_Role } from "./user.constant";
import { TUser } from "./user.interface";



const UserSchema = new Schema<TUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: Object.keys(USER_Role)
    },
    address: {
        type: String,
        required: true
    }
})


export const User = model<TUser>('User', UserSchema);