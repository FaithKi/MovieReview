import { MovieReview } from "../models/MovieReviewModel.ts";
import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middleware/authMiddleware.ts";

export const getUserReviews = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const reviews = await MovieReview.find({ userId });
        res.status(200).json(reviews);
        // console.log(reviews);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const getMovieReviews = async (req: Request, res: Response) => {
    const { movieId } = req.params;
    try {
        const reviews = await MovieReview.find({ movieId });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const getReview = async (req: Request, res: Response) => {
    const { userId, movieId } = req.params;
    try {
        const review = await MovieReview.findOne({ userId, movieId });
        if (!review) {
        // Not watched
            res.status(200).json({ watched: false });
            return
        }

        const response = {
            watched: true,
            review: review.review || null,
            star: review.star ?? null,
            liked: review.liked ?? false
        };
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const createReview = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        const { movieId, review, star, liked } = req.body;
    
        if (!movieId) {
            res.status(400).json({ error: 'movieId is required.' });
            return
        }
    
        // Check if review already exists for this user + movie
        const existing = await MovieReview.findOne({ userId, movieId });
        if (existing) {
            res.status(400).json({ error: 'Review already exists for this movie.' });
            return
        }
    
        // Create new review (only include fields if they’re defined)
        const newReview = new MovieReview({
          userId,
          movieId,
          ...(review !== undefined && { review }),
          ...(star !== undefined && { star }),
          ...(liked !== undefined && { liked }),
        });
    
        await newReview.save();
        res.status(201).json(newReview);
        // console.log(newReview);
      } catch (err) {
        console.error(err);
        res.status(500).json({message: err});
      }
      
}

export const updateReview = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        const { movieId, review, star, liked } = req.body;

        if (!movieId) {
            res.status(400).json({ error: 'movieId is required.' });
            return
          }
      
        const existing = await MovieReview.findOne({ userId, movieId });
        if (!existing) {
            res.status(404).json({ error: 'Review not found.' });
            return
        }

        if (review !== undefined) existing.review = review;
        if (star !== undefined) existing.star = star;
        if (liked !== undefined) existing.liked = liked;

        await existing.save();
        res.status(200).json(existing);
        // console.log(existing);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}

export const deleteReview = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        const { movieId } = req.body;

        if (!movieId) {
            res.status(400).json({ error: 'movieId is required.' });
            return
        }

        const deleted = await MovieReview.findOneAndDelete({ userId, movieId });

        if (!deleted) {
            res.status(404).json({ error: 'Review not found.' });
            return
        }
        // console.log(deleted);
        res.status(200).json({ message: 'Review deleted successfully.' });

    } catch (err) {
    console.error(err);
        res.status(500).json({ error: 'Something went wrong.' });
    }
};

export const getRecentLikes = async (req: Request, res: Response) => {
    console.log("getRecentLikes");
    const { userId } = req.params;
    console.log(userId);
    try {
      const reviews = await MovieReview.find({ userId, liked: true })
        .sort({ updatedAt: -1 })
        .populate({
          path: 'movieId',
          select:
            'title tagline genres release_date vote_average vote_count runtime poster_path',
        })
        .limit(6);
      res.status(200).json(reviews);
    } catch (error: any) {
      console.error('Error in getRecentLikes:', error);
      res.status(500).json({ message: error.message || 'Server error' });
    }
  };
  
