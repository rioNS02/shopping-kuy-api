import z from "zod";

export const UserBaseSchema = z.object({
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.email(),
  role: z.enum(["ADMIN", "CUSTOMER", "SELLER"]),
});

export const RegisterSchema = UserBaseSchema.extend({
  password: z.string().min(8),
});
