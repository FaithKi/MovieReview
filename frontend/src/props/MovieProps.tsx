export interface MovieProps {
  _id: any;
  title: string;
  poster_path: string;
  runtime: number;
  tagline: string;
  popularity: number;
}

export interface MovieDetail {
  _id: any;
  title: string;
  poster_path: string;
  original_language: string;
  runtime: number;
  tagline: string;
  overview: string;
  popularity: number;
  revenue: number;
}

export const defaultMovie: MovieProps = {
  _id: 0,
  title: "",
  poster_path: "",
  runtime: 0,
  tagline: "",
  popularity: 0,
};

export const defaultMovieDetail: MovieDetail = {
  _id: 0,
  title: "",
  poster_path: "",
  original_language: "",
  runtime: 0,
  tagline: "",
  overview: "",
  popularity: 0,
  revenue: 0
};


