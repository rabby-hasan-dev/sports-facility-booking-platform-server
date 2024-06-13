import { z } from 'zod';

export const BookingSchemaValidation = z.object({
    date: z.string({ invalid_type_error: "Date is required" }),
    startTime: z.string({ invalid_type_error: "start time is required" }),
    endTime: z.string({ invalid_type_error: " end time  is required" }),
    user: z.string(),
    payableAmount: z.number().min(0, "Payable amount must be non-negative"),
    facility: z.string(),
    isBooked: z.enum(["confirmed", "unconfirmed", "canceled"], { message: "Invalid booking status" })
});


export const updateBookingSchemaValidation = z.object({
    date: z.string().optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
    user: z.string().optional(),
    payableAmount: z.number().optional(),
    facility: z.string().optional(),
    isBooked: z.enum(["confirmed", "unconfirmed", "canceled"], { message: "Invalid booking status" }).optional(),
});