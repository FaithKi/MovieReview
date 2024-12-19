import { Link } from "react-router-dom";
import MovieProps from "../props/MovieProps";

interface MovieListProps {
  movies: Array<MovieProps>;
}

export default function MovieList({ movies }: MovieListProps) {
  return (
    <div className="movie-list">
      {movies.map((movie: MovieProps) => (
        <div className="movie-item-wrapper" key={movie._id}>
          <Link to={`/movie/${movie._id}`}>
            <div className="movie-title">{movie.title}</div>
          </Link>
        </div>
      ))}
    </div>
  );
}
