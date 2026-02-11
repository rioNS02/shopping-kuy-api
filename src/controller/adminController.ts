import type { Request, Response } from "express";
import { prisma } from "../application/database";
import { idUserSchema } from "../@types/userType";
import { Prisma } from "../generated/prisma/client";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();

    return res
      .status(200)
      .json({ success: true, message: "Ambil data user sukses.", data: users });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};

export const getUsersById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const users = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!users)
      return res
        .status(404)
        .json({ success: false, message: "Data user tidak ditemukan." });

    return res
      .status(200)
      .json({ success: true, message: "Ambil data sukses.", data: users });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};

export const deleteUsersByUsername = async (req: Request, res: Response) => {
  try {
    const parsed = idUserSchema.parse(req.params);
    const { username } = parsed;
    await prisma.user.delete({
      where: {
        username,
      },
    });

    return res.status(200).json({ message: "OK." });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025")
        return res.status(404).json({ message: "User not found." });
    }
    return res.status(500).json({ message: "Internal server error." });
  }
};
