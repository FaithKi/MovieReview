import mongoose, {Schema} from 'mongoose';

const GenreSchema = new Schema({
    id: Number,
    name: String
  });
  
const ProductionCompanySchema = new Schema({
    id: Number,
    logo_path: String,
    name: String,
    origin_country: String
});

const ProductionCountrySchema = new Schema({
    iso_3166_1: String,
    name: String
});

const SpokenLanguageSchema = new Schema({
    english_name: String,
    iso_639_1: String,
    name: String
});

const MovieSchema = new Schema({
    adult: Boolean,
    backdrop_path: String,
    belongs_to_collection: Schema.Types.Mixed, // Can be null or an object
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
    vote_sum: { type: Number, default: 0 },
    vote_count: { type: Number, default: 0 },
    watchedCount: { type: Number, default: 0 },
    watchlistCount: { type: Number, default: 0 },
    likeCount: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    starStats: {
          type: Schema.Types.Map,
          of: Schema.Types.Number,
          default: new Map([
            ['1', 0], ['2', 0], ['3', 0], ['4', 0], ['5', 0],
            ['6', 0], ['7', 0], ['8', 0], ['9', 0], ['10', 0],
          ]),
        },
  },
  { timestamps: true }
);
  
const Movie = mongoose.model('Movie', MovieSchema);

export default Movie;