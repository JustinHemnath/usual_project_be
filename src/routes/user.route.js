import express from "express";
import { getUsers, validateUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getUsers).post("/validateUser", validateUser);

export default router;
