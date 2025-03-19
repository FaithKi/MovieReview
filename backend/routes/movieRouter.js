import express from 'express'
import {createMovie, getAllMovies,getOneMovie, updateMovie, deleteMovie} from '../controllers/movieController.js'

const router = express.Router()

router.get('/', getAllMovies)

router.get('/:id',getOneMovie)

router.post('/', createMovie)

router.delete('/:id', deleteMovie)
router.patch('/:id', updateMovie)

export default router