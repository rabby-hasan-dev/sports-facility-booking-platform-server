import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";



const createdBookingIntoDB = async (payload: TBooking) => {

    let data: any = { ...payload, }

    data.isBooked = "confirmed",
        data.payableAmount = 10;


    const result = await Booking.create(data);

    return result;


}


export const bookingServices = {

    createdBookingIntoDB,

}