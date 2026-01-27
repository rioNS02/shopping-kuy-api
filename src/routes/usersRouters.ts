import express from "express";
import { register } from "../controller/usersController";

export const router = express.Router();

router.post("/users/register", register);
