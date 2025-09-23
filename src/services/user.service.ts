import { User } from "../models/Users";
import bcrypt from "bcrypt";
import { genQR } from "../utils/qrcode";

//GET All User
export const getUser = async () => {
  try {
    const users = await User.findAll({});
    return users;

  } catch (error) {
    console.error("Error in getUser:", error);
    throw error;
  }
};

//GET One User
export const getUserById = async (id: number) => {
  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
    return user

  } catch (error) {
    console.error("Error in getUserById:", error);
    throw error;
  }
}

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
  userid: string,
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
    const deleteUser = await User.destroy({ where: { id: id }})
    return deleteUser
  } catch (error) {
    console.error("Error in deletebyId", error)
    throw error
  }
}