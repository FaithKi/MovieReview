import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/authMiddleware.ts";
import User from "../models/UserModel.ts";

export const getProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = await User.findById(req.user?.id).select("-password");
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
