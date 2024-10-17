"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/Auth/auth.route");
const booking_route_1 = require("../modules/Booking/booking.route");
const bookingChecker_route_1 = require("../modules/BookingChecker/bookingChecker.route");
const facility_route_1 = require("../modules/Facility/facility.route");
const payment_route_1 = require("../modules/payment/payment.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.authRouter,
    },
    {
        path: '/facility',
        route: facility_route_1.facilityRouter,
    },
    {
        path: '/bookings',
        route: booking_route_1.bookingRouter,
    },
    {
        path: '/check-availability',
        route: bookingChecker_route_1.bookingCheckerRouter,
    },
    {
        path: '/payments',
        route: payment_route_1.paymentRoutes,
    },
];
moduleRoutes.forEach((routes) => router.use(routes.path, routes.route));
exports.default = router;
