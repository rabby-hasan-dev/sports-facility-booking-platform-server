import { Schema, model } from "mongoose";
import { IsBooked_Status } from "./booking.constant";
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
        ref: 'User'
    },
    payableAmount: {
        type: Number,
        required: true
    },
    facility: {
        type: Schema.Types.ObjectId,
        ref: 'Facility',
        required: true
    },
    isBooked: {
        type: String,
        required: true,
        enum: Object.keys(IsBooked_Status),
        default: IsBooked_Status.confirmed

    }
},
)


export const Booking = model<TBooking>('Booking', BookingSchema);