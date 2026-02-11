import express from "express";
import {
  deleteUsersByUsername,
  getAllUsers,
  getUsersById,
} from "../controller/adminController";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";

export const router = express.Router();

router.get(
  "/admin/users",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  getAllUsers,
);
router.get(
  "/admin/users/:id",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  getUsersById,
);
router.delete(
  "/admin/users/:username",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  deleteUsersByUsername,
);
