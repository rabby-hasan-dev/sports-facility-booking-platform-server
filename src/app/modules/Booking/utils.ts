import { TBooking } from './booking.interface';

export const calculatePayableAmount = (
  pricePerHour: number,
  payload: TBooking,
) => {
  const startTime =
    Number(payload?.startTime.split(':')[0]) +
    (Number(payload?.startTime.split(':')[1]) * 1) / 60;

  const endTime =
    Number(payload?.endTime.split(':')[0]) +
    (Number(payload?.endTime.split(':')[1]) * 1) / 60;

  const bookingDuaration = endTime - startTime;
  const calculatePayableAmount = bookingDuaration * Number(pricePerHour);

  return calculatePayableAmount;
};
