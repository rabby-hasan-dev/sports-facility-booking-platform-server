import httpStatus from "http-status";
import catchAsync from "../../utilis/catchAsync";
import sendResponse from "../../utilis/sendResponse";
import { bookingServices } from "./booking.service";


//   RETRIVE ALL BOOKING 
const getAllBookings = catchAsync(async (req, res, next) => {

    const result = await bookingServices.getAllBookingsIntoDB();

    if (!result || result.length === 0) {
        sendResponse(res, {
            statusCode: httpStatus.NOT_FOUND,
            succcess: false,
            message: 'No Data Found',
            data: result,
        });
    }

    sendResponse(res, {
        statusCode: httpStatus.OK,
        succcess: true,
        message: 'Booking retrieved successfully',
        data: result,
    });

})

//   RETRIVE ALL BOOKING For user
const getUserBookings = catchAsync(async (req, res, next) => {
    const user = req.user;
    const result = await bookingServices.getUserBookingsIntoDB(user);


    if (!result || result.length === 0) {
        sendResponse(res, {
            statusCode: httpStatus.NOT_FOUND,
            succcess: false,
            message: 'No Data Found',
            data: result,
        });
    }

    sendResponse(res, {
        statusCode: httpStatus.OK,
        succcess: true,
        message: 'Booking retrieved successfully',
        data: result,
    });

})



const createBookings = catchAsync(async (req, res, next) => {
    const payload = req.body;
    const user = req.user;
    const result = await bookingServices.createdBookingIntoDB(user, payload);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        succcess: true,
        message: 'Booking created successfully',
        data: result,
    });

})

const cancelBookings = catchAsync(async (req, res, next) => {
    const { bookingId } = req.params

    const result = await bookingServices.cancelBookingIntoDB(bookingId)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        succcess: true,
        message: 'Booking created successfully',
        data: result,
    });

})




export const bookingController = {
    createBookings,
    getAllBookings,
    cancelBookings,
    getUserBookings
}