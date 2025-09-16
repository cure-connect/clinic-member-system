import { Request, Response } from "express";
import { User } from '../models/Users'
import { getUser } from '../services/createUser'

export const createUserController = async (req: Request, res: Response) => {
    try {
        const { username, password, role } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "username and password are required" });
        }

        const newUser = await User.create({
            username,
            password,
            role: role || "user",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        });

        return res.status(201).json({
            message: 'create user successfully!!',
            username: newUser.username,
            role: newUser.role,
            created_at: newUser.created_at,
            updated_at: newUser.updated_at
        });

    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

export const getUserController = async (req: Request, res: Response) => {
  try {
    const username = typeof req.query.username === "string" ? req.query.username : "";
    const role = typeof req.query.role === "string" ? req.query.role : "";

    if (!username && !role) {
      return res.status(400).json({ message: "Please provide username or role" });
    }

    const users = await getUser(username, role);

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(users);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};