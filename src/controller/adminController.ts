import type { Request, Response } from "express";
import { prisma } from "../application/database";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();

    if (!users) return res.status(404).json({ message: "Users not found" });

    return res
      .status(200)
      .json({ success: true, message: "Ambil data user sukses.", data: users });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
