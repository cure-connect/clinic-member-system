import { Router } from "express";
import { createUserController, getUserByIdController, getAllUserController, deleteUserByIdController, createQRById, patchUserController, getMe, getStaffController, importExcelController } from "../controllers/userController";
import { authMiddleware, roleMiddleware, AuthRequest } from "../middlewares/auth.middleware";
import multer from 'multer';

const storage = multer.memoryStorage();
export const upload = multer({ storage });

const router = Router()

router.get("/me", authMiddleware ,getMe)
router.get("/user", authMiddleware,getAllUserController)
router.get("/users/:id",getUserByIdController)
router.get("/staff", authMiddleware,getStaffController)

router.post("/user/import", upload.single('file'), authMiddleware ,importExcelController)

router.post("/create", authMiddleware,createUserController)
router.post("/createqr/:id", authMiddleware,createQRById)
router.patch("/update/:id", authMiddleware,patchUserController)

router.delete("/users/:id", authMiddleware,deleteUserByIdController)
export default router