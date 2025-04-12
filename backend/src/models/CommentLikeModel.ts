import { Schema, model, Types, Document } from 'mongoose';


const CommentLikeSchema = new Schema({
  userId: { type: Types.ObjectId, ref: 'User', required: true },
  commentId: { type: Types.ObjectId, ref: 'ReviewComment', required: true },
  createdAt: { type: Date, default: Date.now },
});

CommentLikeSchema.index({ userId: 1, commentId: 1 }, { unique: true }); // prevent double-like

export const CommentLike = model('CommentLike', CommentLikeSchema);
