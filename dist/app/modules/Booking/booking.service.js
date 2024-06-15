"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingServices = void 0;
const facility_model_1 = require("../Facility/facility.model");
const user_model_1 = require("../users/user.model");
const booking_constant_1 = require("./booking.constant");
const booking_model_1 = require("./booking.model");
const utils_1 = require("./utils");
// RETRIVE ALL BOOKINGS FROM DATABASE
const getAllBookingsIntoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.find({
        isBooked: { $eq: booking_constant_1.IsBooked_Status.confirmed },
    })
        .populate('user')
        .populate('facility');
    return result;
});
// RETRIVE  BOOKINGS FOR SPECIFIC USER FROM DATABASE
const getUserBookingsIntoDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userExists = yield user_model_1.User.findOne({ email: user === null || user === void 0 ? void 0 : user.email });
    const result = yield booking_model_1.Booking.find({
        user: userExists === null || userExists === void 0 ? void 0 : userExists._id,
        isBooked: { $eq: booking_constant_1.IsBooked_Status.confirmed },
    })
        .populate('user')
        .populate('facility');
    return result;
});
// CREATE BOOKINGS FROM DATABASE
const createdBookingIntoDB = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    let booking = Object.assign({}, payload);
    const userExists = yield user_model_1.User.findOne({ email: user === null || user === void 0 ? void 0 : user.email });
    const findFacility = yield facility_model_1.Facility.findById(payload === null || payload === void 0 ? void 0 : payload.facility);
    if (userExists && findFacility) {
        // User Id set
        booking.user = userExists._id;
        // PAYBALE AMOUNT HANDLER
        const pricePerHour = Number(findFacility === null || findFacility === void 0 ? void 0 : findFacility.pricePerHour);
        booking.payableAmount = (0, utils_1.calculatePayableAmount)(pricePerHour, payload);
    }
    else {
        throw new Error('Sorry! User or Payable amount missing!');
    }
    const result = yield booking_model_1.Booking.create(booking);
    return result;
});
//  CANCEL BOOKINGS  FROM DATABASE
const cancelBookingIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.findByIdAndUpdate(id, { isBooked: booking_constant_1.IsBooked_Status.canceled }, { new: true }).populate('facility');
    return result;
});
exports.bookingServices = {
    createdBookingIntoDB,
    getAllBookingsIntoDB,
    cancelBookingIntoDB,
    getUserBookingsIntoDB,
};
