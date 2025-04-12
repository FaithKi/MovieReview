import express from 'express'
import { createReview, deleteReview, updateReview, getReview, getMovieReviews, getUserReviews } from '../controllers/reviewControllers.ts'
import { authenticate } from '../middleware/authMiddleware.ts'


const router = express.Router()

router.get('/user/:userId', getUserReviews)
router.get('/movie/:movieId', getMovieReviews)
router.get('/:userId/:movieId', getReview)
router.post('/create', authenticate, createReview)
router.delete('/delete', authenticate, deleteReview)
router.patch('/update', authenticate, updateReview)

export default router