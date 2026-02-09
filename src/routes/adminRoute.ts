import express from "express";
import { getAllUsers, getUsersById } from "../controller/adminController";

export const router = express.Router();

router.get("/admin/users", getAllUsers);
router.get("/admin/users/:id", getUsersById);
