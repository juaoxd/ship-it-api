import { z } from 'zod';

export const createAddressSchema = z
  .object({
    street: z.string().min(3),
    number: z.string().min(1),
    neighborhood: z.string().min(3),
    complement: z.string().min(3).optional().or(z.literal('')),
    city: z.string().min(3),
    state: z.string().length(2),
    zip: z
      .string()
      .length(9)
      .regex(/^\d{5}-\d{3}$/),
  })
  .required();

export type CreateAddressDto = z.infer<typeof createAddressSchema>;
