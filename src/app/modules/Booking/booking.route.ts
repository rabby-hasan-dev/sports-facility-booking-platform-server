import express from 'express';
import { auth } from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { USER_Role } from '../users/user.constant';
import { bookingController } from './booking.controller';
import { BookingSchemaValidation } from './booking.zodValidation';

const router = express.Router();

router.post('/', validateRequest(BookingSchemaValidation), auth(USER_Role.user), bookingController.createBookings)
router.get('/', auth(USER_Role.admin), bookingController.getAllBookings)
router.get('/user', auth(USER_Role.user), bookingController.getUserBookings)
router.delete('/:bookingId', auth(USER_Role.user), bookingController.cancelBookings)


export const bookingRouter = router;
