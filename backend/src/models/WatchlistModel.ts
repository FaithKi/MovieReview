
import { Schema, model, Types } from 'mongoose';

const WatchlistSchema = new Schema({
  userId: { type: Types.ObjectId, ref: 'User', required: true },
  movieId: { type: Types.ObjectId, ref: 'Movie', required: true },
  addedAt: { type: Date, default: Date.now },
});

WatchlistSchema.index({ userId: 1, movieId: 1 }, { unique: true });

export const Watchlist = model('Watchlist', WatchlistSchema);
