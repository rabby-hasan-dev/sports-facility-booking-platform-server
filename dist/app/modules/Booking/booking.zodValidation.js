"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingSchemaValidation = void 0;
const zod_1 = require("zod");
// Define a Zod schema for ObjectId
const objectIdSchema = zod_1.z
    .string()
    .refine((val) => val.length === 24 && /^[0-9a-fA-F]*$/.test(val), {
    message: 'Invalid ObjectId',
});
exports.BookingSchemaValidation = zod_1.z.object({
    body: zod_1.z.object({
        date: zod_1.z.string({ invalid_type_error: 'Date is required' }),
        startTime: zod_1.z.string({ invalid_type_error: 'start time is required' }),
        endTime: zod_1.z.string({ invalid_type_error: ' end time  is required' }),
        facility: objectIdSchema,
    }),
});
