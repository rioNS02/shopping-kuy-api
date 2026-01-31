import express from "express";
import { register } from "../controller/authController";

export const router = express.Router();

router.post("/users/register", register);
