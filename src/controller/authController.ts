import { prisma } from "../application/database";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import z from "zod";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { UserSchema } from "../@types/userType";

export const register = async (req: Request, res: Response) => {
  const parsed = UserSchema.safeParse(req.body);

  // Validation parsing error
  if (!parsed.success) {
    return res.status(400).json({
      error: z.treeifyError(parsed.error),
    });
  }

  try {
    // Cek username already register
    const { username, firstName, lastName, email, password, role } =
      parsed.data;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.json({ message: "Username sudah digunakan." });
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        firstName,
        lastName,
        email,
        password: hashPassword,
        role: role,
      },
    });

    const payload = {
      username,
      firstName,
      lastName,
      email,
      role,
    };

    const accessToken = process.env.ACCESS_TOKEN;
    // validation token not found
    if (!accessToken) {
      throw new Error("Token not found");
    }

    const token = jwt.sign(payload, accessToken, {
      expiresIn: "1m",
    });

    res.status(201).json({
      success: true,
      message: "Register sukses.",
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
