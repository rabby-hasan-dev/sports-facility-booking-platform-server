import { z } from 'zod';

export const FacilitySchemaValidation = z.object({

    body: z.object({
        name: z.string({ invalid_type_error: "Name is required" }),
        description: z.string({ invalid_type_error: "Description is required" }),
        pricePerHour: z.number({ invalid_type_error: "Price must be number value" }).min(0, "Price per hour must be non-negative"),
        location: z.string({ invalid_type_error: "Location is required" }),

    })
})

export const updateFacilitySchemaValidation = z.object({
    body: z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        pricePerHour: z.number().optional(),
        location: z.string().optional(),

    })
})