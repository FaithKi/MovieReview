const express = require('express')
const Movie = require('../models/movieModel')
const {createMovie, getAllMovies,getOneMovie, updateMovie, deleteMovie} = require('../controllers/movieController')

const router = express.Router()

router.get('/', getAllMovies)

router.get('/:id',getOneMovie)

router.post('/', createMovie)

router.delete('/:id', deleteMovie)
router.patch('/:id', updateMovie)

module.exports = router