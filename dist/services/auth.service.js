"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../utils/jwt");
const mockUser = {
    id: 1,
    username: "admin",
    password: "$2b$10$4nZzD3uN2XJ8sKHjtGoJ6OtHjN/VLZr5yGRN4Kv4DP/7G5VqvVd/O"
};
const login = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    if (username !== mockUser.username)
        throw new Error("User not found");
    const isMatch = yield bcrypt_1.default.compare(password, mockUser.password);
    if (!isMatch)
        throw new Error("Invalid credentials");
    const token = (0, jwt_1.generateToken)({ id: mockUser.id, username: mockUser.username });
    return token;
});
exports.login = login;
