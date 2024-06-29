import jwt from 'jsonwebtoken';
import config from '../../config';
import { TUser } from '../users/user.interface';
import { User } from '../users/user.model';
import { TLoginUser } from './auth.interface';
import { isPasswordMatched } from './auth.utils';

//  CHECK EXISTS USER AND SAVE NEW USER DATA INTO DATABASE
const signupDataIntoDB = async (payload: TUser): Promise<any> => {
  //user existence check
  const user = await User.findOne({ email: payload.email });

  if (user) {
    throw new Error('User already exists');
  }

  //create user
  const newUser = await User.create(payload);

  return newUser;
};

// CHECK EXISTS USER DATA AND FIND

const loginUserDataIntoDB = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload.email }).select('+password');

  if (!user) {
    throw new Error('User not found');
  }

  const passwordMatch = await isPasswordMatched(
    payload.password,
    user.password,
  );

  if (!passwordMatch) {
    throw new Error('Password not matched');
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires_in,
  });

  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_secret as string,
    {
      expiresIn: config.jwt_refresh_expires_in,
    },
  );
  const userData = await User.findOne({ email: payload.email });



  return {
    accessToken,
    refreshToken,
    userData,
  };
};

export const AuthServices = {
  signupDataIntoDB,
  loginUserDataIntoDB,
};
