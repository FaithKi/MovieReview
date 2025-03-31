import { Link } from "react-router-dom";
import MovieProps from "../props/MovieProps";

interface MovieListProps {
  movies: Array<MovieProps>;
}

export default function MovieList({ movies }: MovieListProps) {
  return (
    <div className="movie-list">
      <div className="movie-list-header">All movies</div>
      <div className="movie-list-contents">
        {movies.map((movie: MovieProps) => (
          <div className="movie-list-content" key={movie._id}>
            <div className="movie-item-wrapper">
              <Link to={`/movie/${movie._id}`}>
                <div className="movie-poster">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                </div>
              </Link>
              {/* <div className="movie-title">{movie.title}</div> */}
            </div>
            <button className="watchlist-button">Watchlist</button>
          </div>
        ))}
      </div>
    </div>
  );
}
