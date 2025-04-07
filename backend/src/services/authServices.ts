import { hashPassword, comparePassword } from "../utils/hash.ts";
import jwt from "jsonwebtoken";
import User from "../models/userModel.ts";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret";

export const registerUser = async (name: string, email: string, password: string) => {
    if (!name || !email || !password) throw new Error("All fields are required");

    const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email_regex.test(email)) throw new Error("Invalid email format");

    const email_existing = await User.findOne({ email });
    if (email_existing) throw new Error("Email already registered");

    const username_existing = await User.findOne({ name });
    if (username_existing) throw new Error("Username already registered");
    
    if (password.length < 8) throw new Error("Password must be at least 8 characters");
    const hashed = await hashPassword(password);
    const user = await User.create({ name, email, password: hashed, role: "user", reviews: [], favorites: [] });
    if (!user) throw new Error("User registration failed");
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1d" });

  
    return { user: { id: user.id, name: user.name, email: user.email, role: user.role }, token };

};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1d" });

  return { user: { id: user.id, name: user.name, email: user.email, role: user.role }, token };
};
