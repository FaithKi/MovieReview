import express from 'express'
import {getMovies, getMovie} from '../controllers/movieController.ts'

const router = express.Router()

router.get('/', getMovies)
router.get('/:id', getMovie)

export default router