import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieProps, { defaultMovie } from "../props/MovieProps";

export default function MovieDetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieProps>(defaultMovie);

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetch(`/api/movies/${id}`);
      const mov = await response.json();
      setMovie(mov);
    };
    fetchMovie();
  }, []);

  console.log(movie)
  return <>
    <h1>{movie.title}</h1>;
  </>
}
