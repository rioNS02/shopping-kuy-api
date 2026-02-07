import z from "zod";

export const UserSchema = z.object({
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.email(),
  password: z.string().min(8),
  role: z.enum(["ADMIN", "CUSTOMER", "SELLER"]),
});
