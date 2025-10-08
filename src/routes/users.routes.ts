import { Router } from "express";
import { createUserController, getUserByIdController, getAllUserController, deleteUserByIdController, createQRById, patchUserController, getMe, getStaffController } from "../controllers/userController";
import { authMiddleware, roleMiddleware, AuthRequest } from "../middlewares/auth.middleware";

const router = Router()

router.get("/me", authMiddleware ,getMe)
router.get("/user", getAllUserController)
router.get("/users/:id", getUserByIdController)
router.get("/staff", getStaffController)

router.post("/create", createUserController)
router.post("/createqr/:id", createQRById)
router.patch("/update/:id", patchUserController)

router.delete("/users/:id", deleteUserByIdController)
export default router