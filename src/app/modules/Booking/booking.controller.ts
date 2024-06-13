import httpStatus from "http-status";
import catchAsync from "../../utilis/catchAsync";
import sendResponse from "../../utilis/sendResponse";
import { bookingServices } from "./booking.service";


//   RETRIVE ALL BOOKING 
const getAllBookings = catchAsync(async (req, res, next) => {

    const result = await bookingServices.getAllBookingsIntoDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        succcess: true,
        message: 'Booking retrieved successfully',
        data: result,
    });

})



const createBookings = catchAsync(async (req, res, next) => {
    const payload = req.body;
    // console.log(payload);
    // const valdateData = BookingSchemaValidation.parse(payload);
    const result = await bookingServices.createdBookingIntoDB(payload);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        succcess: true,
        message: 'Booking created successfully',
        data: result,
    });

})

const deleteBookings = catchAsync(async (req, res, next) => {
    const {bookingId }= req.params

    const result = await bookingServices.deleteBookingIntoDB(bookingId)

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
    deleteBookings
}