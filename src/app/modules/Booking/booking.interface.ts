import { Types } from "mongoose";
import { IsBooked_Status } from "./booking.constant";



export type TBooking = {
    date: string;
    startTime: string,
    endTime: string,
    user?: Types.ObjectId;
    payableAmount?: number;
    facility?: Types.ObjectId;
    isBooked?: keyof typeof IsBooked_Status;
}