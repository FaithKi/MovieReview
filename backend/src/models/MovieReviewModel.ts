import { Schema, model, Types, Document } from 'mongoose';

export interface IMovieReview extends Document {
  userId: Types.ObjectId;
  movieId: Types.ObjectId;
  review: string | null;
  star?: number;
  liked : boolean;
  createdAt: Date;
  updatedAt: Date;
}

const MovieReviewSchema = new Schema<IMovieReview>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    movieId: { type: Schema.Types.ObjectId, ref: 'Movie', required: true },
    review: { type: String, default: null },
    star: { type: Number, min: 1, max: 10 , default: null},
    liked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

MovieReviewSchema.index({ userId: 1, movieId: 1 }, { unique: true });

export const MovieReview = model<IMovieReview>('MovieReview', MovieReviewSchema);
