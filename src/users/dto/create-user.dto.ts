import { z } from 'zod';

export const createUserSchema = z
  .object({
    name: z.string().min(3, 'Name has to be at least 3 characters long'),
    email: z.string().email('Invalid email address'),
    password: z
      .string()
      .min(6, 'Password has to be at least 8 characters long'),
  })
  .required();

export type CreateUserDto = z.infer<typeof createUserSchema>;
