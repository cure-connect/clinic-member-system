import { User } from "../models/Users";

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

//POST Create User
export const createUser = async (username: string, password: string, role: string) => {
  try {
    const newUser = await User.create({
      username,
      password,
      role: role || "user",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
    return newUser

  } catch (error) {
    console.error("Error in createUser", error)
    throw error
  }
}

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