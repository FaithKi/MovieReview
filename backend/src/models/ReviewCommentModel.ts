
import { Schema, model, Types } from 'mongoose';

const ReviewCommentSchema = new Schema({
  reviewId: { type: Types.ObjectId, ref: 'MovieReview', required: true },
  userId: { type: Types.ObjectId, ref: 'User', required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const ReviewComment = model('ReviewComment', ReviewCommentSchema);
