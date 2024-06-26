import { IsBooked_Status } from '../Booking/booking.constant';
import { Booking } from '../Booking/booking.model';
import { findAvailableTime } from './utils';

const bookingCheckFromDB = async (query: Record<string, unknown>) => {
  // Current Date iso From
  const date = new Date().toISOString();
  const currentDate = date.substring(0, date.indexOf('T'));
  const requestedDate = query.date || currentDate;

  const result = await Booking.find(
    { date: requestedDate, isBooked: { $ne: IsBooked_Status.canceled } },
    { endTime: 1, startTime: 1, _id: 0 },
  );

  const availableSlots = findAvailableTime(result);

  return availableSlots;
};

export const bookingCheckerServices = {
  bookingCheckFromDB,
};
