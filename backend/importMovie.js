import Movie from './src/models/movieModel.ts'
import dotenv from 'dotenv';
dotenv.config();

const { TMDB_TOKEN} = process.env;
const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=';
const pages = 10
// const url = 'https://api.themoviedb.org/3/movie/movie_id?language=en-US';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer '+TMDB_TOKEN
  }
};

async function fetchData(url, options) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Fetch error:", error);
      return null; // Handle errors gracefully
    }
}
  
let movie_ids = []; 

async function loadMovies(page) {
    const data = await fetchData(url+page, options);
    if (data) {
        console.log(data.page)
        movie_ids = data.results.map(movie => movie.id);
        await name(movie_ids);
    } else{
        console.log("Failed to fetch data.");
    }
}

async function name(ids) {
    ids.forEach(async (id) =>  {
        const data = await fetchData(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options);
        const movie = new Movie({...data,   
            "vote_average": 0,
            "vote_count": 0})
        console.log(movie)
        await movie.save(); // Save to MongoDB
        console.log(`✅ Movie Saved: ${movie.title}`);
    });
}

async function loadMoviesManyPages() {
    for(let i=1; i<pages+1; i++){
        await loadMovies(i)
    }
}

export default loadMoviesManyPages;

