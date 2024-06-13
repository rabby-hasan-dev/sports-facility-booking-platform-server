import { z } from 'zod';

export const BookingSchemaValidation = z.object({
    date: z.string({ invalid_type_error: "Date is required" }),
    user: z.string({ invalid_type_error: "User is required" }),
    payableAmount: z.number().min(0, "Payable amount must be non-negative"),
    facility: z.string({ invalid_type_error: "Facility is required" }),
    isBooked: z.boolean()
});