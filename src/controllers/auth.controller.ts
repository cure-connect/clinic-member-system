import { Request, Response } from "express";
import { login, logout } from "../services/auth.service";

export const loginController = async (req: Request, res: Response) => {
  try {
    const { username, password, role } = req.body;
    const token = await login(username, password, role);
    res.status(200).json({
      status: 'success',
      data: {
        token: token[0],
        username: username,
        role: token[1]
      }
    })
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const logoutController = async (req: Request, res: Response) => {
  try {
    const result = await logout(req , res);
    return res.json(result);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
