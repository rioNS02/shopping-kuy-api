import type { Request, Response } from "express";
import { prisma } from "../application/database";
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();

    if (!users)
      return res
        .status(404)
        .json({ success: false, message: "Data user tidak ditemukan." });

    return res
      .status(200)
      .json({ success: true, message: "Ambil data user sukses.", data: users });
  } catch (error) {
    res.status(500).json({ error: error });
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
    res.status(500).json({ error: error });
  }
};
