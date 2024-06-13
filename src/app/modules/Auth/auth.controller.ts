
import httpStatus from "http-status";
import catchAsync from "../../utilis/catchAsync";
import sendResponse from "../../utilis/sendResponse";
import { AuthServices } from "./Auth.service";

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
    const data = await AuthServices.loginUserDataIntoDB(req.body);



    sendResponse(res, {
        statusCode: httpStatus.OK,
        succcess: true,
        message: "User logged in successfully!",
        data: {
            data
        },
    });



});





export const authControllers = {
    signup,
    login

};
