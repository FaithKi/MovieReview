import express from "express";
import { getUserWatchlist, addToWatchlist, removeFromWatchlist, getMovieInWatchlist } from "../controllers/watchlistControllers.ts";
import { authenticate } from "../middleware/authMiddleware.ts";

const router = express.Router();

router.get("/:userId", getUserWatchlist);
router.get("/:userId/:movieId", getMovieInWatchlist);
router.post("/",authenticate, addToWatchlist);
router.delete("/",authenticate, removeFromWatchlist);

export default router;