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
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
