"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
const booking_constant_1 = require("./booking.constant");
const BookingSchema = new mongoose_1.Schema({
    date: {
        type: String,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    payableAmount: {
        type: Number,
        required: true,
    },
    facility: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Facility',
        required: true,
    },
    isBooked: {
        type: String,
        required: true,
        enum: Object.keys(booking_constant_1.IsBooked_Status),
        default: booking_constant_1.IsBooked_Status.confirmed,
    },
}, {
    versionKey: false,
});
exports.Booking = (0, mongoose_1.model)('Booking', BookingSchema);
