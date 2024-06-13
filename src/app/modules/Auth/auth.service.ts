import { USER_Role } from "../users/user.constant";
import { TUser } from "../users/user.interface";
import { User } from "../users/user.model";


const signupDataIntoDB = async (payload: TUser): Promise<any> => {
    //user existence check
    const user = await User.findOne({ email: payload.email });

    if (user) {
        throw new Error("User already exists");
    }

    //set user role
    payload.role = USER_Role.user;

    //create user
    const newUser = await User.create(payload);

    return newUser;
};




export const AuthServices = {
    signupDataIntoDB,

};