import { Booking } from "../Booking/booking.model";

const bookingCheckFromDB = async (query: Record<string, unknown>) => {

    // Current Date iso From
    const date = new Date().toISOString();
    let currentDate = date.substring(0, date.indexOf('T'));

    if (query?.date) {
        currentDate = query?.date as string
    }

    const result = await Booking.find({ date: currentDate })

    return result;


}



export const bookingCheckerServices = {
    bookingCheckFromDB,

}