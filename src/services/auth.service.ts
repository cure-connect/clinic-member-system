import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";
import { User } from "../models/Users";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";


export const login = async (username: string, password: string, role: string) => {
  const user = await User.findOne({ where: { username } });

  if (!user) throw new Error("User not found");

  if (!user.password) throw new Error("User password not set");
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = generateToken({ userid: user.userid ,username: user.username, role: user.role });

  return [token, user.role];
};

export const logout = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.sendStatus(401);
    }

    const decoded = jwt.decode(token) as { exp: number, jti: string };
    if (!decoded || !decoded.exp) {
        return res.status(400).json({ message: "Invalid token" });
    }
    
    const expiresAt = decoded.exp;
    const now = Math.floor(Date.now() / 1000);
    const timeRemaining = expiresAt - now;

    if (timeRemaining <= 0) {
      return res.status(200).json({ message: 'Token already expired' });
    }

    res.status(200).json({ message: 'Logout successful' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};