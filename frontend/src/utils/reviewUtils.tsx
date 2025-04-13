import axios from "axios";
import { baseReview } from "../constant";
import { Review } from "../type";

export const handleWatched = async (id: string | undefined, token: string | null, review: Review, setReview: (review:Review)=> void) => {
    try {
      if (!review.watched) {
        // const response = 
        await axios.post(`http://localhost:4000/api/review/create`,
          { movieId: id},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        // console.log("Review created:", response.data);
        setReview({ ...review, watched: true });
      }
      else {
        // const response = 
          await axios.delete(
          `http://localhost:4000/api/review/delete`,
          {
            data: { movieId: id },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log("Review deleted:", response.data);
        setReview(baseReview)
      }
    } catch (error) {
      console.error("Error updating watched status:", error);
    }
}

export const handleLike = async (id: string | undefined, token: string | null, review: Review, setReview: (review: Review) => void) => {
    try {
      const payload = {
        movieId: id,
        liked: !review.liked,
      };
      if (review.watched) {
        // const response = 
          await axios.patch(`http://localhost:4000/api/review/update`, 
          payload, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        // console.log("Review updated:", response.data);
      } else {
        // const response = 
          await axios.post(`http://localhost:4000/api/review/create`, 
          payload, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        // console.log("Review created:", response.data);
      }
      setReview({ ...review, watched: true, liked: !review.liked });
    } catch (error) {
      console.error("Error creating review:", error);
    }
}

export const handleRating = async (id: string | undefined, token: string | null, review: Review, setReview: (review: Review) => void, rating: number | null) => {
    try {
      const payload = {
        movieId: id,
        star: rating,
      };
      if (review.watched) {
        // const response = 
          await axios.patch(`http://localhost:4000/api/review/update`, 
          payload, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        // console.log("Review updated:", response.data);
      } else {
        // const response = 
          await axios.post(`http://localhost:4000/api/review/create`, 
          payload, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        // console.log("Review created:", response.data);
      }
      setReview({ ...review, watched: true, star: rating? rating : 0 });
    } catch (error) {
      console.error("Error creating review:", error);
    }
};