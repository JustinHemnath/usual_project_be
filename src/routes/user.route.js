import express from "express";
import { getUsers, validateUser, postUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getUsers).post("/validateUser", validateUser).post("/post", postUser);

export default router;
