import { Router } from "express";
import { createUserController, getUserByIdController, getAllUserController, deleteUserByIdController, createQRById } from "../controllers/userController";
import { authMiddleware, roleMiddleware, AuthRequest } from "../middlewares/auth.middleware";

const router = Router()

router.get("/user", getAllUserController)
router.get("/users/:id", getUserByIdController)

router.post("/create", createUserController)
router.post("/createqr/:id", createQRById)

router.delete("/users/:id", deleteUserByIdController)
export default router