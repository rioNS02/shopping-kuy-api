import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authorization = req.headers.authorization;
  const token = authorization?.split(" ")[1]!;

  try {
    if (!authorization)
      return res.status(401).json({ message: "Unauthorization" });

    const accessToken = process.env.ACCESS_TOKEN;

    if (!accessToken)
      throw new Error(
        "FATAL ERROR: JWT SECRET is not defined in env variable.",
      );

    jwt.verify(token, accessToken, (err, decoded) => {
      if (err) return res.status(403).json({ message: err });

      req.body.user = decoded;

      next();
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
