
import httpStatus from "http-status";
import config from "../../config";
import catchAsync from "../../utilis/catchAsync";
import sendResponse from "../../utilis/sendResponse";
import { AuthServices } from "./auth.service";


// USER SIGNUP
const signup = catchAsync(async (req, res) => {

    const result = await AuthServices.signupDataIntoDB(req.body);


    sendResponse(res, {
        statusCode: httpStatus.OK,
        succcess: true,
        message: "User SignUp in successfully!",
        data: result,
    });


});

// USER LOGIN

const login = catchAsync(async (req, res) => {
    const { accessToken, refreshToken } = await AuthServices.loginUserDataIntoDB(req.body);


    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: config.node_env === "production",
    });


    sendResponse(res, {
        statusCode: httpStatus.OK,
        succcess: true,
        message: "User logged in successfully!",
        data: {
            accessToken
        },
    });



});





export const authControllers = {
    signup,
    login

};
