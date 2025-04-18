import Movie from '../models/MovieModel.ts';
import { Request, Response} from "express";

const getMovies = async (req: Request, res: Response) => {
    try{
        const movies = await Movie.find().select("_id title tagline genres release_date vote_average vote_count runtime poster_path");
        res.status(200).json(movies)
    } catch(error) {
        res.status(500).json({message: error})
    }
}

const getMovie = async (req: Request, res: Response)=> {
    const {id} = req.params;
    try {
        const  movie = await Movie.findById(id)
        if (!movie) {
            res.status(404).json({message: 'Movie not found'})
            return
        }
        res.status(200).json(movie)    
    } catch(error) {
        res.status(500).json({message: error})
    }
};

export {getMovies, getMovie}