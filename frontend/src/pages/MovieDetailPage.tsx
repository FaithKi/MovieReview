import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MovieDetail, Review} from "../type";
import LoadingScreen from "../components/LoadingScreen";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { baseReview, baseMovie } from "../constant";
import { handleLike, handleRating, handleWatched } from "../utils/reviewUtils";
import Button from "../components/Button";
import { handleWatchlist } from "../utils/watchlistUtils";
import StarRating from "../components/StarRating";

export default function MovieDetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetail>(baseMovie);
  const [review, setReview] =useState<Review>(baseReview)
  const [isLoading, setLoading] = useState(true);
  const {userState} = useAuth();
  const [inWatchlist, setInWatchlist] = useState(false);

  const fetchMovie = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/movies/${id}`);
      const mov = await response.data;
      console.log("movie:", mov);
      setMovie(mov);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchReview = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/review/${userState.user?.id}/${id}`)
      const rev = await response.data;
      console.log("review:", rev);
      if (rev.watched) setReview(rev);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWatchlist = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/watchlist/${userState.user?.id}/${id}`);
      const watchlist = await response.data;
      console.log("watchlist:", watchlist);
      setInWatchlist(watchlist.inWatchlist);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMovie();
  }, []);

  useEffect(() => {
    fetchReview();
  }, []);

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const onWatched = async () => {
      await handleWatched(id, userState.token, review, setReview);
  };
  const onLike = async () => {
      await handleLike(id, userState.token, review, setReview);
  };

  const onWatchlist = async () => {
      await handleWatchlist(id, inWatchlist, userState.token, setInWatchlist);
  };

  const onRatingChange =  async (rating: number | null) => {
      await handleRating(id, userState.token, review, setReview, rating);
  };

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="bg-primary-400 w-full md:w-[75vw] h-full relative  md:left-[17.5%] pt-10 px-5 shadow-xl">
            <>
              <div className="basic-details bg-secondary-400/15  text-white flex   w-full items-center md:items-stretch flex-col md:flex-row">
                <div
                  id="poster-wrapper"
                  className="flex-shrink-0 rounded-t-xl md:rounded-l-xl md:rounded-r-[0] w-[100%] md:w-[20rem] md:h-full  select-none"
                  onClick={() => {
                    console.log("Should pop-up full image");
                  }}
                >
                  <img
                    className="w-full p-4 relative top-[-10%] md:static transition duration-300 hover:brightness-75"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                </div>
                <div className="px-3 py-5 h-full rounded-b-xl relative md:rounded-r-xl md:rounded-l-[0] ">
                  <h1 className="text-4xl font-bold text-primary-600">
                    {movie.title}
                  </h1>
                  <br />
                  <p className="italic">{`"${movie.tagline}"`}</p>
                  <br />
                  <p className="indent-8">{movie.overview}</p>
                  <br />
                  <p>
                    {`Lenght: ${movie.runtime} minutes`}
                  </p>
                  <br />
                  <p>{`Rating: ${movie.vote_average} (${movie.vote_count})`}</p>
                </div>
              </div>
            </>
            <div className= {`flex flex-row p-4 gap-5`} >
              <Button text={review.watched ? "watched" : "unwatched"} active={review.watched} onClick={onWatched}/>
              <Button text={review.liked ? "liked" : "unliked"} active={review.liked} onClick={onLike}/>
              <Button text="watchlist" active={inWatchlist} onClick={onWatchlist}/>
              
            </div>
            <StarRating value={review.star} onChange={onRatingChange} size={30} />
            <div className="w-full p-4">
              <h3 className="text-white">Your Review</h3>
              <p className="bg-secondary-400 ">DogAss Movie</p>
            </div>
        </div>
      )}
    </>
  );
}
