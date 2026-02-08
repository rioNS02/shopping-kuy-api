import express from "express";
import { getAllUsers } from "../controller/adminController";

export const router = express.Router();

router.get("/admin/users", getAllUsers);
