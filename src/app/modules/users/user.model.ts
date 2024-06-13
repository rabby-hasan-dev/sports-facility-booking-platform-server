import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";



const UserSchema = new Schema<TUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    passsword: {
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
        enum: ["admin", "user"]
    },
    address: {
        type: String,
        required: true
    }
})


export const User = model<TUser>('user', UserSchema);