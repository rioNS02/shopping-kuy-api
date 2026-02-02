import z from "zod";

export const UserSchema = z.object({
  username: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.email(),
  password: z.string().min(8),
  role: z.enum(["ADMIN", "CUSTOMER", "SELLER"]),
});
