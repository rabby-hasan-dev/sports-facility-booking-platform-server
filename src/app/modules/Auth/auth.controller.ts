
import httpStatus from "http-status";
import catchAsync from "../../utilis/catchAsync";
import sendResponse from "../../utilis/sendResponse";
import { AuthServices } from "./Auth.service";


const signup = catchAsync(async (req, res) => {

    const result = await AuthServices.signupDataIntoDB(req.body);


    sendResponse(res, {
        statusCode: httpStatus.OK,
        succcess: true,
        message: "User SignUp in successfully!",
        data: result,
    });


});





export const authControllers = {
    signup,

};
