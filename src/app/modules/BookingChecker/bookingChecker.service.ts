import { Booking } from "../Booking/booking.model";
import { findAvailableTime } from "./utils";

const bookingCheckFromDB = async (query: Record<string, unknown>) => {



    // Current Date iso From
    const date = new Date().toISOString();
    const currentDate = date.substring(0, date.indexOf('T'));
    const requestedDate = query.date || currentDate;




    const result = await Booking.find({ date: requestedDate }, { endTime: 1, startTime: 1, _id: 0 });

    console.log(result);




    const availableSlots = findAvailableTime(result);





    return availableSlots;
    // return result;


}



export const bookingCheckerServices = {
    bookingCheckFromDB,

}