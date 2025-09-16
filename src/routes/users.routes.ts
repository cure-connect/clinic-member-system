import { Router } from "express";
import { createUserController, getUserController } from "../controllers/userController";

const router = Router()

router.get("/", getUserController)
router.post("/users", createUserController)
export default router