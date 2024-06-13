import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";




const BookingSchema = new Schema<TBooking>({
    date: {
        type: String,
        required: true
    },

    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    payableAmount: {
        type: Number,
        required: true
    },
    facility: {
        type: Schema.Types.ObjectId,
        ref: 'facility',
        required: true
    },
    isBooked: {
        type: String,
        required: true,
        enum: ["confirmed", "unconfirmed", "canceled"],

    }
},
)


export const Booking = model<TBooking>('booking', BookingSchema);