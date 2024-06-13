"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const OrdersValidationSchema = zod_1.z.object({
    email: zod_1.z.string().trim(),
    productId: zod_1.z.string().trim(),
    price: zod_1.z.number(),
    quantity: zod_1.z.number(),
});
exports.default = OrdersValidationSchema;
