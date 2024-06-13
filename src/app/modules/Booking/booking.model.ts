import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";




const BookingSchema = new Schema<TBooking>({
    date: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    payableAmount: {
        type: Number,
        required: true
    },
    facility: {
        type: String,
        required: true
    },
    isBooked: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true,
})


export const Booking = model<TBooking>('booking', BookingSchema);