"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFacilitySchemaValidation = exports.FacilitySchemaValidation = void 0;
const zod_1 = require("zod");
exports.FacilitySchemaValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ invalid_type_error: 'Name is required' }),
        description: zod_1.z.string({ invalid_type_error: 'Description is required' }),
        pricePerHour: zod_1.z
            .number({ invalid_type_error: 'Price must be number value' })
            .min(0, 'Price per hour must be non-negative'),
        location: zod_1.z.string({ invalid_type_error: 'Location is required' }),
        image: zod_1.z.string({ invalid_type_error: 'Image is required' }),
    }),
});
exports.updateFacilitySchemaValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        pricePerHour: zod_1.z.number().optional(),
        location: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
    }),
});
