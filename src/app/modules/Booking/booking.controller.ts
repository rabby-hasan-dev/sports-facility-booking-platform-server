import httpStatus from "http-status";
import catchAsync from "../../utilis/catchAsync";
import sendResponse from "../../utilis/sendResponse";
import { bookingServices } from "./booking.service";




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


export const bookingController = {
    createBookings,
}