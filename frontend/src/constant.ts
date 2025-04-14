export const baseMovie = {
    _id: "",
    title: "",
    poster_path: "",    
    original_language: "",
    runtime: 0,
    tagline: "",
    overview: "",
    vote_sum: 0,
    vote_count: 0,
    release_date: "",
    genres: [],
    revenue: 0,
    reviewCount: 0,
    watchedCount: 0,
    watchlistCount: 0,
    likeCount: 0,
    starStats: new Map<string, number>(),
};

export const baseReview = {
    userId: "",
    movieId: "",
    watched: false,
    review: "",
    star: 0,
    liked: false,
};
