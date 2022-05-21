import express from "express";
import { createUser, loginUser, getMe } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/create", createUser);
router.post("/login", loginUser);
router.get("/getme", authMiddleware, getMe);

export default router;
