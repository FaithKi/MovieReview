import User from '../models/UserModel.ts';
import { Request, Response } from "express";
import { registerUser, loginUser } from '../services/authServices.ts';

export const register = async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        const { name, email, password } = req.body;
        console.log(name, email, password);
        const {user, token} = await registerUser(name, email, password);
        res.status(201).json({ message: "User registered", user, token });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
  };
  
  export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await loginUser(email, password);
        res.json({ message: "Login successful", user, token });
    } catch (error: any) {
        res.status(401).json({ message: error.message });
    }
  };