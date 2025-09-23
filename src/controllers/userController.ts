import { Request, Response } from "express";
import { createUser, patchUser ,deleteUserById, getUser, getUserById } from '../services/user.service'
import { genQR } from "../utils/qrcode";
import { User } from "../models/Users"

export const createUserController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    if (!payload.username || !payload.password) {
      return res.status(400).json({ message: "username and password are required" });
    }

    const newUser = await createUser(payload)

    return res.status(201).json({
      message: 'create user successfully!!',
      username: newUser.username,
      title: newUser.title,
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      phone: newUser.mobile_no,
      role: newUser.role,
      qrcode: newUser.qrcode,
      created_by: newUser.created_by,
      created_at: newUser.created_at,
      updated_at: newUser.updated_at
    });

  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
}

export const createQRById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    if (!id) return res.status(400).json({ message: "Please provide id" });

    const getid = await getUserById(id);
    if (!getid) return res.status(404).json({ message: "User not found" });

    const generate = await genQR(getid.userid, getid.username, getid.role);

    await User.update({
      qrcode: generate,
      updated_at: new Date()
    },{
      where: { userid: getid.userid}
    })

    return res.status(200).json({
      message: "Created QR Success!",
      data: getid
    })

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

export const patchUserController = async (req: Request, res: Response) => {
  try {
    const { userid } = req.params;
    const { password, firstname, lastname, mobile_no } = req.body;

    const updatedUser = await patchUser(userid, {
      password,
      firstname,
      lastname,
      mobile_no,
    });

    return res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error: any) {
    console.error("Error in patchUserController", error);
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