import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";


// RETRIVE ALL BOOKINGS FROM DATABASE

const getAllBookingsIntoDB = async () => {

    const result = await Booking.find({}).populate('user').populate('facility');

    return result;

}


// CREATE BOOKINGS FROM DATABASE

const createdBookingIntoDB = async (payload: TBooking) => {

    let data: any = { ...payload, }

    data.payableAmount = 10;


    const result = await Booking.create(data);

    return result;


}

//  DELTE BOOKINGS FROM DATABASE
const deleteBookingIntoDB = async (id: string) => {



    const result = await Booking.findByIdAndDelete(id)

    return result;


}


export const bookingServices = {

    createdBookingIntoDB,
    getAllBookingsIntoDB,
    deleteBookingIntoDB

}