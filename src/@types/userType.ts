import z from "zod";

export const UserBaseSchema = z.object({
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.email(),
  role: z.enum(["ADMIN", "CUSTOMER", "SELLER"]),
});

export const idUserSchema = z.object({
  id: z.number().int().positive(),
});

export const RegisterSchema = UserBaseSchema.extend({
  password: z.string().min(8),
});

export const loginSchema = z.object({
  username: z.string(),
  password: z.string().min(8),
});
