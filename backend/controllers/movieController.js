import Movie from '../models/movieModel.js'
import mongoose from 'mongoose';

const createMovie = async (req,res) => {
    const {title, year, description, ratings} = req.body

    // add doc to db
    try {
        const movie = await Movie.create({title,year,description,ratings})
        res.status(200).json(movie)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const updateMovie = async (req,res) => {
    const {id} = req.params
    const update = req.body

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:'Not a valid ID'})
    }

    const movie = await Movie.findByIdAndUpdate(id, update)
    if(!movie) {
        res.status(404).json({error:'No such movie'})
    }
    res.status(200).json(movie)
}

const deleteMovie = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:'Not a valid ID'})
    }

    const movie = await Movie.findByIdAndDelete(id)
    if(!movie) {
        res.status(404).json({error:'No such movie'})
    }
    res.status(200).json(movie)
}

const getAllMovies = async (req,res) => {
    const movies = await Movie.find({}).sort({createdAt:-1})
    res.status(200).json(movies)
}

const getOneMovie = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:'Not a valid ID'})
    }
    const movie = await Movie.findById(id)

    if(!movie) {
        res.status(404).json({error:'No such movie'})
    }
    res.status(200).json(movie)
}

export {createMovie, getAllMovies, getOneMovie, updateMovie, deleteMovie}