import httpStatus from 'http-status';
import catchAsync from '../../utilis/catchAsync';
import sendResponse from '../../utilis/sendResponse';
import { bookingCheckerServices } from './bookingChecker.service';

const bookingChecker = catchAsync(async (req, res, next) => {
  const query = req.query;

  const result = await bookingCheckerServices.bookingCheckFromDB(query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    succcess: true,
    message: 'Availability checked successfully',
    data: result,
  });
});

export const bookingCheckerController = {
  bookingChecker,
};
