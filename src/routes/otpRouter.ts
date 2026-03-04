import express from "express";
import type { Request, Response } from "express";
import { UserBaseSchema } from "../@types/userType";
import { prisma } from "../application/database";

const router = express.Router();

router.post("auth/generate-otp", async (req: Request, res: Response) => {
  const parsed = UserBaseSchema.parse(req.body);
  const { email } = parsed;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
});
