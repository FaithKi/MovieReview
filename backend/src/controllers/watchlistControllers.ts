import { Watchlist } from "../models/WatchlistModel.ts";
import { Request, response, Response } from "express";
import { AuthenticatedRequest } from "../middleware/authMiddleware.ts";

export const getUserWatchlist = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const watchlist = await Watchlist.find({ userId })
            .sort({ addedAt: -1 }) // newest first
            .populate({
            path: 'movieId',
            select: 'title tagline genres release_date vote_average vote_count runtime poster_path',
            }).limit(6);;
      
        res.status(200).json(watchlist);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const getMovieInWatchlist = async (req: Request, res: Response) => { 
    try {
        const { userId , movieId} = req.params;


        if (!movieId) {
            res.status(400).json({ error: 'movieId is required.' });
            return
        }

        const inWatchlist = await Watchlist.findOne({ userId, movieId });
        const response = {
            inWatchlist: true,
        };
        if (!inWatchlist) {
            // Not watched
            response.inWatchlist = false;
        }

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const addToWatchlist = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        const { movieId} = req.body;
    
        if (!movieId) {
            res.status(400).json({ error: 'movieId is required.' });
            return
        }
    
        // Check if review already exists for this user + movie
        const existing = await Watchlist.findOne({ userId, movieId });
        if (existing) {
            res.status(400).json({ error: 'Watchlist already exists for this movie.' });
            return
        }
    
        // Create new review (only include fields if they’re defined)
        const newWatchlist = new Watchlist({
          userId,
          movieId,
        });
    
        await newWatchlist.save();
        res.status(201).json(newWatchlist);
      } catch (err) {
        console.error(err);
        res.status(500).json({message: err});
      }
      
}

export const removeFromWatchlist= async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        const { movieId } = req.body;

        if (!movieId) {
            res.status(400).json({ error: 'movieId is required.' });
            return
        }

        const deleted = await Watchlist.findOneAndDelete({ userId, movieId });

        if (!deleted) {
            res.status(404).json({ error: 'Watchlist not found.' });
            return
        }
        res.status(200).json({ message: 'Watchlist deleted successfully.' });

    } catch (err) {
    console.error(err);
        res.status(500).json({ error: 'Something went wrong.' });
    }
};
