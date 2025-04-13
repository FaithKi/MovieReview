import axios from "axios";
import { MovieProps } from "../type";

export const fetchProfileMovies = async (link: string, setMovie: (movies:MovieProps[]) => void) => {
    try {
        const response = await axios.get(link);
        const likes = await response.data;
        const mov: MovieProps[] = likes.map((movie: any) => movie.movieId
        );
        setMovie(mov);
    } catch (error) {
        console.log(error);
    }
}