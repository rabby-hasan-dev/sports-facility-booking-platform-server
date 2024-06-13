"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// Define the VariantValidationSchema in Zod
const VariantValidationSchema = zod_1.z.object({
    type: zod_1.z.string().trim().min(1, 'type is required'),
    value: zod_1.z.string().trim().min(1, 'value is required'),
});
// Define the InventoryValidationSchema in Zod
const InventoryValidationSchema = zod_1.z.object({
    quantity: zod_1.z
        .number()
        .int()
        .nonnegative('quantity must be a non-negative number'),
    inStock: zod_1.z.boolean(),
});
// Define the ProductSchema in Zod
const ProductValidationSchema = zod_1.z.object({
    _id: zod_1.z.string().optional(),
    name: zod_1.z.string().trim().min(1, 'name is required'),
    description: zod_1.z.string().trim().min(1, 'description is required'),
    price: zod_1.z.number().nonnegative('price must be a non-negative number'),
    category: zod_1.z.string().trim().min(1, 'category is required'),
    tags: zod_1.z.array(zod_1.z.string().trim().min(1, 'tag cannot be empty')),
    variants: zod_1.z.array(VariantValidationSchema).min(1, 'variants is required'),
    inventory: InventoryValidationSchema,
});
exports.default = ProductValidationSchema;
