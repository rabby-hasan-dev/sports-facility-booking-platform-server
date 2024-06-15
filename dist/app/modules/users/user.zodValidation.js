"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchemaValidation = void 0;
const zod_1 = require("zod");
exports.UserSchemaValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ invalid_type_error: 'Name is required' }),
        email: zod_1.z.string({ invalid_type_error: 'Email is required' }),
        password: zod_1.z.string({ invalid_type_error: 'Password is required' }),
        phone: zod_1.z.string({ invalid_type_error: 'Phone number is required' }),
        role: zod_1.z.enum(['admin', 'user'], { required_error: 'Role is required' }),
        address: zod_1.z.string({ invalid_type_error: 'Address is required' }),
    }),
});
