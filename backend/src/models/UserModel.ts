import mongoose, { Schema, Document } from "mongoose";

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  pictureProfile: string;
  watchedCount: number;
  likeCount: number;
  watchlistCount: number;
  reviewCount: number;
  followers: number;
  following: number;
  starStats: Map<string, number>;
  createdAt: Date;
  updatedAt: Date;
}

// User Schema Definition
const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
    pictureProfile: { type: String, default: "" },
    watchedCount: { type: Number, default: 0 },
    likeCount: { type: Number, default: 0 },
    watchlistCount: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    followers: {type: Number, default: 0},
    following: {type: Number, default: 0},
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

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
