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
exports.bookingCheckerServices = void 0;
const booking_constant_1 = require("../Booking/booking.constant");
const booking_model_1 = require("../Booking/booking.model");
const facility_model_1 = require("../Facility/facility.model");
const utils_1 = require("./utils");
const bookingCheckFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // Current Date iso From
    const date = new Date().toISOString();
    const currentDate = date.substring(0, date.indexOf('T'));
    const requestedDate = query.date || currentDate;
    const facilityId = query.facility;
    const facilityChecker = yield facility_model_1.Facility.findById(facilityId);
    if (!facilityChecker) {
        throw new Error("can't find facility");
    }
    const result = yield booking_model_1.Booking.find({
        date: requestedDate,
        isBooked: { $ne: booking_constant_1.IsBooked_Status.canceled },
        facility: facilityId,
    }, { endTime: 1, startTime: 1, _id: 0 });
    const availableSlots = (0, utils_1.findAvailableTime)(result);
    if (!availableSlots[0]) {
        throw new Error('Sorry! There is no available time  in this  facility on this date. Please! Booking others day or facility');
    }
    return availableSlots;
});
exports.bookingCheckerServices = {
    bookingCheckFromDB,
};
