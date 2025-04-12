import { Schema, model, Types, Document } from 'mongoose';

const ReviewLikeSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    reviewId: { type: Schema.Types.ObjectId, ref: 'MovieReview', required: true },
    createdAt: { type: Date, default: Date.now },
  });
  
  ReviewLikeSchema.index({ userId: 1, reviewId: 1 }, { unique: true }); // no duplicate likes
  
export const ReviewLike = model('ReviewLike', ReviewLikeSchema);
  