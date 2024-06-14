import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import AppError from "../error/AppError";
import { USER_Role } from "../modules/users/user.constant";
import { User } from "../modules/users/user.model";
import catchAsync from "../utilis/catchAsync";



export const auth = (...requiredRoles: (keyof typeof USER_Role)[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const accessToken = req.headers.authorization;

        if (!accessToken) {
            throw new AppError(httpStatus.UNAUTHORIZED, "You have no access to this route");
        }

        const verfiedToken = jwt.verify(
            accessToken as string,
            config.jwt_access_secret as string,
        );


        const { role, email } = verfiedToken as JwtPayload;


        const user = await User.findOne({ email });

        if (!user) {
            throw new AppError(httpStatus.UNAUTHORIZED, "User not found");
        }


        if (!requiredRoles.includes(role)) {
            throw new AppError(httpStatus.UNAUTHORIZED, "You have no access to this route");
        }

        req.user = verfiedToken as JwtPayload;
        next();


    });
};