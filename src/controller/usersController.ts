import { prisma } from "../application/database";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import z from "zod";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { RegisterSchema } from "../@types/userType";

export const register = async (req: Request, res: Response) => {
  const parsed = RegisterSchema.safeParse(req.body);

  // Validation parsing error
  if (!parsed.success) {
    return res.status(400).json({
      error: z.treeifyError(parsed.error),
    });
  }

  try {
    const { username, firstName, lastName, email, password } = parsed.data;

    // Cek username already register
    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) return res.json({ message: "Username sudah digunakan." });
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        firstName,
        lastName,
        email,
        password: hashPassword,
      },
    });

    const payload = {
      username,
      firstName,
      lastName,
      email,
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
    res.status(500).json({ success: false, error: "Internal server error." });
  }
};
