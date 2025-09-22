import { Request, Response } from "express";
import { createUser, deleteUserById, getUser, getUserById } from '../services/user.service'

export const createUserController = async (req: Request, res: Response) => {
  try {
    const { username, password, title, firstname, lastname, mobile_no, role, created_by } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "username and password are required" });
    }

    const newUser = await createUser(username, password, title, firstname, lastname, mobile_no,role, created_by)

    return res.status(201).json({
      message: 'create user successfully!!',
      username: newUser.username,
      title: newUser.title,
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      phone: newUser.mobile_no,
      role: newUser.role,
      created_by: newUser.created_by,
      created_at: newUser.created_at,
      updated_at: newUser.updated_at
    });

  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
}

export const getAllUserController = async (req: Request, res: Response) => {
  try {
    const users = await getUser();

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(users);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ message: "Please provide id" });

    const getid = await getUserById(id);
    if (!getid) return res.status(404).json({ message: "User not found" });

    return res.status(200).json(getid);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteUserByIdController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    if (!id) return res.status(400).json({ message: "Please provide id"});

    const deleteUser = await deleteUserById(id)
    if(!deleteUser) return res.status(404).json({ message: "User not found"})
    
    return res.status(200).json(deleteUser);
  } catch (error: any) {
    console.error(error)
    return res.status(500).json({ message: error.message})
  }
}