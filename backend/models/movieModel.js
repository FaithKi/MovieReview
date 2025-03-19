import mongoose from 'mongoose';

const GenreSchema = new mongoose.Schema({
    id: Number,
    name: String
  });
  
const ProductionCompanySchema = new mongoose.Schema({
    id: Number,
    logo_path: String,
    name: String,
    origin_country: String
});

const ProductionCountrySchema = new mongoose.Schema({
    iso_3166_1: String,
    name: String
});

const SpokenLanguageSchema = new mongoose.Schema({
    english_name: String,
    iso_639_1: String,
    name: String
});

const MovieSchema = new mongoose.Schema({
    adult: Boolean,
    backdrop_path: String,
    belongs_to_collection: mongoose.Schema.Types.Mixed, // Can be null or an object
    budget: Number,
    genres: [GenreSchema],
    homepage: String,
    id: { type: Number, unique: true },
    imdb_id: String,
    origin_country: [String],
    original_language: String,
    original_title: String,
    overview: String,
    popularity: Number,
    poster_path: String,
    production_companies: [ProductionCompanySchema],
    production_countries: [ProductionCountrySchema],
    release_date: Date,
    revenue: Number,
    runtime: Number,
    spoken_languages: [SpokenLanguageSchema],
    status: String,
    tagline: String,
    title: String,
    video: Boolean,
    vote_average: Number,
    vote_count: Number
  });
  
const Movie = mongoose.model('Movie', MovieSchema);

export default Movie;