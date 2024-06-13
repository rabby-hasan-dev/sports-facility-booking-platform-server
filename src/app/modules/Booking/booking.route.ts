import express from 'express';
import { bookingController } from './booking.controller';

const router = express.Router();

router.post('/', bookingController.createBookings)
router.get('/', bookingController.getAllBookings)
router.delete('/:bookingId', bookingController.deleteBookings)

export const bookingRouter = router;
