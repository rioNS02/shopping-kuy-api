import type { Request, Response, NextFunction } from "express";
export const roleMiddleware = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.body.user;

    if (!user) return res.status(401).json({ message: "Unauthorizated" });

    if (!allowedRoles.includes(user.role))
      return res.status(404).json({ error: "Access denied" });

    next();
  };
};
