import z from "zod";

export const UserSchema = z.object({
  username: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.email(),
  password: z.string().min(8),
});

export const OtpSchema = z.object({
  token: z.string().min(5).max(5),
  expired_at: z.iso.datetime(),
});
