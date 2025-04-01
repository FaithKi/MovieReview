import { Link } from "react-router-dom";
import {MovieProps} from "../props/MovieProps";
import { useRef} from "react";
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { pageWidth } from "../constant";
interface MovieListProps {
  header: String
  movies: Array<MovieProps>;
}

export default function MovieList({ header, movies }: MovieListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const width = pageWidth
  const scroll = (direction: number) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: direction * pageWidth * 4, behavior: "smooth" });
    }
  };


  return (
    <div className={`w-[${width}vw] px-2 py-2`}>
      <div className="text-2xl text-secondary-600 mb2">{header}</div>
      <div className="relative group">
        {/* Left Scroll Button */}
        <ChevronLeft onClick={() => scroll(-1)}
          className="absolute top-1/2 text-2xl w-8 h-10 -translate-y-1/2 bg-gray-500 text-white  z-10 
          opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />

        <div  ref={containerRef} className="flex gap-4 overflow-x-hidden scroll-smooth whitespace-nowrap">
          {movies.map((movie: MovieProps) => (
            <div className="flex flex-col bg-primary-400 shrink-0 w-[200px]" key={movie._id}>
              <div className="flex flex-col w-50">
                <Link to={`/movie/${movie._id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      
                    />
                </Link>

              </div>
              <button className="justify-space-between text-2xl text-secondary-400">Watchlist</button>
            </div>
          ))}
        </div> 
         
        {/* Right Scroll Button */}

        <ChevronRight onClick={() => scroll(1)} 
        className="absolute right-0 top-1/2 w-8 h-10 -translate-y-1/2 bg-gray-500 text-white  z-10 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>

      </div>
    </div>
  );
}
