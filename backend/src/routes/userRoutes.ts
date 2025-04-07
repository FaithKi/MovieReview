import express from "express";
import { authenticate } from "../middleware/authMiddleware.ts";
import { getProfile } from "../controllers/userController.ts";

const router = express.Router();

router.get("/profile", authenticate, getProfile);

export default router;
