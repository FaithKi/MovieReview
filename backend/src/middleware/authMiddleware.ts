import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.ts";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret";

interface JwtPayload {
  id: string;
  role: "admin" | "user";
}

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export const authenticate = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "No token provided" });
      return;
    }
  
    const token = authHeader.split(" ")[1];
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
  
      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
  
      req.user = { id: user.id, role: user.role };
      next();
    } catch (error) {
      res.status(403).json({ message: "Invalid or expired token" });
    }
  };

