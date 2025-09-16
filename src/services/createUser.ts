import { Request, Response } from "express";
import { User } from "../models/Users";

export const getUser = async (username: string, role: string) => {
  try {
    const whereClause: any = {};
    if (username) whereClause.username = username;
    if (role) whereClause.role = role;

    const users = await User.findAll({ where: whereClause });

    return users;
  } catch (error) {
    console.error("Error in getUser:", error);
    throw error;
  }
};

