import express from 'express';
import { auth } from '../../middleware/auth';
import { USER_Role } from '../users/user.constant';
import { bookingController } from './booking.controller';

const router = express.Router();

router.post('/', auth(USER_Role.user), bookingController.createBookings)
router.get('/', bookingController.getAllBookings)
router.delete('/:bookingId', bookingController.cancelBookings)


export const bookingRouter = router;
