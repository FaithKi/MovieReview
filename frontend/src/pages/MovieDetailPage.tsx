import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {MovieDetail, defaultMovieDetail } from "../props/MovieProps";

export default function MovieDetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetail>(defaultMovieDetail);

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetch(`http://localhost:4000/api/movies/${id}`);
      const mov = await response.json();
      console.log("movie:", mov);
      setMovie(mov);
    };
    fetchMovie();
  }, []);

  return (
    <>
      <div className="movie-detail bg-snow border-x-secondary-400 border-x-10 w-full md:w-[80vw] h-lvh absolute md:left-[10%] pt-10 px-5 shadow-xl">
        {movie != defaultMovieDetail ? (
          <>
            <div className="basic-details flex pt-5 h-[60vh] w-full items-center md:items-stretch flex-col md:flex-row">
              <div
                id="poster-wrapper"
                className="flex-shrink-0 rounded-t-xl md:rounded-l-xl md:rounded-r-[0] w-[100%] h-[25rem] md:w-[20rem] md:h-full overflow-hidden select-none"
                onClick={() => {
                  console.log("Should pop-up full image");
                }}
              >
                <img
                  className="w-full relative top-[-10%] md:static transition duration-300 hover:brightness-75"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
              </div>
              <div className="detail-box px-3 py-5 h-full rounded-b-xl relative md:rounded-r-xl md:rounded-l-[0] bg-secondary-400/15 md:overflow-scroll">
                <h1 className="movie-title text-4xl font-bold text-primary-600">
                  {movie.title}
                </h1>
                <br />
                <p className="italic">{`"${movie.tagline}"`}</p>
                <br />
                <p className="indent-8">
                  {movie.overview}
                </p>
                <br />
                <p>
                  {`Lenght: ${
                    Math.floor(movie.runtime / 60) +
                    ":" +
                    (movie.runtime % 60).toString().padStart(2, "0")
                  }`}
                </p>
                <br />
                <p>{`Popularity: ${movie.popularity.toString()}`}</p>
              </div>
            </div>
          </>
        ) : (
          <h1 className="text-4xl font-bold text-primary-600">Loading...</h1>
        )}
      </div>
    </>
  );
}
