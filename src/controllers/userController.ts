import { Request, Response } from "express";
import { createUser, patchUser ,deleteUserById, getUser, getUserById, getStaff } from '../services/user.service'
import { genQR } from "../utils/qrcode";
import { User } from "../models/Users"
import multer from "multer";
import XLSX from "xlsx";

import jwt from "jsonwebtoken";

interface JwtPayload {
  userid: number;
  username: string;
  role: string;
}

export const createUserController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const newUser = await createUser(payload)
    const QR = await genQR(newUser.userid, newUser.username || "", newUser.firstname, newUser.lastname, newUser.role || "user")

    await User.update({
      qrcode: QR,
      updated_at: new Date()
    },{
      where: { userid: newUser.userid}
    })

    return res.status(201).json({
      message: 'create user successfully!!',
      username: newUser.username,
      password: newUser.password,
      title: newUser.title,
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      mobile_no: newUser.mobile_no,
      role: newUser.role,
      qrcode: QR,
      created_by: newUser.created_by,
      created_at: newUser.created_at,
      updated_at: newUser.updated_at
    });

  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
}

export const getMe = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "Unauthorized" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    console.log("decoded user:", decoded);

    if (!["manager", "admin"].includes(decoded.role)) {
      return res.status(403).json({ message: "You are not authorized" });
    }

    const user = await User.findOne({
      where: { username: decoded.username },
      attributes: ["userid", "username", "firstname", "lastname", "role"],
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    return res.json(user);
  } catch (error) {
    console.error("Error in getMe:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


export const createQRById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    if (!id) return res.status(400).json({ message: "Please provide id" });

    const getid = await getUserById(id);
    if (!getid) return res.status(404).json({ message: "User not found" });

    const generate = await genQR(
      getid.userid ?? "",
      getid.username ?? "",
      getid.firstname ?? "",
      getid.lastname ?? "",
      getid.role ?? ""
    );

    await User.update({
      qrcode: generate,
      updated_at: new Date()
    },{
      where: { userid: getid.userid}
    })

    const result = await getUserById(id);

    return res.status(200).json({
      message: "Created QR Success!",
      data: result
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

export const getStaffController = async (req: Request, res: Response) => {
  try {
    const result = await getStaff();
    if(!result || result.length === 0) {
      return res.status(404).json({ message: "Staff not found" })
    }
    return res.status(200).json(result) 
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
}

export const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
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
    const userid = parseInt(req.params.id)
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
    const id = parseInt(req.params.id)
    if (!id) return res.status(400).json({ message: "Please provide id"});

    const deleteUser = await deleteUserById(id)
    if(!deleteUser) return res.status(404).json({ message: "User not found"})
    
    return res.status(200).json(deleteUser);
  } catch (error: any) {
    console.error(error)
    return res.status(500).json({ message: error.message})
  }
}

export const importExcelController = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "กรุณาอัปโหลดไฟล์ Excel" });
    }

    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet);


    const requiredColumns = ["firstname", "lastname", "mobile_no", "role"];
    for (const col of requiredColumns) {
      if (!Object.keys(jsonData[0]).includes(col)) {
        return res.status(400).json({ message: `Column '${col}' ไม่พบในไฟล์ Excel` });
      }
    }

    const createdMembers = [];

    for (const row of jsonData) {
      const member = await User.create({
        title: row.title || "",
        firstname: row.firstname,
        lastname: row.lastname,
        mobile_no: row.mobile_no,
        role: row.role,
        created_by: row.created_by || "Import From Excel",
        created_at: new Date(),
        updated_at: new Date(),
      });

      const qrCode = await genQR(
        member.userid,
        member.username || "",
        member.firstname,
        member.lastname,
        member.role
      );

      await member.update({ qrcode: qrCode });

      createdMembers.push(member);
    }

    res.status(201).json({
      message: "เพิ่มสมาชิกสำเร็จ พร้อมสร้าง QR Code",
      data: createdMembers,
    });
  } catch (error) {
    console.error("Error uploading Excel:", error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในการอัปโหลดไฟล์" });
  }
};

