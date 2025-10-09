import { Router } from "express";
import { createUserController, getUserByIdController, getAllUserController, deleteUserByIdController, createQRById, patchUserController, getMe, getStaffController, importExcelController } from "../controllers/userController";
import { authMiddleware, roleMiddleware, AuthRequest } from "../middlewares/auth.middleware";
import multer from 'multer';

const storage = multer.memoryStorage();
export const upload = multer({ storage });

const router = Router()

router.get("/me", authMiddleware ,getMe)
router.get("/user", getAllUserController)
router.get("/users/:id", getUserByIdController)
router.get("/staff", getStaffController)

router.post("/user/import", upload.single('file'), importExcelController)

router.post("/create", createUserController)
router.post("/createqr/:id", createQRById)
router.patch("/update/:id", patchUserController)

router.delete("/users/:id", deleteUserByIdController)
export default router