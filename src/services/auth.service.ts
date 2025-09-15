import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";

const saltRounds = 10;

const mockUsers = [
  { id: 1, username: "manager1", password: bcrypt.hashSync("123456", saltRounds), role: "manager" },
  { id: 2, username: "admin1", password: bcrypt.hashSync("123456", saltRounds), role: "admin" },
];

export const login = async (username: string, password: string) => {
  const user = mockUsers.find(u => u.username === username);
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = generateToken({ id: user.id, username: user.username, role: user.role });
  return token;
};
