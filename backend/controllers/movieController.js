import Movie from '../models/movieModel.js'
import mongoose from 'mongoose';

const getMovies = async (req, res) => {
    try{
        const movies = await Movie.find().select("_id title tagline popularity runtime poster_path");
        res.status(200).json(movies)
    } catch(error) {
        res.status(500).json({message: error.message})
    }
}

const getMovie = async(req, res) => {
    const {id} = req.params;
    try {
        const  movie = await Movie.findById(id)
        if (!movie) return res.status(404).json({message: 'Movie not found'})
        res.status(200).json(movie)    
    } catch(error) {
        res.status(500).json({message: error.message})
    }
};

export {getMovies, getMovie}