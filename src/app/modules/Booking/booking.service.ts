import { JwtPayload } from 'jsonwebtoken';
import { Facility } from '../Facility/facility.model';
import { User } from '../users/user.model';
import { IsBooked_Status } from './booking.constant';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';
import { calculatePayableAmount } from './utils';
import { initialPayment } from '../payment/payment.utils';

// RETRIVE ALL BOOKINGS FROM DATABASE

const getAllBookingsIntoDB = async () => {
  const result = await Booking.find({
    isBooked: { $eq: IsBooked_Status.confirmed },
  })
    .populate('user')
    .populate('facility');
  return result;
};
// RETRIVE  BOOKINGS FOR SPECIFIC USER FROM DATABASE

const getUserBookingsIntoDB = async (user: JwtPayload) => {
  const userExists = await User.findOne({ email: user?.email });
  const result = await Booking.find({
    user: userExists?._id,
    isBooked: { $eq: IsBooked_Status.confirmed },
  })
    .populate('user')
    .populate('facility');

  return result;
};

// CREATE BOOKINGS FROM DATABASE

const createdBookingIntoDB = async (user: JwtPayload, payload: TBooking) => {
  let booking: TBooking = { ...payload };

  const userExists = await User.findOne({ email: user?.email });
  const findFacility = await Facility.findById(payload?.facility);

  if (userExists) {
    // User Id set
    booking.user = userExists._id;
  } else {
    throw new Error('Sorry! User  missing!');
  }

  if (!findFacility) {
    throw new Error('Facility  not exist!');
  }

  const pricePerHour = Number(findFacility?.pricePerHour);

  if (!pricePerHour || isNaN(pricePerHour) || !payload) {
    throw new Error('Invalid payload or price per hour');
  }

  try {
    const payableAmount = await calculatePayableAmount(pricePerHour, payload);
    if (!payableAmount) {
      throw new Error('calculate Payable Amount Failed');
    }
    booking.payableAmount = payableAmount;
  } catch (error) {
    console.error('Error in calculatePayableAmount:', error);
    throw new Error('calculate Payable Amount Failed');
  }

  const transactionId = `TXN-${Date.now()}`;

  booking.transactionId = transactionId;

  const paymentData = {
    transactionId,
    totalPrice: booking.payableAmount,
    custormerName: userExists.name,
    customerEmail: userExists.email,
    customerPhone: userExists.phone,
    customerAddress: userExists.address,
  };

  const bookingCreate = await Booking.create(booking);

  if (bookingCreate) {
    await Facility.findByIdAndUpdate(
      payload?.facility,
      { $inc: { bookingsCount: 1 } },
      { new: true },
    );
  }

  //  payment session

  const paymentSession = await initialPayment(paymentData);
  return paymentSession;
};

//  CANCEL BOOKINGS  FROM DATABASE
const cancelBookingIntoDB = async (id: string) => {
  const result = await Booking.findByIdAndUpdate(
    id,
    { isBooked: IsBooked_Status.canceled },
    { new: true },
  ).populate('facility');

  return result;
};

export const bookingServices = {
  createdBookingIntoDB,
  getAllBookingsIntoDB,
  cancelBookingIntoDB,
  getUserBookingsIntoDB,
};
