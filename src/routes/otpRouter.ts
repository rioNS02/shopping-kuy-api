import express from "express";
import type { Request, Response } from "express";
import { UserBaseSchema } from "../@types/userType";
import { prisma } from "../application/database";
import { OtpSchema } from "../@types/otpType";

const router = express.Router();

router.post("auth/generate-otp", async (req: Request, res: Response) => {
  const parsedUser = UserBaseSchema.parse(req.body);
  const parsedOtp = OtpSchema.parse(req.body);
  const { email } = parsedUser;
  const { token, expired_at } = parsedOtp;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(404).json({ message: "User not found." });

  const otp = await prisma.otp.create({
    data: {
      codeHash: token,
      expiredAt: expired_at,
    },
  });
});
