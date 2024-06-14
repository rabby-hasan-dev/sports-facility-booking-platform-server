import { Facility } from "../Facility/facility.model";
import { IsBooked_Status } from "./booking.constant";
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

        // PAYBALE AMOUNT HANDLER
        data.payableAmount = calculatePayableAmount(pricePerHour, payload);
    }




    const result = await Booking.create(data);

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
    cancelBookingIntoDB

}