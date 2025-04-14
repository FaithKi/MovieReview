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
import StarHistogram from "../components/StarHistogram";

export default function MovieDetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetail>(baseMovie);
  const [review, setReview] =useState<Review>(baseReview)
  const [reviewInput, setReviewInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const {userState} = useAuth();
  const [inWatchlist, setInWatchlist] = useState(false);

  const fetchMovie = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/movies/${id}`);
      const mov = await response.data;
      // console.log("movie:", mov);
      setMovie(mov);
  
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchReview = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/review/${userState.user?._id}/${id}`)
      const rev = await response.data;
      // console.log("review:", rev);
      if (rev.watched) setReview(rev);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWatchlist = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/watchlist/${userState.user?._id}/${id}`);
      const watchlist = await response.data;
      // console.log("watchlist:", watchlist);
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

  const onReviewTextChange = async () => {
      if (!reviewInput.trim() || reviewInput.length > 300) return;
      if(!review.star) alert("Please rate the movie before submitting a review.");
      try {
        if (review.watched) {
          // const response = 
            await axios.patch(`http://localhost:4000/api/review/update`, 
            {movieId: id, review: reviewInput}, {
              headers: {
                Authorization: `Bearer ${userState.token}`,
              },
            },
          );
          setIsSubmitting(true);
        }
        setReview({...review, review: reviewInput});
      } catch (err) {
        console.error("Failed to submit review:", err);
      } finally {
        setIsSubmitting(false);
      }
  }
  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="bg-secondary-600/50 w-full  h-screen relative md:w-[60vw] md:left-[20%] shadow-xl">
            
            <div className=" text-white flex bg-secondary-600/50 py-10 px-5  w-full items-center md:items-stretch flex-col md:flex-row">
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
                <h1 className="text-4xl font-bold text-primary-400">
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
                <p>{`Rating: ${movie.vote_count? movie.vote_sum/movie.vote_count: 0} (${movie.vote_count})`}</p>
              </div>
            </div>
  
            <div className="flex flex-row grow px-5 pt-5">
              <div>
                <div className= {`flex flex-row p-4 gap-5`} >
                  <Button text={review.watched ? "watched" : "unwatched"} active={review.watched} onClick={onWatched}/>
                  <Button text={review.liked ? "liked" : "unliked"} active={review.liked} onClick={onLike}/>
                  <Button text="watchlist" active={inWatchlist} onClick={onWatchlist}/>
                  
                </div>
                <div className="w-full p-4">
                  <StarRating value={review.star} onChange={onRatingChange} size={50} />
                </div>
              </div>
              <div className="p-4 h-50 w-full">
                <StarHistogram starStats={movie.starStats}/>
              </div>
            </div>
            <div className="w-full px-9">
            {review.review ? (
              <div className="bg-gray-100 dark:bg-zinc-800 p-4 rounded-md text-sm text-gray-900 dark:text-white">
                <p><strong>Your Review:</strong></p>
                <p>{review.review}</p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <textarea
                    value={reviewInput}
                    onChange={(e) => setReviewInput(e.target.value)}
                    placeholder="Write your review..."
                    className="border p-2 rounded-md text-sm resize-none dark:bg-zinc-900 dark:text-white"
                    rows={4}
                  />
                  {reviewInput.length > 300 && (
                    <p className="text-primary-400 text-sm">
                      Review is too long. Maximum 300 characters.
                    </p>
                  )}
                  <button
                    onClick={onReviewTextChange}
                    disabled={isSubmitting}
                    className="self-end bg-primary-500 hover:bg-primary-600 text-white text-sm px-4 py-2 rounded-md disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting..." : "Add Review"}
                  </button>
                </div>
              )}

            </div>
        </div>
      )}
    </>
  );
}
