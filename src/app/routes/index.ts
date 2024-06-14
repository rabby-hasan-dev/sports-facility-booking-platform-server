import { Router } from 'express';
import { authRouter } from '../modules/Auth/auth.route';
import { bookingRouter } from '../modules/Booking/booking.route';
import { bookingCheckerRouter } from '../modules/BookingChecker/bookingChecker.route';
import { facilityRouter } from '../modules/Facility/facility.route';
import { userRouter } from '../modules/users/user.route';


const router = Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: authRouter,
    },
    {
        path: '/users',
        route: userRouter,
    },
    {
        path: '/facility',
        route: facilityRouter,
    },
    {
        path: '/bookings',
        route: bookingRouter,
    },
    {
        path: '/check-availability',
        route: bookingCheckerRouter,
    },

];

moduleRoutes.forEach((routes) => router.use(routes.path, routes.route));


export default router;
