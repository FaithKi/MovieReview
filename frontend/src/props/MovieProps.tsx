interface MovieProps {
  _id: any;
  title: string;
  poster_path: string
  runtime: Number;
  tagline: string;
  popularity: Number;
}

export const defaultMovie: MovieProps = {
  _id: 0,
  title: "",
  poster_path: "",
  runtime: 0,
  tagline: "",
  popularity: 0
};

export default MovieProps;
