import express from "express";
import { getUserWatchlist, addToWatchlist, removeFromWatchlist } from "../controllers/watchlistControllers.ts";

const router = express.Router();

router.get("/:userId", getUserWatchlist);
router.post("/", addToWatchlist);
router.delete("/", removeFromWatchlist);