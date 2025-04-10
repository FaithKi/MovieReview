
import { Schema, model, Types } from 'mongoose';

const FavoriteSchema = new Schema({
  userId: { type: Types.ObjectId, ref: 'User', required: true },
  movieId: { type: Types.ObjectId, ref: 'Movie', required: true },
  favoritedAt: { type: Date, default: Date.now },
});

FavoriteSchema.index({ userId: 1, movieId: 1 }, { unique: true });

export const Favorite = model('Favorite', FavoriteSchema);
