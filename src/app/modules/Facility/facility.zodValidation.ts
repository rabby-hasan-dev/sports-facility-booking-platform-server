import { z } from 'zod';

export const FacilitySchemaValidation = z.object({
    name: z.string({ invalid_type_error: "Name is required" }),
    description: z.string({ invalid_type_error: "Description is required" }),
    pricePerHour: z.number().min(0, "Price per hour must be non-negative"),
    location: z.string({ invalid_type_error: "Location is required" }),
    isDeleted: z.boolean().optional(),
});

export const updateFacilitySchemaValidation = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    pricePerHour: z.number().optional(),
    location: z.string().optional(),
    isDeleted: z.boolean().optional(),
});