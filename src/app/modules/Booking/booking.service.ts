import { Facility } from "../Facility/facility.model";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import { calculatePayableAmount } from "./utils";


// RETRIVE ALL BOOKINGS FROM DATABASE

const getAllBookingsIntoDB = async () => {

    const result = await Booking.find({}).populate('user').populate('facility');

    return result;

}


// CREATE BOOKINGS FROM DATABASE

const createdBookingIntoDB = async (payload: TBooking) => {

    let data: any = { ...payload, }

    const findFacility = await Facility.findById(payload?.facility);

    if (findFacility) {
        const pricePerHour = Number(findFacility?.pricePerHour);

        // PAYBALE AMOUNT
        data.payableAmount = calculatePayableAmount(pricePerHour, payload);
    }




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