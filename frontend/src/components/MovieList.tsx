import { Link } from "react-router-dom";
import MovieProps from "../props/MovieProps";

interface MovieListProps {
  movies: Array<MovieProps>;
}

export default function MovieList({ movies }: MovieListProps) {
  return (
    <div className="movie-list">
      <div className="movie-list-header">Zuper movies</div>
      <div className="movie-list-contents">
        {movies.map((movie: MovieProps) => (
          <div className="movie-list-content">
            <div className="movie-item-wrapper" key={movie._id}>
              <Link to={`/movie/${movie._id}`}>
                <div className="movie-poster"></div>
              </Link>
              <div className="movie-title">{movie.title}</div>
            </div>
            <button className="watchlist-button">Watchlist</button>
          </div>

        ))}
      </div>

    </div>
  );
}
