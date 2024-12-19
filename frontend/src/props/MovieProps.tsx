interface MovieProps {
  _id: any;
  title: String;
  year: Number;
  description: String;
  ratings: Number;
}

export const defaultMovie: MovieProps = {
  _id: 0,
  title: "Unknown",
  year: 0,
  description: "Unknown",
  ratings: 0,
};

export default MovieProps;
