import { IsBooked_Status } from '../Booking/booking.constant';
import { Booking } from '../Booking/booking.model';
import { Facility } from '../Facility/facility.model';
import { findAvailableTime } from './utils';

const bookingCheckFromDB = async (query: Record<string, unknown>) => {
  // Current Date iso From
  const date = new Date().toISOString();
  const currentDate = date.substring(0, date.indexOf('T'));
  const requestedDate = query.date || currentDate;
  const facilityId = query.facility;

    const facilityChecker= await Facility.findById(facilityId);

    if (!facilityChecker) {
      throw new Error("can't find facility");
    }
  

  const result = await Booking.find(
    { date: requestedDate, isBooked: { $ne: IsBooked_Status.canceled } ,facility:facilityId },
    { endTime: 1, startTime: 1, _id: 0 },
  );


  const availableSlots = findAvailableTime(result);

  if(!availableSlots[0]){
    throw new Error("Sorry! There is no available time  in this  facility on this date. Please! Booking others day or facility");

  }

  return availableSlots;
};

export const bookingCheckerServices = {
  bookingCheckFromDB,
};
