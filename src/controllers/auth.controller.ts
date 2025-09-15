import { Request, Response } from "express";
import { login } from "../services/auth.service";

export const loginController = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const token = await login(username, password);
    res.json({ message: "Login successful", token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const logoutController = async (req: Request, res: Response) => {
  res.json({ message: "Logout successful" });
};
