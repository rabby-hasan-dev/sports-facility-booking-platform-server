import { Types } from "mongoose";



export type TBooking = {
    date: string;
    startTime: string,
    endTime: string,
    user?: Types.ObjectId;
    payableAmount?: number;
    facility?: Types.ObjectId;
    isBooked?: "confirmed" | "unconfirmed" | "canceled";
}