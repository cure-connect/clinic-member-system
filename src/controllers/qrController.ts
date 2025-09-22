import { Request, Response } from "express";
import { User } from "../models/Users";
import  QRCode  from "qrcode";
import { genQR } from "../utils/qrcode";

interface Payload {
  id: number | string;
  username: string;
  role: string;
}

export const generateQRController = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const createQR = await genQR(id, user.username, user.role)

    user.qrcode = createQR;
    await user.save();

    res.json({
      message: "QR generated successfully",
      qrcode: createQR,
    });
  } catch (error) {
    console.error("QR Controller error:", error);
    res.status(500).json({ error: "Failed to generate QR code" });
  }
};

