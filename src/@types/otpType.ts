import z from "zod";

export const OtpSchema = z.object({
  token: z.string().min(5).max(5),
  expired_at: z.iso.datetime(),
});
