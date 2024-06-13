import { z } from 'zod';

export const FacilitySchemaValidation = z.object({
    name: z.string({ invalid_type_error: "Name is required" }),
    description: z.string({ invalid_type_error: "Description is required" }),
    pricePerHour: z.number().min(0, "Price per hour must be non-negative"),
    location: z.string({ invalid_type_error: "Location is required" }),
    isDeleted: z.boolean()
});