import axios from "axios";

export const handleWatchlist = async (movieId: string | undefined, inWatchlist: boolean, token:string | null, setInWatchlist: (inWatchlist:boolean)=> void) => {
    try {
      if(!inWatchlist) {
        await axios.post(`http://localhost:4000/api/watchlist/`,
          { movieId: movieId },
          {
            headers: {    Authorization: `Bearer ${token}` },
          }
        );
      } else{
        await axios.delete(`http://localhost:4000/api/watchlist/`,
          {
            data: { movieId: movieId },
            headers: {    Authorization: `Bearer ${token}` },
          }
        );
      }
      
      setInWatchlist(!inWatchlist);
    } catch (error) {
      console.log(error);
    }
  };
