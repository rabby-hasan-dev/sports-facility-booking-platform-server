import express from 'express';
import { bookingController } from './booking.controller';

const router = express.Router();

router.post('/', bookingController.createBookings)
router.get('/', bookingController.getAllBookings)
router.delete('/:bookingId', bookingController.cancelBookings)


export const bookingRouter = router;
