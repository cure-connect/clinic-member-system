import { User } from "../models/Users";
import bcrypt from "bcrypt";
import sequelize from "../database/db";
import { QueryTypes } from "sequelize";
import { RewardUsed } from "../models/RewardUsed";
import { Points } from "../models/Point";
import { PointsHistory } from "../models/PointsHistory";


export const getUser = async () => {
  try {
    const users = await sequelize.query(
      `
      SELECT 
        u.title AS title,
        u.userid AS userid,
        u.firstname AS firstname,
        u.lastname AS lastname,
        COALESCE(p.score, 0) AS point,
        p.status AS status,
        u.mobile_no as mobile_no,
        u.role AS role,
        u.qrcode AS qrCode,
        u.created_at AS created_at,
        u.created_by AS created_by
      FROM users u
      LEFT JOIN points p ON p.userid = u.userid
      WHERE u.role = 'user'
      ORDER BY u.created_at DESC
      `,
      { type: QueryTypes.SELECT }
    );

    return users;
  } catch (error) {
    console.error("Error in getUser:", error);
    throw error;
  }
};

export const getStaff = async () => {
  try {
    const users = await User.findAll({
      where: {
        role: ["manager", "admin"]
      },
      order: [["created_at", "DESC"]],
    });
    return users;
  } catch (error) {
    console.error("Error in getUser:", error);
    throw error;
  }
};



//GET One User
export const getUserById = async (userid: number) => {
  try {
    const [results]: any = await sequelize.query(
      `
      SELECT 
        u.userid AS userid,
        u.firstname AS firstname,
        u.lastname AS lastname,
        p.score AS point,
        u.mobile_no AS mobile_no,
        p.status AS status,
        u.role AS role,
        u.qrcode AS qr,
        u.created_at AS created_at,
        u.created_by AS created_by 
      FROM users u
      LEFT JOIN points p ON p.userid = u.userid
      WHERE u.userid = :userid
      ORDER BY u.created_at DESC
      LIMIT 1
      `,
      {
        replacements: { userid },
        type: QueryTypes.SELECT,
      }
    );
    if (!results) {
      throw new Error("User not found");
    }

    return results;
  } catch (error) {
    console.error("Error in getUserById:", error);
    throw error;
  }
};


interface CreateUserPayload {
  username: string,
  password: string,
  title: string,
  firstname: string,
  lastname: string,
  role: string,
  qrcode: string
  mobile_no: string,
  created_by: string
}

//POST Create User
export const createUser = async (payload: CreateUserPayload) => {
  try {
    const newUser = await User.create({
      ...payload,
      role: payload.role || "user",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
    return newUser

  } catch (error) {
    console.error("Error in createUser", error)
    throw error
  }
}

export const patchUser = async (
  userid: number,
  payload: {
    password?: string;
    firstname?: string;
    lastname?: string;
    mobile_no?: string;
  }
) => {
  const user = await User.findByPk(userid);
  if (!user) throw new Error("User not found");

  if (payload.password) {
    const salt = await bcrypt.genSalt(10);
    payload.password = await bcrypt.hash(payload.password, salt);
  }

  await user.update({
    ...payload,
    updated_at: new Date(),
  });

  return user;
};

//DELETE Delete User
export const deleteUserById = async (id: number) => {
  try {
    await PointsHistory.destroy({ where: { userid: id }})
    await Points.destroy({ where: { userid: id }})
    await RewardUsed.destroy({ where: { userid: id}})
    const deleteUser = await User.destroy({ where: { userid: id }})
    return deleteUser
  } catch (error) {
    console.error("Error in deletebyId", error)
    throw error
  }
}