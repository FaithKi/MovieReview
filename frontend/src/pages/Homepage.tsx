import { useState, useEffect } from "react";
import MovieList from "../components/MovieList";
import LoadingScreen from "../components/LoadingScreen";
import axios from "axios";

export default function Homepage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(true)
  useEffect(() => {
    const fetchMovies = async () => {
    try{
        const response = await axios.get("/api/movies");
        const mov = await response.data;
        setMovies(mov);
        setLoading(false);
      } catch(error: unknown){
        if (axios.isAxiosError(error)){
          console.error(error.response?.data || error.message);
        }
      };
    }
    fetchMovies();
  }, []);
  
  // console.log(movies.length)
  return (
    <>{
      ( isLoading ? <LoadingScreen /> :
      <div className="flex flex-col gap-30 items-center  mt-30">
      <MovieList header='NEW ON FILMAGEDDON' movies={movies} />
      <MovieList header='POPULAR ON FILMAGEDDON' movies={movies} />
    </div>
    )
    }
    </>
  );
}
