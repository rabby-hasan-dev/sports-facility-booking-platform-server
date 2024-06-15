import { JwtPayload } from "jsonwebtoken";
import { Facility } from "../Facility/facility.model";
import { User } from "../users/user.model";
import { IsBooked_Status } from "./booking.constant";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import { calculatePayableAmount } from "./utils";


// RETRIVE ALL BOOKINGS FROM DATABASE

const getAllBookingsIntoDB = async () => {

    const result = await Booking.find({ isBooked: { $eq: IsBooked_Status.confirmed } }).populate('user').populate('facility');
    return result;


}
// RETRIVE  BOOKINGS FOR SPECIFIC USER FROM DATABASE

const getUserBookingsIntoDB = async (user: JwtPayload) => {
    const userExists = await User.findOne({ email: user?.email });
    const result = await Booking.find({ user: userExists?._id, isBooked: { $eq: IsBooked_Status.confirmed } }).populate('user').populate('facility');

    return result;

}


// CREATE BOOKINGS FROM DATABASE

const createdBookingIntoDB = async (user: JwtPayload, payload: TBooking) => {

    let booking: any = { ...payload, }

    const userExists = await User.findOne({ email: user?.email });
    const findFacility = await Facility.findById(payload?.facility);

    console.log("user", userExists, 'facility', findFacility);

    if (userExists && findFacility) {
        // User Id set
        booking.user = userExists._id
        // PAYBALE AMOUNT HANDLER
        const pricePerHour = Number(findFacility?.pricePerHour);
        booking.payableAmount = calculatePayableAmount(pricePerHour, payload);
    } else {
        throw new Error("Sorry! User or Payable amount missing!")
    }

    const result = await Booking.create(booking);
    return result;


}

//  CANCEL BOOKINGS  FROM DATABASE
const cancelBookingIntoDB = async (id: string) => {


    const result = await Booking.findByIdAndUpdate(id, { isBooked: IsBooked_Status.canceled }, { new: true }).populate('facility');

    return result;


}


export const bookingServices = {

    createdBookingIntoDB,
    getAllBookingsIntoDB,
    cancelBookingIntoDB,
    getUserBookingsIntoDB

}