import { useState, useEffect } from "react";
import MovieList from "../components/MovieList";

export default function Homepage() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch("/api/movies");
      const mov = await response.json();
      setMovies(mov);
      
    };
    fetchMovies();
  }, []);

  console.log(movies.length)
  return (
    <>
      <div>
        <MovieList movies={movies} />
      </div>
    </>
  );
}
