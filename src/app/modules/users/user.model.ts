import bcrypt from 'bcrypt';
import { Schema, model } from "mongoose";
import config from '../../config';
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
        required: true,
        select: 0
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


UserSchema.pre("save", async function (next) {
    const user = this;

    user.password = await bcrypt.hash(user.password, Number(config.salt_round));

    next();
});

UserSchema.post("save", function (doc, next) {
    doc.password = "";

    next();
});


export const User = model<TUser>('User', UserSchema);