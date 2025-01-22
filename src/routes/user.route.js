import express from "express";
import { getUsers, validateUser, postMessages } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getUsers).post("/validateUser", validateUser).post("/post", postMessages);

export default router;
