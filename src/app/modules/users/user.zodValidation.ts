import { z } from 'zod';

export const UserSchemaValidation = z.object({
  body: z.object({
    name: z.string({ invalid_type_error: 'Name is required' }),
    email: z.string({ invalid_type_error: 'Email is required' }),
    password: z.string({ invalid_type_error: 'Password is required' }),
    phone: z.string({ invalid_type_error: 'Phone number is required' }),
    role: z.enum(['admin', 'user'], { required_error: 'Role is required' }),
    address: z.string({ invalid_type_error: 'Address is required' }),
  }),
});
