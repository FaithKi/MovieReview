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
  reviews: mongoose.Types.ObjectId[]; // References to Review documents
  favorites: mongoose.Types.ObjectId[]; // References to Movie documents
  createdAt: Date;
  updatedAt: Date;
}

// User Schema Definition
const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(UserRole), default: UserRole.USER },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
  },
  { timestamps: true }
);


const User = mongoose.model<IUser>("User", UserSchema);
export default User;
